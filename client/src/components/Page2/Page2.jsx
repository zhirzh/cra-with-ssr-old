import React, { Component } from 'react';

class Page2 extends Component {
  render() {
    return (
      <div>
        <h1>Page2</h1>
        <h2>Params: {JSON.stringify(this.props.match.params)}</h2>
      </div>
    );
  }
}

export default Page2;
