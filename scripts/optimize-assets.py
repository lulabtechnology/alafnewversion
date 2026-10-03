"""Export the selected artwork. Resize/compress only; preserve originals and alpha."""
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
assets = root / "src" / "assets"
specs = [
    ("mundo-alaf", "Mundo de aprendizaje", False),
    ("familia-collage", "Estudio en familia", False),
    ("alafito-saludo", "Alafito saludando", True),
    ("alafito-leyendo", "Alafito leyendo", True),
    ("alafito-guia", "Alafito como guía", True),
    ("virtual-school", "Clase virtual", False),
    ("programacion", "Programación", False),
    ("finanzas", "Educación financiera", False),
    ("emprendimiento", "Emprendimiento", False),
    ("campus-digital", "Campus y recursos digitales", False),
    ("mural-cierre", "Mural de cierre", False),
]
manifest = []
for key, title, transparent in specs:
    original = assets / f"{key}-original.png"
    output = assets / f"{key}.webp"
    with Image.open(original) as image:
        exported = image.copy()
        if transparent:
            if "A" not in image.getbands() or image.getchannel("A").getextrema() != (0, 255):
                raise ValueError(f"{key}: missing transparent alpha")
            if image.height > 1080:
                exported = image.resize((round(image.width * 1080 / image.height), 1080), Image.Resampling.LANCZOS)
        exported.save(output, "WEBP", quality=90 if transparent else 86, method=6)
        manifest.append({"key": key, "title": title, "original": original.name,
                         "web": output.name, "originalWidth": image.width,
                         "originalHeight": image.height, "webWidth": exported.width,
                         "webHeight": exported.height, "transparent": transparent,
                         "webBytes": output.stat().st_size})
        print(f"{key}: {image.size} -> {exported.size}, alpha={transparent}, {output.stat().st_size} bytes")
with Image.open(assets / "mundo-alaf-original.png") as image:
    image.convert("RGB").save(assets / "compartir-alaf.jpg", "JPEG", quality=88, optimize=True, progressive=True)
(assets / "assets.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
# Correct intrinsic dimensions after generation, without changing any compositions.
for filename in [root / "src" / "pages" / "home.mjs", root / "src" / "pages" / "programs.mjs", root / "src" / "pages" / "information.mjs"]:
    text = filename.read_text(encoding="utf-8")
    for item in manifest:
        if item["transparent"]:
            marker = f'{item["key"]}.webp" width="1145" height="1374"'
            text = text.replace(marker, f'{item["key"]}.webp" width="{item["originalWidth"]}" height="{item["originalHeight"]}"')
    filename.write_text(text, encoding="utf-8", newline="\n")
