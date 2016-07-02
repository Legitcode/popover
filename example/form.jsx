import React, { Component } from "react"
import ReactDOM from "react-dom"
import Popover from "../src/popover.jsx"
import "../src/css/default.scss"

export default class Form extends Component {
  constructor(props) {
    super(props)

    this.toggleMenu = this.toggleMenu.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      isOpen: false
    }
  }

  onSubmit() {
    const input = ReactDOM.findDOMNode(this.refs.input)

    alert(`${input.value} submitted!`)
  }

  toggleMenu(isOpen) {
    this.setState({ isOpen: !isOpen })
  }

  render() {
    const toggleButton = <button className="btn btn-lrg btn-success">Toggle Menu</button>

    return (
      <div className="container">
        <Popover
          stopPropagation={ true }
          toggleButton={ toggleButton }
          handleClick={ this.toggleMenu }
          isOpen={ this.state.isOpen }
          leftOffset={ 10 }
          position="left"
        >

          <div className="form">
            <label>Foo</label>
            <input type="text" className="form-control" ref="input"/>
            <button ref="submit"
              className="btn btn-primary"
              onClick={ this.onSubmit }
            >
              Submit
            </button>
          </div>
        </Popover>
      </div>
    )
  }
}

ReactDOM.render(<Form />, document.getElementById("react"))
