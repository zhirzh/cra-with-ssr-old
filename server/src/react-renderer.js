const fs = require('fs');
const path = require('path');

const React = require('react');
const { renderToString } = require('react-dom/server');
const { Provider } = require('react-redux');

const { BUILD_DIR } = require('./paths');

const App = require('../../client/lib/components/App').default;
const createStore = require('../../client/lib/modules/store').default;

function reactRenderer(req, res) {
  const initialState = {
    name: 'Slim Shady',
  };

  const store = createStore(initialState);

  const myApp = renderToString(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  const html = fs
    .readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8')
    .replace('__MY_APP__', myApp)
    .replace('__REDUX__', JSON.stringify(initialState));

  return res.send(html);
}

module.exports = reactRenderer;
