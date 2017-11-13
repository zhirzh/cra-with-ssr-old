import React, { Component } from 'react';
import { connect } from 'react-redux';

class Page1 extends Component {
  render() {
    return (
      <div>
        <h1>Page1</h1>
        <h2>Params: {JSON.stringify(this.props.match.params)}</h2>
        <h2>Props: {JSON.stringify(this.props.foo)}</h2>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { foo } = state;

  return { foo };
}

export default connect(mapStateToProps)(Page1);
