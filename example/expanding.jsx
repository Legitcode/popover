"use strict";

import React from 'react';
import Popover from '../src/popover';

export default class Expandable extends React.Component {
  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      isOpen: false,
      inputSize: "100px",
      size: "small"
    };
  }

  componentDidMount() {
    let submitButton = React.findDOMNode(this.refs.submit);

    submitButton.addEventListener('click', (ev) => {
      this.onSubmit(ev);
    });
  }

  onSubmit(ev) {
    console.log(ev);
    let newInputSize = this.state.size == "small" ? "500px" : "100px",
        newSize = this.state.size == "small" ? "big" : "small";

    this.setState({
      inputSize: newInputSize,
      size: newSize
    });

    this.refs.popover.calculateHeights();
  }

  toggleMenu(isOpen) {
    this.setState({ isOpen: !isOpen });
  }

  render() {
    let toggleButton = <button className="btn btn-lrg btn-success">Toggle Menu</button>,
        inputStyles = { width: this.state.inputSize };

    return (
      <div className="container">
        <Popover
          toggleButton={toggleButton}
          handleClick={this.toggleMenu}
          isOpen={this.state.isOpen}
          leftOffset={10}
          ref='popover'
          position='left'>

          <div className='form'>
            <label>Foo</label>
            <input type='text' className='form-control' style={inputStyles} ref='input'/>
            <button ref='submit' className='btn btn-primary'>Toggle Size</button>
          </div>
        </Popover>
      </div>
    )
  }
}

require('../src/css/default.scss');
React.render(<Expandable />, document.getElementById('react'))
