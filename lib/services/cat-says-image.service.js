const { stringify } = require('querystring');
const { CAT_SAYS_URL } = require("../config");
const { getRequest } = require("../utils/http.util");


module.exports = {
  fetchCatSaysImage
};

/**
 * Method to fetch the cat image
 * @param {string} text the text in the cat image
 * @param {object} object with values for -> 'width' of the image width, 'height' of the image, 'color' image (background?) color, 'size' dimension of the image, 'encoding' (optional) the encoding with which the image needs to be transferred
 * @returns binary cat image with the greeting text
 */
async function fetchCatSaysImage(text,
  { width = 400, height = 500, color = 'white', size = 100, encoding = 'binary' }) {
  const responseType = 'buffer';
  const queryString = stringify({ width, height, color, size, encoding });
  const catSaysUrl = `${CAT_SAYS_URL}${text}?${queryString}`;
  return getRequest(catSaysUrl, responseType);
}
