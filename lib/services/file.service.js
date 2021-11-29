const { writeFile } = require('fs');
const { promisify } = require('util');

const writeFilePromise = promisify(writeFile);

module.exports = {
  saveBinaryFile
}

/**
 * Saves the binary buffer contents in the disk @ a specified path
 * @param {*} path path of the file
 * @param {*} fileContent binary buffer to be stored in the disk
 * @returns promise
 */
function saveBinaryFile(path, fileContent) {
  const encoding = 'binary';
  return writeFilePromise(path, fileContent, encoding);
}
