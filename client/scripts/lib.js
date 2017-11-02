const fs = require('fs');
const path = require('path');

const babel = require('babel-core');

const packageJson = require('../package.json');

process.env.NODE_ENV = 'production';


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

const babelrc = packageJson.babel;

const BASE_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(BASE_DIR, 'src');
const LIB_DIR = path.join(BASE_DIR, 'lib');

walk(SRC_DIR)
  .filter(filepath => filepath.match(/\.jsx?/))
  .map((filepath) => {
    const libpath = filepath
      .replace(SRC_DIR, LIB_DIR)
      .replace('.jsx', '.js');

    mkdirp(libpath);

    // first transform converts es6 code to cjs
    const transform1 = babel.transformFileSync(filepath, babelrc);
    fs.writeFileSync(libpath, transform1.code);

    // second transform converts `import/export` to `require`
    const transform2 = babel.transformFileSync(libpath, {
      plugins: ['transform-es2015-modules-commonjs']
    });
    fs.writeFileSync(libpath, transform2.code);

    // log progress
    const from = filepath.replace(`${BASE_DIR}/`, '');
    const to = libpath.replace(`${BASE_DIR}/`, '');
    console.log(from, '->', to);
  });