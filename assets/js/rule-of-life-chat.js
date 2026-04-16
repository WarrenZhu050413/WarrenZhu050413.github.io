// Rule of Life — BYOK chat client.
// Streams from api.anthropic.com directly using the visitor's own API key.
// Patterns from Warren's ChengXing-Bot skill reference: rAF batching,
// 30s connect timeout, graceful abort, message queueing.

(() => {
  // Family aliases — each resolves to the latest in that family.
  const MODEL_IDS = {
    sonnet: "claude-sonnet-4-6",
    opus: "claude-opus-4-6",
    haiku: "claude-haiku-4-5",
  };
  const MAX_TOKENS = 1024;
  const SYSTEM_URL = "/assets/rule-of-life-system.txt";
  const KEY_STORAGE = "rol_anthropic_key";
  const MODEL_STORAGE = "rol_model";
  const CUSTOM_MODEL_STORAGE = "rol_custom_model";
  const API_URL = "https://api.anthropic.com/v1/messages";
  const LOCAL_BACKEND = "http://localhost:8787";
  let useLocalBackend = false;

  const $ = (id) => document.getElementById(id);
  const transcript = $("rol-transcript");
  const form = $("rol-form");
  const input = $("rol-input");
  const sendBtn = $("rol-send");
  const keyStatus = $("rol-key-status");
  const keyDialog = $("rol-key-dialog");
  const keyInput = $("rol-key-input");
  const keyForm = $("rol-key-form");
  const modelSelect = $("rol-model");
  const customModelInput = $("rol-custom-model");

  // --- Model selection ---
  const getModelKey = () => localStorage.getItem(MODEL_STORAGE) || "sonnet";
  const getCustomModel = () => localStorage.getItem(CUSTOM_MODEL_STORAGE) || "";
  function getModelId() {
    const key = getModelKey();
    if (key === "custom") return getCustomModel() || MODEL_IDS.sonnet;
    return MODEL_IDS[key] || MODEL_IDS.sonnet;
  }
  function applyCustomVisibility() {
    if (!customModelInput) return;
    if (modelSelect.value === "custom") {
      customModelInput.hidden = false;
      customModelInput.value = getCustomModel();
    } else {
      customModelInput.hidden = true;
    }
  }
  if (modelSelect) {
    modelSelect.value = getModelKey();
    applyCustomVisibility();
    modelSelect.addEventListener("change", () => {
      localStorage.setItem(MODEL_STORAGE, modelSelect.value);
      applyCustomVisibility();
    });
  }
  if (customModelInput) {
    customModelInput.addEventListener("change", () => {
      const v = customModelInput.value.trim();
      if (v) localStorage.setItem(CUSTOM_MODEL_STORAGE, v);
    });
    customModelInput.addEventListener("blur", () => {
      const v = customModelInput.value.trim();
      if (v) localStorage.setItem(CUSTOM_MODEL_STORAGE, v);
    });
  }

  let systemPrompt = null;
  let history = [];
  let currentAbort = null;
  let streaming = false;
  let queued = null;

  // --- API key handling (localStorage only, never network) ---
  const getKey = () => localStorage.getItem(KEY_STORAGE);
  const setKey = (k) => { localStorage.setItem(KEY_STORAGE, k); updateKeyStatus(); };
  function updateKeyStatus() {
    if (useLocalBackend) {
      keyStatus.textContent = "local backend (OAuth)";
      return;
    }
    const k = getKey();
    keyStatus.textContent = k ? `key set (…${k.slice(-4)})` : "no API key set";
  }

  // Probe local backend once at startup
  async function probeLocalBackend() {
    try {
      const r = await fetch(`${LOCAL_BACKEND}/health`, { signal: AbortSignal.timeout(600) });
      if (r.ok) { useLocalBackend = true; updateKeyStatus(); }
    } catch (_) { /* no local backend available */ }
  }

  $("rol-set-key").addEventListener("click", (e) => {
    e.preventDefault();
    keyInput.value = "";
    keyDialog.showModal();
  });
  $("rol-key-cancel").addEventListener("click", () => keyDialog.close());
  keyForm.addEventListener("submit", () => {
    const v = keyInput.value.trim();
    if (v) setKey(v);
  });

  // --- Rendering ---
  function addBubble(role, text = "") {
    const div = document.createElement("div");
    div.className = `rol-bubble rol-bubble--${role}`;
    div.textContent = text;
    transcript.appendChild(div);
    transcript.scrollTop = transcript.scrollHeight;
    return div;
  }

  // --- rAF-batched token flush (60fps rule) ---
  let pendingText = "";
  let activeBubble = null;
  let rafHandle = null;

  function scheduleFlush() {
    if (rafHandle) return;
    rafHandle = requestAnimationFrame(() => {
      if (activeBubble && pendingText) {
        activeBubble.textContent += pendingText;
        pendingText = "";
        transcript.scrollTop = transcript.scrollHeight;
      }
      rafHandle = null;
    });
  }

  function appendToken(text) {
    pendingText += text;
    scheduleFlush();
  }

  function flushPending() {
    if (rafHandle) { cancelAnimationFrame(rafHandle); rafHandle = null; }
    if (activeBubble && pendingText) {
      activeBubble.textContent += pendingText;
      pendingText = "";
    }
  }

  // --- System prompt loader ---
  async function loadSystemPrompt() {
    if (systemPrompt) return systemPrompt;
    const res = await fetch(SYSTEM_URL);
    if (!res.ok) throw new Error("Failed to load rule-of-life source");
    systemPrompt = await res.text();
    return systemPrompt;
  }

  // --- The streaming call ---
  async function streamChat(userMessage) {
    if (!useLocalBackend) {
      const key = getKey();
      if (!key) { keyDialog.showModal(); return; }
    }

    streaming = true;
    sendBtn.disabled = true;

    addBubble("user", userMessage);
    activeBubble = addBubble("assistant", "");
    history.push({ role: "user", content: userMessage });

    currentAbort = new AbortController();
    // 30s initial connection timeout — cleared on first SSE event
    let connectTimer = setTimeout(() => {
      currentAbort?.abort();
    }, 30000);

    let assistantText = "";
    try {
      let res;
      if (useLocalBackend) {
        res = await fetch(`${LOCAL_BACKEND}/chat`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: history, model: getModelId() }),
          signal: currentAbort.signal,
        });
      } else {
        const system = await loadSystemPrompt();
        res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-api-key": getKey(),
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true",
          },
          body: JSON.stringify({
            model: getModelId(),
            max_tokens: MAX_TOKENS,
            system,
            messages: history,
            stream: true,
          }),
          signal: currentAbort.signal,
        });
      }

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`HTTP ${res.status}: ${errBody.slice(0, 200)}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (connectTimer) { clearTimeout(connectTimer); connectTimer = null; }

        buf += decoder.decode(value, { stream: true });
        let idx;
        while ((idx = buf.indexOf("\n")) !== -1) {
          const line = buf.slice(0, idx).trim();
          buf = buf.slice(idx + 1);
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload) continue;
          try {
            const evt = JSON.parse(payload);
            // Local backend: {type:'content',text}; Anthropic: content_block_delta
            if (evt.type === "content" && typeof evt.text === "string") {
              appendToken(evt.text);
              assistantText += evt.text;
            } else if (evt.type === "content_block_delta" &&
                       evt.delta?.type === "text_delta") {
              appendToken(evt.delta.text);
              assistantText += evt.delta.text;
            } else if (evt.type === "error") {
              throw new Error(evt.message || "backend error");
            }
          } catch (e) {
            if (e instanceof Error && e.message) throw e;
            /* skip non-JSON lines */
          }
        }
      }
      flushPending();
      if (assistantText) {
        history.push({ role: "assistant", content: assistantText });
      }
    } catch (e) {
      flushPending();
      if (e.name === "AbortError") {
        activeBubble?.classList.add("rol-bubble--cancelled");
        if (assistantText) history.push({ role: "assistant", content: assistantText });
      } else {
        activeBubble.textContent = `error: ${e.message}`;
        // rollback the user turn so retry is clean
        history.pop();
      }
    } finally {
      if (connectTimer) clearTimeout(connectTimer);
      currentAbort = null;
      streaming = false;
      sendBtn.disabled = false;
      activeBubble = null;

      // 50ms settle delay before processing queued message
      if (queued) {
        const q = queued;
        queued = null;
        setTimeout(() => streamChat(q), 50);
      }
    }
  }

  // --- Form handling ---
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = input.value.trim();
    if (!msg) return;
    input.value = "";
    if (streaming) { queued = msg; return; }
    streamChat(msg);
  });

  // Shift+Enter for newline, Enter to send
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

  updateKeyStatus();
  probeLocalBackend();
})();
