import React from 'react'

export default class Popover extends React.Component {
  static defaultProps = {
    toggleButton: null,
    position: 'bottom',
    topOffset: 10,
    leftOffset: 0,
    horizontalJustify: 'left'
  }

  constructor(props) {
    super(props)

    this.state = {
      topOffset: 0,
      leftOffset: 0,
      isOpen: props.isOpen || false
    }
  }

  componentWillReceiveProps(props){
    if(props.isOpen != this.state.isOpen) this.setState({isOpen: props.isOpen})
  }

  componentDidMount() {
    if(this.state.isOpen) this.calculateDimensions()
    if(this.props.closeOnOuterClick !== false){
      document.addEventListener('click', this.globalClick)
    }
  }
  componentWillUnmount(){
    document.removeEventListener('click', this.globalClick)
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.isOpen && this.state.isOpen !== prevState.isOpen) this.calculateDimensions()
  }

  globalClick = () => {
    if(this.state.isOpen == true) this.setState({isOpen: false})
  }

  handleClick = (ev) => {
    if (ev.stopImmediatePropagation) {
      ev.stopImmediatePropagation()
    } else {
      ev.nativeEvent.stopImmediatePropagation()
    }
  }

  toggleButton = (ev) => {
    if (ev.stopImmediatePropagation) {
      ev.stopImmediatePropagation()
    } else {
      ev.nativeEvent.stopImmediatePropagation()
    }

    this.setState({isOpen: !this.state.isOpen})
  }

  calculateDimensions = () => {
    let toggleButton = React.findDOMNode(this.refs.toggleButton)
    let popover = React.findDOMNode(this.refs.popover)

    let buttonHeight = toggleButton.offsetHeight
    let buttonWidth = toggleButton.offsetWidth
    let popoverHeight = popover.offsetHeight
    let popoverWidth = popover.offsetWidth

    let topOffset = this.calculateTopOffset(popoverHeight, buttonHeight)
    let leftOffset = this.calculateLeftOffset(popoverWidth, buttonWidth)

    this.setState({
      popoverHeight,
      popoverWidth,
      topOffset,
      leftOffset
    })
  }

  calculateTopOffset(popoverHeight, buttonHeight) {
    let offset = '0px'

    switch(this.props.position) {
      case 'top':
        offset = `-${popoverHeight + this.props.topOffset}`
        break
      case 'bottom':
        offset = buttonHeight + this.props.topOffset
        break
      case 'left':
        offset = this.props.topOffset
        break
      case 'right':
        offset = this.props.topOffset
        break
      default:
        offset = 0
    }

    return offset
  }

  calculateLeftOffset(popoverWidth, buttonWidth) {
    let offset = '0px'

    switch(this.props.position) {
      case 'top':
        offset = this.props.leftOffset
        break
      case 'bottom':
        offset = this.props.leftOffset
        break
      case 'left':
        offset = `-${popoverWidth + this.props.leftOffset}`
        break
      case 'right':
        offset = buttonWidth + this.props.leftOffset
        break
      default:
        offset = 0
    }
    return offset
  }

  render() {
    if(this.props.toggleButton){
      var toggleButton = React.cloneElement(this.props.toggleButton, {
        ref: 'toggleButton',
        onClick: this.toggleButton
      })
    }
    else {
      var toggleButton = (
        <div
          style={{display: 'none'}}
          onClick={this.toggleButton}
          ref="toggleButton"
        />
      )
    }

    let contentStyles = { top: this.state.topOffset }
    contentStyles[this.props.horizontalJustify] = this.state.leftOffset

    return (
      <div className={`popover-menu ${this.props.className || ''}`}>
        {toggleButton}
        {this.state.isOpen ?
          <section
            className={`popover-content ${this.props.position} show`}
            style={contentStyles}
            onClick={this.handleClick}
            ref='popover'>
            {this.props.children}
          </section>
          : null}
      </div>
    )
  }
}
