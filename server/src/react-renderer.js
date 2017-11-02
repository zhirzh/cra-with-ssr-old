const fs = require('fs');
const path = require('path');

const React = require('react');
const { renderToString } = require('react-dom/server');

const { BUILD_DIR } = require('./paths');

const App = require('../client/src/App').default;

function reactRenderer(req, res) {
  const myApp = renderToString(<App />);

  const html = fs
    .readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8')
    .replace('__MY_APP__', myApp);

  return res.send(html);
}

module.exports = reactRenderer;
