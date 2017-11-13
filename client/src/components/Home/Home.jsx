import React, { Component } from 'react';
import { connect } from 'react-redux';

import { resetName, updateName } from '../../reducers/name';

import logo from './logo.svg';
import './Home.css';

class Home extends Component {
  handleChange = (e) => {
    this.props.updateName(e.currentTarget.value);
  };

  render() {
    return (
      <div className="Home">
        <header className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h1 className="Home-title">Welcome to React</h1>
        </header>
        <p className="Home-intro">
          To get started, edit <code>src/Home.js</code> and save to reload.
        </p>
        <p className="Home-intro">
          <input onChange={this.handleChange} placeholder="Name" value={this.props.name} />
          <button onClick={this.props.resetName}>×</button>
        </p>
        <p className="Home-intro">
          Hi! My name is <strong>{this.props.name || '…'}</strong>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { name } = state;

  return { name };
}

const mapDispatchToProps = { resetName, updateName };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
