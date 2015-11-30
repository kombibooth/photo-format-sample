import Canvas, { Image } from 'canvas';
import uuid from 'node-uuid';
import gm from 'gm';
import fs from 'fs';

const RESIZED_WIDTH = 1170;
const RESIZED_HEIGHT = 560;
const PADDING = 15;

export async function generate (images) {
  const canvas = new Canvas(1200, 1800);
  const imagesResized = await Promise.all(resizeImages(images));
  const ctx = canvas.getContext('2d');

  await Promise.all(drawImages(ctx, imagesResized));
  console.log(canvas.toBuffer());
  fs.writeFile('output.png', canvas.toBuffer());
}

function resizeImages (images) {
  return images.map((image, index) => {
    return new Promise((resolve, reject) => {
      const filename = `./tmp/${uuid.v4()}`;

      gm(image)
        .resize(RESIZED_WIDTH, RESIZED_HEIGHT, '^')
        .gravity('Center')
        .extent(1170, 560)
        .write(filename, (err) => {
          if (err) {
            return reject(err);
          }

          return resolve({ filename, index });
        });
    });
  })
}

function drawImages(ctx, images) {
  return images.map((image) => {
    return drawImage(ctx, image);
  });
}

async function drawImage (ctx, image) {
  const img = new Image();
  img.src = await readFile(image.filename);

  ctx.drawImage(
    img,
    PADDING,
    (image.index * RESIZED_HEIGHT) + (PADDING * (image.index + 1)),
    RESIZED_WIDTH,
    RESIZED_HEIGHT
  );
}

function readFile (filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}
