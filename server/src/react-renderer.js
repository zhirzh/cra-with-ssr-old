const fs = require('fs');
const path = require('path');

const React = require('react');
const { renderToString } = require('react-dom/server');
const { Provider } = require('react-redux');
const { matchPath, StaticRouter } = require('react-router');

const { BUILD_DIR } = require('./paths');

const App = require('../../client/lib/components/App').default;
const createStore = require('../../client/lib/modules/store').default;

const routes = [
  '/index.html', // service-worker
  '/',

  '/page-1/:numbers(\\d+)',
  '/page-1/:alphabets([a-zA-Z]+)',

  '/page-1/:any',
  '/page-1/:any_regex(.*)',
  '/page-1/(.*)',
  '/page-1/*',

  '/page-1/:any_optional?',
  '/page-1',

  '/page-2',
  '/page-2/:foo?',
];

function reactRenderer(req, res, next) {
  const match = routes.find(route =>
    matchPath(req.path, {
      path: route,
      exact: true,
    }),
  );

  // bail
  if (!match) {
    return next();
  }

  const initialState = {
    foo: 'foobar',
    name: 'Slim Shady',
  };

  const store = createStore(initialState);

  // service-worker
  const location = match === '/index.html' ? '/' : req.url;

  const context = {};

  const myApp = renderToString(
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        <App />
      </StaticRouter>
    </Provider>,
  );

  const html = fs
    .readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8')
    .replace('__MY_APP__', myApp)
    .replace('__REDUX__', JSON.stringify(initialState));

  return res.send(html);
}

module.exports = reactRenderer;
