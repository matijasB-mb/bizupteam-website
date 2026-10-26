/**
 * Jednokratna optimizacija slika u public/images.
 *
 * Statički izvoz na Apacheu nema Nextov optimizator slika: što stoji u mapi,
 * to preglednik skida. Zato su izvori ovdje već sitni —
 *   • Canon snimke (PNG s prozirnošću) → WebP, vizualno isti, višestruko manji
 *   • stock fotografije → najviše 1600 px široke, JPEG q78
 * Najveći prikaz na stranici je 1216 px, pa 1600 pokriva i 1.3x ekrane.
 *
 * Skripta je idempotentna: već pretvorene datoteke preskače.
 */
import sharp from "sharp";
import { readFileSync, readdirSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";

const root = join(process.cwd(), "public", "images");
let before = 0;
let after = 0;

async function walk(dir) {
  for (const name of readdirSync(dir)) {
    const file = join(dir, name);
    if (statSync(file).isDirectory()) {
      await walk(file);
      continue;
    }

    const ext = extname(name).toLowerCase();
    const size = statSync(file).size;

    if (ext === ".png") {
      const out = file.replace(/\.png$/i, ".webp");
      const buf = await sharp(readFileSync(file)).webp({ quality: 86, alphaQuality: 92, effort: 6 }).toBuffer();
      writeFileSync(out, buf);
      unlinkSync(file);
      before += size;
      after += buf.length;
      console.log(`png→webp  ${name}  ${(size / 1024).toFixed(0)} → ${(buf.length / 1024).toFixed(0)} kB`);
    } else if (ext === ".jpg" || ext === ".jpeg") {
      const buf = await sharp(readFileSync(file))
        .resize({ width: 1600, withoutEnlargement: true })
        .jpeg({ quality: 78, mozjpeg: true })
        .toBuffer();
      if (buf.length < size) {
        writeFileSync(file, buf);
        console.log(`jpg       ${name}  ${(size / 1024).toFixed(0)} → ${(buf.length / 1024).toFixed(0)} kB`);
        before += size;
        after += buf.length;
      }
    }
  }
}

await walk(root);
console.log(`\nukupno ${(before / 1024).toFixed(0)} kB → ${(after / 1024).toFixed(0)} kB`);
