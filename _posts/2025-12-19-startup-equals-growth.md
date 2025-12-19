---
layout: post
title: "Startup = Growth (Reminder to Self)"
description: "An interactive visualization of Paul Graham's insight that the only essential thing about startups is growth."
date: 2025-12-19 10:00:00 -0500
categories: [startups]
---

[https://www.paulgraham.com/growth.html](https://www.paulgraham.com/growth.html)

> A startup is a company designed to grow fast. Being newly founded does not in itself make a company a startup. Nor is it necessary for a startup to work on technology, or take venture funding, or have some sort of "exit." The only essential thing is growth. Everything else we associate with startups follows from growth.
>
> If you want to start one it's important to understand that. Startups are so hard that you can't be pointed off to the side and hope to succeed. You have to know that growth is what you're after. The good news is, if you get growth, everything else tends to fall into place. Which means you can use growth like a compass to make almost every decision you face.

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>
.growth-widget {
    margin: var(--space-7) 0;
}

.growth-metrics {
    display: flex;
    justify-content: center;
    gap: var(--space-8);
    margin-bottom: var(--space-6);
    padding: var(--space-5) 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
}

.growth-metric {
    text-align: center;
}

.growth-metric-value {
    font-family: var(--font-display);
    font-size: 2.8rem;
    font-weight: 500;
    color: var(--ink);
    line-height: 1;
}

.growth-metric-value.accent {
    color: var(--vermillion);
}

.growth-metric-label {
    font-family: var(--font-body);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--kala-mountain);
    margin-top: var(--space-2);
}

.growth-chart-wrapper {
    margin-bottom: var(--space-6);
}

.growth-chart-container {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 2px;
    padding: var(--space-4);
    height: 320px;
}

[data-theme="dark"] .growth-chart-container {
    background: rgba(0, 0, 0, 0.2);
}

.growth-legend {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space-4);
    margin-top: var(--space-4);
    font-size: 0.75rem;
    color: var(--kala-mountain);
}

.growth-legend-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
}

.growth-legend-line {
    width: 16px;
    height: 2px;
    border-radius: 1px;
}

.growth-legend-item.ours {
    font-weight: 600;
    color: var(--ink);
}

.growth-legend-item.ours .growth-legend-line {
    height: 3px;
}

.growth-controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-5);
    margin-bottom: var(--space-5);
}

.growth-control-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.growth-control-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}

.growth-control-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--kala-mountain);
}

.growth-control-value {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--ink);
}

.growth-widget input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 2px;
    background: var(--border);
    border-radius: 1px;
    outline: none;
    cursor: pointer;
}

.growth-widget input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    background: var(--paper);
    border: 2px solid var(--kala-rust);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.15s ease;
}

.growth-widget input[type="range"]::-webkit-slider-thumb:hover {
    background: var(--kala-rust);
}

.growth-widget input[type="range"]::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background: var(--paper);
    border: 2px solid var(--kala-rust);
    border-radius: 50%;
    cursor: pointer;
}

.growth-horizon-group {
    grid-column: 1 / -1;
}

.growth-horizon-buttons {
    display: flex;
    gap: var(--space-2);
}

.growth-horizon-btn {
    flex: 1;
    padding: var(--space-3) var(--space-4);
    background: transparent;
    border: 1px solid var(--border);
    font-family: var(--font-body);
    font-size: 0.85rem;
    color: var(--ink-muted);
    cursor: pointer;
    transition: all 0.15s ease;
}

.growth-horizon-btn:hover {
    border-color: var(--kala-rust);
    color: var(--ink);
}

.growth-horizon-btn.active {
    background: var(--ink);
    border-color: var(--ink);
    color: var(--paper);
}

.growth-final-arr {
    text-align: center;
    padding: var(--space-5);
    background: rgba(255, 255, 255, 0.5);
    border-left: 3px solid var(--vermillion);
    margin-top: var(--space-5);
}

[data-theme="dark"] .growth-final-arr {
    background: rgba(0, 0, 0, 0.2);
}

.growth-final-arr-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--kala-mountain);
    margin-bottom: var(--space-2);
}

.growth-final-arr-value {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 500;
    color: var(--ink);
}

@media (max-width: 600px) {
    .growth-metrics {
        gap: var(--space-5);
    }
    .growth-metric-value {
        font-size: 2rem;
    }
    .growth-controls {
        grid-template-columns: 1fr;
    }
    .growth-horizon-group {
        grid-column: 1;
    }
}
</style>

