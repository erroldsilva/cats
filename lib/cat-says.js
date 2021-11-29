const { join } = require('path');
const argv = require('minimist')(process.argv.slice(2));
const { fetchCatSaysImage } = require('./services/cat-says-image.service');
const { blendImage } = require('./services/image-blend.service');
const { saveBinaryFile } = require('./services/file.service');

const {
  greeting = 'Hello', who = 'errol',
  width = 400, height = 500, color = 'Pink', size = 100,
} = argv;

/**
 * IIFE aka the main method
 */
(async () => {
  await makeCatsGreet(greeting, who, width, height, color, size);
})();

/**
 * The controller method which does the following
 * 1. invokes the cat image api to fetch cat images with specified text
 * 2. passes the images to the blend method  
 * 3. saves the resultant image in disk
 */
async function makeCatsGreet(greetingText, whoText, imageWidth, imageHeight, imageColor, imageSize) {
  try {
    console.log(`Will fetch cat pics with greeting text as ${greetingText} addressed to ${whoText}`);
    console.log(`Image params are as follows \nimageWidth=${imageWidth}, \nimageHeight=${imageHeight}, \nimageColor=${imageColor}, \nimageSize=${imageSize}`);
    const greetingImageWidth = width * 2;
    const imageParams = { imageWidth, imageHeight, imageColor, imageSize }
    const greetingImage = await fetchCatSaysImage(greetingText, imageParams);
    const whoImage = await fetchCatSaysImage(whoText, imageParams);
    console.log(`Fetching images completed!! Blending them now...`);
    const greetingImages = [{
      image: greetingImage,
      offsetX: 0,
      offsetY: 0
    }, {
      image: whoImage,
      offsetX: width,
      offsetY: 0
    }];
    const blendedImage = await blendImage(greetingImages, greetingImageWidth, height);
    console.log(`Images have been blended, saving to disk now`);
    await saveBinaryFile(join(process.cwd(), `/cat-card-${new Date().getTime()}.jpg`), blendedImage)
  } catch (error) {
    console.error(`An error occurred while creating the cat image details as follows`, error);
  }
}
