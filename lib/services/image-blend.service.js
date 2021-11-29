const { promisify } = require('util');
const blend = require('@mapbox/blend');
const blendPromise = promisify(blend);

module.exports = {
  blendImage
}

/**
 * Function that accepts a array of images and merges them together
 * @param {buffer} images array containing the images to be blended together
 * @param {integer} width width of the resultant image
 * @param {integer} height height of the resultant image
 * @param {string} format output format of the resultant image
 * @returns promise which resolves to the blended image
 */
function blendImage(images, width, height, format = 'jpeg') {
  const imagesArray = constructImagesArray(images);
  return blendPromise(imagesArray, {
    width,
    height,
    format
  });
}

function constructImagesArray(images) {
  const imageArray = [];
  images.forEach(imageValue => {
    imageArray.push({
      buffer: Buffer.from(imageValue.image, { encoding: 'binary' }),
      x: imageValue.offsetX,
      y: imageValue.offsetY
    })
  });
  return imageArray;
}
