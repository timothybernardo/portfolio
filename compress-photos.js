// node compress-photos.js
//
// compresses all images in public/images/ subfolders.
// creates a thumbnail (600px wide) for the gallery grid
// and a full size (1400px wide) for the detail view.
// originals are not modified — compressed versions go
// into public/images-compressed/

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "public", "images");
const thumbDir = path.join(__dirname, "public", "images-thumb");
const fullDir = path.join(__dirname, "public", "images-full");

const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function processImages() {
  const folders = fs.readdirSync(inputDir).filter((f) =>
    fs.statSync(path.join(inputDir, f)).isDirectory()
  );

  let count = 0;

  for (const folder of folders) {
    ensureDir(path.join(thumbDir, folder));
    ensureDir(path.join(fullDir, folder));

    const folderPath = path.join(inputDir, folder);
    const files = fs.readdirSync(folderPath).filter((f) =>
      imageExtensions.includes(path.extname(f).toLowerCase())
    );

    for (const file of files) {
      const input = path.join(folderPath, file);
      const outputName = file.replace(/\.[^.]+$/, ".jpg");

      // Thumbnail for gallery grid — 600px wide
      await sharp(input)
        .resize(600)
        .jpeg({ quality: 75 })
        .toFile(path.join(thumbDir, folder, outputName));

      // Full size for detail view — 1400px wide
      await sharp(input)
        .resize(1400)
        .jpeg({ quality: 82 })
        .toFile(path.join(fullDir, folder, outputName));

      count++;
    }
  }

  console.log(`Compressed ${count} photos.`);
  console.log(`Thumbnails: public/images-thumb/`);
  console.log(`Full size:  public/images-full/`);
}

processImages();