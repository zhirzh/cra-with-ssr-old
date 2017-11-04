import React, { Component } from 'react';
import { connect } from 'react-redux';

import { resetName, updateName } from './reducer';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  handleChange = (e) => {
    this.props.updateName(e.currentTarget.value);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          <input onChange={this.handleChange} placeholder="Name" value={this.props.name} />
          <button onClick={this.props.resetName}>×</button>
        </p>
        <p className="App-intro">
          Hi! My name is <strong>{this.props.name || '…'}</strong>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const name = state;

  return { name };
}

const mapDispatchToProps = { resetName, updateName };

export default connect(mapStateToProps, mapDispatchToProps)(App);
