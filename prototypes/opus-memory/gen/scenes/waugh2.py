"""Brideshead: Castle Howard across the lake, a few masses in failing light."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from shadowkit import *

HZ = 500
s = Scene("waugh2", seed=3)


def house():
    parts = [f"M430 {HZ}V461H700V{HZ}Z M900 {HZ}V461H1170V{HZ}Z"]
    for x in (452, 470, 540, 612, 630, 968, 986, 1060, 1128, 1146):
        parts.append(f"M{x} 462V447H{x + 9}V462Z")
    parts.append(f"M700 {HZ}V434H900V{HZ}Z M738 435L800 415L862 435Z")
    for x in (708, 722, 870, 884):
        parts.append(f"M{x} 436V418H{x + 8}V436Z")
    parts.append("M772 420V388H828V420Z M776 389C776 368 788 356 800 356C812 356 824 368 824 389Z")
    parts.append("M795 358V346H805V358Z M796 347C796 341 798 339 800 339C802 339 804 341 804 347Z M799.3 340V328H800.7V340Z")
    parts.append("M1092 462V449H1112V462Z M1093 450C1093 442 1097 438 1102 438C1107 438 1111 442 1111 450Z")
    for x in (442, 500, 560, 650, 714, 886, 950, 1010, 1080, 1158):
        parts.append(f"M{x} 462V455.5H{x + 3.4}V462Z")
    return " ".join(parts)


sky(s, HZ)
birds(s, 0, ["M760 300C840 260 940 280 900 330C860 370 780 340 760 300Z",
             "M680 260C620 230 560 270 600 300C640 330 690 300 680 260Z"])
band(s, 1, 468, P["far"], amp=8, bottom=HZ + 2, seed=1)
band(s, 1, 482, P["far2"], amp=5, bottom=HZ + 2, seed=2)
# The shore: woods, then the house in front of them; reflected as one group.
s.add(2, '<g id="wa-shore">')
woods(s, 2, [(250, 470, 230, 46), (380, 478, 120, 36), (60, 466, 200, 52), (1330, 472, 200, 44),
             (1480, 466, 220, 50), (1230, 482, 110, 28), (446, 476, 60, 26), (1156, 476, 64, 26),
             (-180, 470, 260, 46), (1760, 470, 260, 48)], base=(474, HZ + 2))
silhouette(s, 2, house(), name="house")
s.add(2, "</g>")
water(s, 2, HZ, reflect_id="wa-shore")
lights(s, 2, [(746, 478), (770, 479), (830, 479), (854, 478), (566, 484), (1010, 483), (800, 452)], reflect_at=HZ)
mist(s, 2, HZ, [(500, 4, 520, 9), (1250, 8, 420, 7)], opacity=.45)
glints(s, 3, HZ + 30, 760)
# Swans far out on the water.
sw = "".join(f'<path transform="translate({dx} {HZ + 34})" d="M-9 0Q-8-4 0-4Q4-4 5-1Q5-9 7-10Q9-10 8.4-8.4L7.4-8Q6.2-6 7 0Z" fill="#d8d6ce"/>' for dx in (0, 26))
s.add(3, f'<g opacity=".75"><animateMotion path="M1180 0H380" dur="150s" repeatCount="indefinite"/>{sw}</g>')
bank(s, 4, "M-500 900V790C-300 770 -120 800 60 784C200 772 300 800 420 812C520 824 600 860 640 900Z")
bank(s, 4, "M1100 900C1160 850 1260 812 1380 800C1520 786 1660 770 1820 778C1950 784 2050 770 2100 760V900Z", P["near2"])
reeds(s, 4, [(-260, 420, 806, 30), (1180, 1880, 802, 30)])
s.write()
