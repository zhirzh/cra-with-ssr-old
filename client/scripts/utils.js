const fs = require('fs');
const path = require('path');

/**
 * Recursively create a directory
 * @param {string} filepath
 */
function mkdirp(filepath) {
  const dirname = filepath.endsWith('/')
    ? filepath
    : path.dirname(filepath);

  if (fs.existsSync(dirname)) {
    return;
  }

  mkdirp(dirname);

  fs.mkdirSync(dirname);
}

/**
 * Recursively traverse a directory
 * @param {string} dir
 * @returns {Array<string>}
 */
function walk(dir) {
  let results = [];

  fs.readdirSync(dir).forEach((filename) => {
    const filepath = path.join(dir, filename);

    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      results = results.concat(walk(filepath));
    } else {
      results.push(filepath);
    }
  });

  return results;
}

module.exports = {
  mkdirp,
  walk,
};
