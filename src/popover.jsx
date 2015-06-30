"use strict";

import React from 'react';

var getDimensions = function(el) {
    var el_style      = window.getComputedStyle(el),
        el_display    = el_style.display,
        el_position   = el_style.position,
        el_visibility = el_style.visibility,
        el_max_height = el_style.maxHeight.replace('px', '').replace('%', ''),

        wanted_dimensions = {};

    // if its not hidden we just return normal height
    if(el_display !== 'none' && el_max_height !== '0') {
        return el.offsetHeight;
    }

    // the element is hidden so:
    // making the el block so we can measure its height but still be hidden
    el.style.position   = 'absolute';
    el.style.visibility = 'hidden';
    el.style.display    = 'block';

    wanted_dimensions['height']     = el.offsetHeight;
    wanted_dimensions['width']      = el.offsetWidth;

    // reverting to the original values
    el.style.display    = el_display;
    el.style.position   = el_position;
    el.style.visibility = el_visibility;

    return wanted_dimensions;
}

export default class Popover extends React.Component {
  static defaultProps = {
    toggleButton: <button className="btn btn-lrg btn-success">Toggle Menu</button>,
    isOpen: false,
    position: 'bottom',
    topOffset: 10,
    horizontalJustify: 'left'
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.buttonHeight = React.findDOMNode(this.refs.toggleButton).offsetHeight;
    this.buttonWidth = React.findDOMNode(this.refs.toggleButton).offsetWidth;

    let dimensions = getDimensions(React.findDOMNode(this.refs.popover));

    this.popoverHeight = dimensions.height;
    this.popoverWidth = dimensions.width;

    document.addEventListener('click', (ev) => {
      ev.stopPropagation();
      this.handleClick(true);
    });

    React.findDOMNode(this.refs.popover).addEventListener('click', (ev) => {
      ev.stopPropagation();
      this.handleClick(this.props.isOpen);
    });

    React.findDOMNode(this.refs.toggleButton).addEventListener('click', (ev) => {
      ev.stopPropagation();
      this.handleClick(this.props.isOpen);
    });
  }

  handleClick(value) {
    this.props.handleClick(value);
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
        offset = '0px';
        break;
      case 'right':
        offset = '0px';
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
        offset = '0px';
        break;
      case 'bottom':
        offset = '0px';
        break;
      case 'left':
        offset = `-${this.popoverWidth + 10}px`;
        break;
      case 'right':
        offset = `${this.popoverWidth}px`;
        break;
      default:
        offset = 0;
    }

    return offset;
  }

  render() {
    let toggleButton = React.cloneElement(this.props.toggleButton, {
      ref: 'toggleButton'
    });

    let popoverClass = `popover-menu ${this.props.className}`;
    let contentClass = `popover-content ${this.props.position} ${this.props.isOpen ? 'show' : ''}`
    let contentStyles = { top: this.calculateTopOffset() }
    contentStyles[this.props.horizontalJustify] = this.calculateLeftOffset();

    return (
      <div className={popoverClass}>
        {toggleButton}
        <section className={contentClass} style={contentStyles} ref="popover">
          {this.props.children}
        </section>
      </div>
    )
  }
}
