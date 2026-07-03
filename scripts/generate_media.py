from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "media"
OUT.mkdir(parents=True, exist_ok=True)


def draw_ui_preview() -> None:
    img = Image.new("RGB", (1280, 720), (12, 16, 24))
    d = ImageDraw.Draw(img)

    d.rectangle((0, 390, 1280, 720), fill=(17, 28, 43))
    d.rounded_rectangle((34, 34, 1246, 686), radius=28, fill=(20, 26, 38), outline=(58, 80, 112), width=3)

    d.rounded_rectangle((84, 82, 738, 172), radius=12, fill=(33, 49, 74))
    d.rounded_rectangle((84, 204, 738, 620), radius=16, fill=(24, 34, 51))
    d.rectangle((112, 238, 716, 252), fill=(192, 210, 234))
    d.rectangle((112, 278, 716, 292), fill=(192, 210, 234))
    d.rectangle((112, 318, 716, 332), fill=(192, 210, 234))
    d.rectangle((112, 358, 716, 372), fill=(192, 210, 234))
    d.rectangle((112, 398, 716, 412), fill=(192, 210, 234))

    d.rounded_rectangle((792, 72, 1188, 648), radius=36, fill=(7, 10, 16), outline=(72, 95, 132), width=4)
    d.rounded_rectangle((816, 96, 1164, 624), radius=24, fill=(15, 17, 21))
    d.rounded_rectangle((838, 134, 1142, 290), radius=14, fill=(25, 32, 44))
    d.rounded_rectangle((838, 314, 1142, 366), radius=10, fill=(23, 30, 42))
    d.rounded_rectangle((838, 386, 1142, 438), radius=10, fill=(23, 30, 42))
    d.rounded_rectangle((838, 458, 1142, 510), radius=10, fill=(23, 30, 42))
    d.rounded_rectangle((838, 530, 1142, 582), radius=10, fill=(23, 30, 42))

    img.save(OUT / "ui-preview.png", "PNG")


def draw_social_preview() -> None:
    img = Image.new("RGB", (1280, 640), (10, 14, 24))
    d = ImageDraw.Draw(img)

    d.rectangle((0, 320, 1280, 640), fill=(14, 24, 38))
    d.rounded_rectangle((56, 56, 1224, 584), radius=28, fill=(19, 26, 39), outline=(58, 80, 112), width=3)

    d.rounded_rectangle((92, 94, 760, 180), radius=12, fill=(28, 44, 68))
    d.rounded_rectangle((92, 210, 760, 290), radius=12, fill=(26, 40, 61))
    d.rounded_rectangle((92, 326, 760, 452), radius=14, fill=(24, 35, 52))

    d.rounded_rectangle((840, 94, 1160, 546), radius=28, fill=(8, 12, 18), outline=(68, 91, 126), width=3)
    d.rounded_rectangle((858, 112, 1142, 528), radius=20, fill=(15, 17, 21))
    d.rounded_rectangle((882, 170, 1118, 278), radius=12, fill=(25, 32, 44))

    img.save(OUT / "social-preview.png", "PNG")


def draw_typing_demo_gif() -> None:
    frames = []
    for i in range(18):
        frame = Image.new("RGB", (560, 300), (15, 17, 21))
        d = ImageDraw.Draw(frame)

        d.rounded_rectangle((14, 14, 546, 286), radius=16, fill=(23, 29, 40), outline=(52, 74, 106), width=2)
        d.rectangle((34, 42, 526, 66), fill=(24, 33, 48))
        d.rectangle((34, 92, 526, 182), fill=(18, 24, 34))
        d.rectangle((34, 206, 526, 238), fill=(20, 27, 38))
        d.rectangle((34, 206, 34 + int(492 * ((i + 1) / 18)), 238), fill=(96, 165, 250))

        for k in range(min(i + 2, 16)):
            x = 44 + k * 28
            d.rectangle((x, 104, x + 22, 170), fill=(74, 222, 128))

        frames.append(frame)

    frames[0].save(
        OUT / "typing-demo.gif",
        save_all=True,
        append_images=frames[1:],
        duration=110,
        loop=0,
    )


def main() -> None:
    draw_ui_preview()
    draw_social_preview()
    draw_typing_demo_gif()
    for p in sorted(OUT.iterdir()):
        print(f"{p.name} {p.stat().st_size}")


if __name__ == "__main__":
    main()
