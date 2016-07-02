import React, { Component } from "react"
import ReactDOM from "react-dom"
import Popover from "../src/popover.jsx"
import "../src/css/default.scss"

export default class Expandable extends Component {
  constructor(props) {
    super(props)

    this.toggleMenu = this.toggleMenu.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      isOpen: false,
      inputSize: "100px",
      size: "small"
    }
  }

  componentDidMount() {
  }

  onSubmit(event) {
    const input = ReactDOM.findDOMNode(this.refs.input)

    const newInputSize = input.value == "small" ? "500px" : "100px",
      newSize = input.value == "small" ? "big" : "small"

    this.setState({
      inputSize: newInputSize,
      size: newSize
    })

    this.refs.popover.calculateDimensions()
  }

  toggleMenu(isOpen) {
    this.setState({ isOpen: !isOpen })
  }

  render() {
    const toggleButton = <button className="btn btn-lrg btn-success">Toggle Menu</button>,
      submitButton = <button ref="submit" className="btn btn-primary">Toggle Size</button>,
      inputStyles = { width: this.state.inputSize }

    return (
      <div className="container">
        <Popover
          toggleButton={ toggleButton }
          handleClick={ this.toggleMenu }
          isOpen={ this.state.isOpen }
          leftOffset={ 10 }
          ref="popover"
          position="left"
        >

          <div className="form">
            <label>Foo</label>
            <input type="text"
              className="form-control"
              style={ inputStyles }
              ref="input"
            />
            { submitButton }
          </div>
        </Popover>
      </div>
    )
  }
}

ReactDOM.render(<Expandable />, document.getElementById("react"))
