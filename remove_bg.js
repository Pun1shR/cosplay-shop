const Jimp = require('jimp');

async function removeWhiteBackground() {
  try {
    const image = await Jimp.read('public/images/logo.jpg');
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      // Get colors
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];

      // If it's pure white or very close to it (e.g. > 240)
      if (red > 240 && green > 240 && blue > 240) {
        this.bitmap.data[idx + 3] = 0; // Alpha to 0
      }
    });
    await image.writeAsync('public/images/logo.png');
    console.log('Successfully created logo.png with transparent background');
  } catch (e) {
    console.error('Error:', e);
  }
}

removeWhiteBackground();