<div class="growth-widget">
    <div class="growth-metrics">
        <div class="growth-metric">
            <div class="growth-metric-value accent" id="weeks-double">10</div>
            <div class="growth-metric-label">Weeks to Double</div>
        </div>
        <div class="growth-metric">
            <div class="growth-metric-value" id="yearly-multiple">33.7x</div>
            <div class="growth-metric-label">Yearly Multiple</div>
        </div>
    </div>

    <div class="growth-chart-wrapper">
        <div class="growth-chart-container">
            <canvas id="growth-chart"></canvas>
        </div>
        <div class="growth-legend">
            <div class="growth-legend-item">
                <div class="growth-legend-line" style="background: rgba(200,68,46,0.25);"></div>
                <span>1%</span>
            </div>
            <div class="growth-legend-item">
                <div class="growth-legend-line" style="background: rgba(200,68,46,0.35);"></div>
                <span>3%</span>
            </div>
            <div class="growth-legend-item">
                <div class="growth-legend-line" style="background: rgba(200,68,46,0.45);"></div>
                <span>5%</span>
            </div>
            <div class="growth-legend-item">
                <div class="growth-legend-line" style="background: rgba(200,68,46,0.55);"></div>
                <span>7%</span>
            </div>
            <div class="growth-legend-item">
                <div class="growth-legend-line" style="background: rgba(200,68,46,0.70);"></div>
                <span>9%</span>
            </div>
            <div class="growth-legend-item">
                <div class="growth-legend-line" style="background: rgba(200,68,46,0.85);"></div>
                <span>11%</span>
            </div>
            <div class="growth-legend-item ours">
                <div class="growth-legend-line" style="background: #c8442e;"></div>
                <span>Us</span>
            </div>
        </div>
    </div>

    <div class="growth-controls">
        <div class="growth-control-group">
            <div class="growth-control-header">
                <span class="growth-control-label">Starting Monthly Revenue</span>
                <span class="growth-control-value" id="arr-display">$12K</span>
            </div>
            <input type="range" id="starting-arr" min="1000" max="100000" value="1000" step="1000">
        </div>

        <div class="growth-control-group">
            <div class="growth-control-header">
                <span class="growth-control-label">Weekly Growth</span>
                <span class="growth-control-value" id="rate-display">7.0%</span>
            </div>
            <input type="range" id="growth-rate" min="0.5" max="15" value="7" step="0.5">
        </div>

        <div class="growth-control-group growth-horizon-group">
            <div class="growth-control-header">
                <span class="growth-control-label">Time Horizon</span>
            </div>
            <div class="growth-horizon-buttons">
                <button class="growth-horizon-btn" data-months="6">6 mo</button>
                <button class="growth-horizon-btn active" data-months="12">12 mo</button>
                <button class="growth-horizon-btn" data-months="18">18 mo</button>
                <button class="growth-horizon-btn" data-months="24">24 mo</button>
            </div>
        </div>
    </div>

    <div class="growth-final-arr">
        <div class="growth-final-arr-label">Final Monthly Revenue</div>
        <div class="growth-final-arr-value" id="final-arr">$405K</div>
    </div>
</div>

