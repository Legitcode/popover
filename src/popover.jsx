"use strict";

import React from 'react';

export default class Popover extends React.Component {
  static defaultProps = {
    toggleButton: null,
    position: 'bottom',
    topOffset: 10,
    leftOffset: 0,
    horizontalJustify: 'left'
  }

  constructor(props) {
    super(props);

    this.state = {
      topOffset: 0,
      leftOffset: 0,
      isOpen: props.isOpen || false
    };
  }

  componentWillReceiveProps(props){
    if(props.isOpen != this.state.isOpen) this.setState({isOpen: props.isOpen})
  }

  componentDidMount() {
    if(this.state.isOpen) this.calculateHeights();
    if(this.props.closeOnOuterClick !== false){
      document.addEventListener('click', (ev) => {
        if(ev.target.dataset['popover']) return ev.stopImmediatePropagation();
        if(this.state.isOpen == true) this.setState({isOpen: false})
      });
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.isOpen && this.state.isOpen != prevState.isOpen) this.calculateHeights();
  }

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  calculateHeights() {
    if(!this.state.isOpen) return true
    this.buttonHeight = React.findDOMNode(this.refs.toggleButton).offsetHeight;
    this.buttonWidth = React.findDOMNode(this.refs.toggleButton).offsetWidth;

    this.popoverHeight = React.findDOMNode(this.refs.popover).offsetHeight;
    this.popoverWidth = React.findDOMNode(this.refs.popover).offsetWidth;

    this.setState({
      topOffset: this.calculateTopOffset(),
      leftOffset: this.calculateLeftOffset()
    });
  }

  calculateTopOffset() {
    let offset = '0px';

    switch(this.props.position) {
      case 'top':
        offset = `-${this.popoverHeight + this.props.topOffset}px`;
        break;
      case 'bottom':
        offset = `${this.buttonHeight + this.props.topOffset}px`;
        break;
      case 'left':
        offset = `${this.props.topOffset}px`;
        break;
      case 'right':
        offset = `${this.props.topOffset}px`;
        break;
      default:
        offset = 0;
    }

    return offset;
  }

  calculateLeftOffset() {
    let offset = '0px';

    switch(this.props.position) {
      case 'top':
        offset = `${this.props.leftOffset}px`;
        break;
      case 'bottom':
        offset = `${this.props.leftOffset}px`;
        break;
      case 'left':
        offset = `-${this.popoverWidth + this.props.leftOffset}px`;
        break;
      case 'right':
        offset = `${this.buttonWidth + this.props.leftOffset}px`;
        break;
      default:
        offset = 0;
    }

    return offset;
  }

  render() {
    if(this.props.toggleButton){
      var toggleButton = React.cloneElement(this.props.toggleButton, {
        ref: 'toggleButton',
        'data-popover': true,
        onClick: this.toggle
      });
    }
    else {
      var toggleButton = (
        <div
          style={{display: 'none'}}
          onClick={this.toggle}
          data-popover="true"
          ref="toggleButton"
        />
      )
    }

    let contentStyles = { top: this.state.topOffset }
    contentStyles[this.props.horizontalJustify] = this.state.leftOffset;

    return (
      <div className={`popover-menu ${this.props.className || ''}`}>
        {toggleButton}
        {this.state.isOpen ?
          <section
            className={`popover-content ${this.props.position} show`}
            style={contentStyles}
            onClick={this.toggle}
            ref='popover'>
            {this.props.children}
          </section>
          : null}
      </div>
    )
  }
}
