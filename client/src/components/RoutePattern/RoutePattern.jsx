import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RoutePattern extends Component {
  render() {
    return (
      <div>
        <h1>RoutePattern</h1>

        <h2>Params: {JSON.stringify(this.props.match.params)}</h2>

        <ul>
          <li>
            <Link to="/exact">
              exact
              <code>/exact</code>
            </Link>
          </li>

          <li>
            <Link to="/named/hello123">
              named
              <code>/named/:foo</code>
            </Link>

            <ul>
              <li>
                <Link to="/named-glob/1/2/3">
                  <code>/named-glob/:foo*</code>
                </Link>
              </li>

              <li>
                named-glob-one
                <code>/named-one/:foo+</code>
                <ul>
                  <li>
                    <Link to="/named-one/bar">
                      <i>SUCCESS</i>
                    </Link>
                  </li>

                  <li>
                    <Link to="/named-one/">
                      <i>FAIL</i>
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/named-optional/:foo?">
                  <code>/named-optional/:foo?</code>
                </Link>
              </li>

              <li>
                <Link to="/custom/:foo(\d+)">
                  <code>/custom/:foo(\d+)</code>
                </Link>
              </li>

              <li>
                <Link to="/unnamed/(.*)">
                  <code>/unnamed/(.*)</code>
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/nested/:foo/bar">
              <code>/nested/:foo/bar</code>
            </Link>
          </li>

          <li>
            <Link to="/glob/*">
              <code>/glob/*</code>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default RoutePattern;