<script>
(function() {
    let state = {
        startingARR: 1000,
        growthRate: 7,
        timeHorizon: 12
    };

    let chart;
    const ctx = document.getElementById('growth-chart').getContext('2d');

    function formatCurrency(value) {
        if (value >= 1e9) return '$' + (value / 1e9).toFixed(1) + 'B';
        if (value >= 1e6) return '$' + (value / 1e6).toFixed(1) + 'M';
        if (value >= 1e3) return '$' + (value / 1e3).toFixed(0) + 'K';
        return '$' + value.toFixed(0);
    }

    function calculateGrowth(startMonthly, weeklyRate, weeks) {
        const data = [startMonthly];
        let current = startMonthly;
        for (let i = 1; i <= weeks; i++) {
            current = current * (1 + weeklyRate / 100);
            data.push(current);
        }
        return data;
    }

    function generateLabels(weeks) {
        const labels = [];
        for (let i = 0; i <= weeks; i++) {
            labels.push(i % 4 === 0 ? 'M' + (i / 4) : '');
        }
        return labels;
    }

    function isDarkMode() {
        return document.documentElement.getAttribute('data-theme') === 'dark' ||
               (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches &&
                !document.documentElement.getAttribute('data-theme'));
    }

    function getChartColors() {
        const dark = isDarkMode();
        return {
            gridColor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(20,20,20,0.06)',
            tickColor: dark ? '#8b8b8b' : '#8b7b7b',
            tooltipBg: dark ? '#2a2a2a' : '#141414'
        };
    }

    function createChart() {
        if (chart) chart.destroy();
        const colors = getChartColors();

        chart = new Chart(ctx, {
            type: 'line',
            data: { labels: [], datasets: [] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { intersect: false, mode: 'index' },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: colors.tooltipBg,
                        titleFont: { family: 'Source Serif 4', size: 11 },
                        bodyFont: { family: 'Source Serif 4', size: 11 },
                        padding: 10,
                        callbacks: {
                            label: ctx => formatCurrency(ctx.parsed.y)
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: colors.gridColor, drawBorder: false },
                        ticks: {
                            color: colors.tickColor,
                            font: { family: 'Source Serif 4', size: 10 }
                        }
                    },
                    y: {
                        grid: { color: colors.gridColor, drawBorder: false },
                        ticks: {
                            color: colors.tickColor,
                            font: { family: 'Source Serif 4', size: 10 },
                            callback: v => formatCurrency(v)
                        }
                    }
                }
            }
        });
    }

    function updateChart() {
        const weeks = state.timeHorizon * 4;
        const labels = generateLabels(weeks);

        const benchmarks = [
            { rate: 1, opacity: 0.25 },
            { rate: 3, opacity: 0.35 },
            { rate: 5, opacity: 0.45 },
            { rate: 7, opacity: 0.55 },
            { rate: 9, opacity: 0.70 },
            { rate: 11, opacity: 0.85 }
        ];

        let datasets = benchmarks.map(b => ({
            label: b.rate + '%',
            data: calculateGrowth(state.startingARR, b.rate, weeks),
            borderColor: `rgba(200, 68, 46, ${b.opacity})`,
            backgroundColor: 'transparent',
            borderWidth: 1,
            pointRadius: 0,
            tension: 0.4
        }));

        datasets.push({
            label: 'Us',
            data: calculateGrowth(state.startingARR, state.growthRate, weeks),
            borderColor: '#c8442e',
            backgroundColor: 'rgba(200, 68, 46, 0.05)',
            fill: true,
            borderWidth: 2.5,
            pointRadius: 0,
            tension: 0.4
        });

        chart.data.labels = labels;
        chart.data.datasets = datasets;
        chart.update('none');
    }

    function updateMetrics() {
        const weeks = state.timeHorizon * 4;
        const data = calculateGrowth(state.startingARR, state.growthRate, weeks);
        const finalARR = data[data.length - 1];

        const weeksToDouble = Math.round(Math.log(2) / Math.log(1 + state.growthRate / 100));
        document.getElementById('weeks-double').textContent = weeksToDouble;

        const yearlyMultiple = Math.pow(1 + state.growthRate / 100, 52);
        document.getElementById('yearly-multiple').textContent = yearlyMultiple.toFixed(1) + 'x';

        document.getElementById('final-arr').textContent = formatCurrency(finalARR);
    }

    function updateDisplays() {
        document.getElementById('arr-display').textContent = formatCurrency(state.startingARR);
        document.getElementById('rate-display').textContent = state.growthRate.toFixed(1) + '%';
    }

    document.getElementById('starting-arr').addEventListener('input', e => {
        state.startingARR = parseInt(e.target.value);
        updateDisplays();
        updateChart();
        updateMetrics();
    });

    document.getElementById('growth-rate').addEventListener('input', e => {
        state.growthRate = parseFloat(e.target.value);
        updateDisplays();
        updateChart();
        updateMetrics();
    });

    document.querySelectorAll('.growth-horizon-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.growth-horizon-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.timeHorizon = parseInt(btn.dataset.months);
            updateChart();
            updateMetrics();
        });
    });

    const observer = new MutationObserver(() => {
        createChart();
        updateChart();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    createChart();
    updateChart();
    updateMetrics();
    updateDisplays();
})();
</script>

> It's not just that if you want to succeed in some domain, you have to understand the forces driving it. Understanding growth is what starting a startup consists of. What you're really doing (and to the dismay of some observers, all you're really doing) when you start a startup is committing to solve a harder type of problem than ordinary businesses do. You're committing to search for one of the rare ideas that generates rapid growth. Because these ideas are so valuable, finding one is hard. The startup is the embodiment of your discoveries so far. Starting a startup is thus very much like deciding to be a research scientist: you're not committing to solve any specific problem; you don't know for sure which problems are soluble; but you're committing to try to discover something no one knew before. A startup founder is in effect an economic research scientist. Most don't discover anything that remarkable, but some discover relativity.
