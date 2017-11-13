import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../Home';
import Page1 from '../Page1';

function NoMatch() {
  return (
    <div>
      <h1>404</h1>
      Page Not Found
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/page-1" component={Page1} />
          <Route render={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
