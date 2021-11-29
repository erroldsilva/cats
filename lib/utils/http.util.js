const got = require('got');

/**
 * Module provides a wrapper around http utils
 */
module.exports = {
  getRequest
}

/**
 * Does a GET call and returns the response, throws an error when the get call fails
 * @param {string} url the resource which has to be fetched
 * @returns response object
 */
async function getRequest(url, responseType) {
  const { body: response } = await got(url, {
    responseType
  });
  return response;
}
