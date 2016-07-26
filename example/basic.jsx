import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Popover from '../src/popover.jsx';
import '../src/css/default.scss';

export default class Basic extends Component {
  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.changePosition = this.changePosition.bind(this);

    this.state = {
      isOpen: false,
      position: 'bottom',
    };
  }

  toggleMenu(isOpen) {
    this.setState({ isOpen: !isOpen });
  }

  changePosition(event) {
    const position = ReactDOM.findDOMNode(event.currentTarget).value;
    this.setState({ position });
  }

  render() {
    const toggleButton = <button className="btn btn-lrg btn-success">Toggle Menu</button>;

    return (
      <div className="container">
        <select onChange={this.changePosition} ref="positionSelect">
          <option value="bottom">Bottom</option>
          <option value="top">Top</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select><br /><br />

        <Popover
          toggleButton={toggleButton}
          handleClick={this.toggleMenu}
          isOpen={this.state.isOpen}
          position={this.state.position}
          leftOffset={10}
        >

          <ul>
            <li>Menu Item One</li>
            <li>Menu Item Two</li>
            <li>Menu Item Three</li>
          </ul>
        </Popover>
      </div>
    );
  }
}

ReactDOM.render(<Basic />, document.getElementById('react'));
