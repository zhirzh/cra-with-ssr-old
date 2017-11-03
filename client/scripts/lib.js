const fs = require('fs');
const path = require('path');

const babel = require('babel-core');

const { mkdirp, walk } = require('./utils');
const packageJson = require('../package.json');

process.env.NODE_ENV = 'production';

const babelrc = packageJson.babel;

const BASE_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(BASE_DIR, 'src');
const LIB_DIR = path.join(BASE_DIR, 'lib');

const allFiles = walk(SRC_DIR);

allFiles.forEach((filepath) => {
  const libpath = filepath
    .replace(SRC_DIR, LIB_DIR)
    .replace('.jsx', '.js');

  mkdirp(libpath);

  // copy asset file
  fs.writeFileSync(libpath, fs.readFileSync(filepath));
});

allFiles
  .filter(filepath => filepath.match(/\.jsx?$/))
  .forEach((filepath) => {
    const libpath = filepath
      .replace(SRC_DIR, LIB_DIR)
      .replace('.jsx', '.js');

    mkdirp(libpath);

    // first transform converts es6 code to cjs
    const transform1 = babel.transformFileSync(filepath, babelrc);
    fs.writeFileSync(libpath, transform1.code);

    // second transform converts `import/export` to `require`
    const transform2 = babel.transformFileSync(libpath, {
      plugins: [
        'transform-es2015-modules-commonjs',
        [
          'webpack-loaders',
          {
            config: 'config/webpack.config.lib.js',
            verbose: false
          }
        ]
      ]
    });
    fs.writeFileSync(libpath, transform2.code);

    // log progress
    const from = filepath.replace(`${BASE_DIR}/`, '');
    const to = libpath.replace(`${BASE_DIR}/`, '');
    console.log(from, '->', to);
  });