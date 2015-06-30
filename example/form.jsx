"use strict";

import React from 'react';
import Popover from '../src/popover';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    let submitButton = React.findDOMNode(this.refs.submit);

    submitButton.addEventListener('click', (ev) => {
      this.onSubmit(ev);
    });
  }

  onSubmit() {
    console.log("CLICK!");
    let input = React.findDOMNode(this.refs.input);
    console.log(input.value);
  }

  toggleMenu(isOpen) {
    this.setState({ isOpen: !isOpen });
  }

  render() {
    let toggleButton = <button className="btn btn-lrg btn-success">Toggle Menu</button>;

    return (
      <div className="container">
        <Popover
          toggleButton={toggleButton}
          handleClick={this.toggleMenu}
          isOpen={this.state.isOpen}
          leftOffset={10}
          position='left'>

          <div className='form'>
            <label>Foo</label>
            <input type='text' className='form-control' ref='input'/>
            <button ref='submit' className='btn btn-primary'>Submit</button>
          </div>
        </Popover>
      </div>
    )
  }
}

require('../src/css/default.scss');
React.render(<Form />, document.getElementById('react'))
