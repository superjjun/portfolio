#!/usr/bin/env python3
"""Perceptual 2x image enhancement for the six user-provided portfolio images.

No re-layout or semantic edits. Output paths remain exactly the same so existing
site references work. Only source files that are still low-resolution are updated.
"""
from pathlib import Path
from PIL import Image, ImageFilter

ROOT = Path("fashion/assets/submitted")
ASSETS = {
    "soundcloud": 2,
    "lostlink": 2,
    "voltup": 2,
    "junggonara": 3,
    "ppomppu": 2,
    "roundlab": 2,
}

for name, factor in ASSETS.items():
    path = ROOT / (name + "-poster.webp")
    if not path.is_file():
        raise FileNotFoundError(str(path))
    with Image.open(path) as source:
        img = source.convert("RGB")
        original_size = img.size
    # Skip on subsequent runs; avoid cascading resampling artifacts.
    if original_size[0] >= 890 or original_size[1] >= 1600:
        print(f"SKIP {name} {original_size} already high resolution")
        continue
    # Lanczos resampling preserves the exact layout, colors and typography.
    upscaled = img.resize(
        (img.width * factor, img.height * factor),
        Image.Resampling.LANCZOS,
    )
    # Moderate edge contrast specifically improves the clarity of small UI labels.
    upscaled = upscaled.filter(
        ImageFilter.UnsharpMask(radius=1.25, percent=115, threshold=2)
    )
    # 98 quality: minimal recompression compared with previous ~20-95KB assets.
    upscaled.save(path, "WEBP", quality=98, method=6)
    print(f"UPSCALE {name} {original_size} -> {upscaled.size} ({path.stat().st_size:,} bytes)")
