import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

export default class Popover extends Component {
  static propTypes = {
    className: PropTypes.string,
    closeOnOuterClick: PropTypes.bool,
    horizontalJustify: PropTypes.oneOf(['left', 'right']),
    isOpen: PropTypes.bool,
    leftOffset: React.PropTypes.number,
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    toggleButton: PropTypes.node,
    topOffset: PropTypes.number,
  }

  static defaultProps = {
    toggleButton: null,
    position: 'bottom',
    topOffset: 10,
    leftOffset: 0,
    horizontalJustify: 'left',
  }

  constructor(props) {
    super(props);

    this.state = {
      topOffset: 0,
      leftOffset: 0,
      isOpen: props.isOpen || false,
    };
  }

  componentDidMount() {
    if (this.state.isOpen) this.calculateDimensions();
    if (this.props.closeOnOuterClick !== false) {
      document.addEventListener('click', this.globalClick);
    }
  }

  componentWillReceiveProps(props) {
    if (props.isOpen !== this.state.isOpen) this.setState({ isOpen: props.isOpen });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isOpen && this.state.isOpen !== prevState.isOpen) this.calculateDimensions();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.globalClick);
  }

  getContentStyles() {
    const contentStyles = { top: this.state.topOffset };
    contentStyles[this.props.horizontalJustify] = this.state.leftOffset;

    return contentStyles;
  }

  calculateDimensions = () => {
    const toggleButton = ReactDOM.findDOMNode(this.refs.toggleButton);
    const popover = ReactDOM.findDOMNode(this.refs.popover);

    const buttonHeight = toggleButton.offsetHeight;
    const buttonWidth = toggleButton.offsetWidth;
    const popoverHeight = popover.offsetHeight;
    const popoverWidth = popover.offsetWidth;

    const topOffset = this.calculateTopOffset(popoverHeight, buttonHeight);
    const leftOffset = this.calculateLeftOffset(popoverWidth, buttonWidth);

    this.setState({
      leftOffset,
      popoverHeight,
      popoverWidth,
      topOffset,
    });
  }

  calculateTopOffset(popoverHeight, buttonHeight) {
    let offset;

    switch (this.props.position) {
      case 'top':
        offset = `-${popoverHeight + this.props.topOffset}`;
        break;
      case 'bottom':
        offset = buttonHeight + this.props.topOffset;
        break;
      case 'left':
        offset = this.props.topOffset;
        break;
      case 'right':
        offset = this.props.topOffset;
        break;
      default:
        offset = 0;
    }

    return `${offset}px`;
  }

  calculateLeftOffset(popoverWidth, buttonWidth) {
    let offset;

    switch (this.props.position) {
      case 'top':
        offset = this.props.leftOffset;
        break;
      case 'bottom':
        offset = this.props.leftOffset;
        break;
      case 'left':
        offset = `-${popoverWidth + this.props.leftOffset}`;
        break;
      case 'right':
        offset = buttonWidth + this.props.leftOffset;
        break;
      default:
        offset = 0;
    }

    return `${offset}px`;
  }

  globalClick = () => {
    if (this.props.isOpen) {
      if (this.props.isOpen !== this.state.isOpen) this.setState({ isOpen: this.props.isOpen });
    } else {
      if (this.state.isOpen !== true) this.setState({ isOpen: false });
    }
  }

  handleContentClick = (ev) => {
    if (ev.stopImmediatePropagation) {
      ev.stopImmediatePropagation();
    } else {
      ev.nativeEvent.stopImmediatePropagation();
    }
  }

  handleToggleButtonClick = (ev) => {
    if (ev.stopImmediatePropagation) {
      ev.stopImmediatePropagation();
    } else {
      ev.nativeEvent.stopImmediatePropagation();
    }

    this.setState({ isOpen: !this.state.isOpen });
  }

  renderPopoverContentSection() {
    if (!this.state.isOpen) return <section></section>;

    return (
      <section
        className={`popover-content ${this.props.position} show`}
        style={this.getContentStyles()}
        onClick={this.handleContentClick}
        ref="popover"
      >
        {this.props.children}
      </section>
    );
  }

  renderToggleButton() {
    let button;

    const defaultButtonProps = {
      onClick: this.props.toggleButton.props.onClick || this.handleToggleButtonClick,
      ref: 'toggleButton',
    };

    if (this.props.toggleButton) {
      button = React.cloneElement(this.props.toggleButton, defaultButtonProps);
    } else {
      button = (
        <div
          {...defaultButtonProps}
          style={{ display: 'none' }}
        />
      );
    }

    return button;
  }

  render() {
    return (
      <div className={`popover-menu ${this.props.className || ''}`}>
        {this.renderToggleButton()}
        {this.renderPopoverContentSection()}
      </div>
    );
  }
}
