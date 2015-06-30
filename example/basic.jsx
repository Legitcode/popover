"use strict";

import React from 'react';
import _ from 'underscore';
import underscoreDeepExtend from 'underscore-deep-extend';
import Popover from '../src/popover';

_.mixin({deepExtend: underscoreDeepExtend(_)});

export default class Basic extends React.Component {
  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.changePosition = this.changePosition.bind(this);

    this.state = {
      isOpen: false,
      position: 'bottom'
    };
  }

  toggleMenu(isOpen) {
    this.setState({ isOpen: !isOpen });
  }

  changePosition(ev) {
    let position = React.findDOMNode(ev.currentTarget).value;
    this.setState({ position: position });
  }

  render() {
    let toggleButton = <button className="btn btn-lrg btn-success" onClick={this.toggleMenu}>Toggle Menu</button>

    return (
      <div className="container">
        <select onChange={this.changePosition} ref="positionSelect">
          <option value="bottom">Bottom</option>
          <option value="top">Top</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select><br/><br/>

        <Popover
          toggleButton={toggleButton}
          handleClick={this.toggleMenu}
          isOpen={this.state.isOpen}
          position={this.state.position}>

          <ul>
            <li>Menu Item One</li>
            <li>Menu Item Two</li>
            <li>Menu Item Three</li>
          </ul>
        </Popover>
      </div>
    )
  }
}

require('../src/css/default.scss');
React.render(<Basic />, document.getElementById('react'));
