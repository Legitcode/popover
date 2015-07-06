"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var Popover = (function (_React$Component) {
  function Popover(props) {
    _classCallCheck(this, Popover);

    _get(Object.getPrototypeOf(Popover.prototype), "constructor", this).call(this, props);

    this.handleClick = this.handleClick.bind(this);
  }

  _inherits(Popover, _React$Component);

  _createClass(Popover, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      this.buttonHeight = _react2["default"].findDOMNode(this.refs.toggleButton).offsetHeight;
      this.buttonWidth = _react2["default"].findDOMNode(this.refs.toggleButton).offsetWidth;

      this.popoverHeight = _react2["default"].findDOMNode(this.refs.popover).offsetHeight;
      this.popoverWidth = _react2["default"].findDOMNode(this.refs.popover).offsetWidth;

      document.addEventListener("click", function (ev) {
        ev.stopPropagation();
        _this.handleClick(true);
      });

      _react2["default"].findDOMNode(this.refs.popover).addEventListener("click", function (ev) {
        ev.stopPropagation();
      });

      _react2["default"].findDOMNode(this.refs.toggleButton).addEventListener("click", function (ev) {
        ev.stopPropagation();
        _this.handleClick(_this.props.isOpen);
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick(value) {
      this.props.handleClick(value);
    }
  }, {
    key: "calculateTopOffset",
    value: function calculateTopOffset() {
      var offset = "0px";

      switch (this.props.position) {
        case "top":
          offset = "-" + (this.popoverHeight + this.props.topOffset) + "px";
          break;
        case "bottom":
          offset = this.buttonHeight + this.props.topOffset + "px";
          break;
        case "left":
          offset = this.props.topOffset + "px";
          break;
        case "right":
          offset = this.props.topOffset + "px";
          break;
        default:
          offset = 0;
      }

      return offset;
    }
  }, {
    key: "calculateLeftOffset",
    value: function calculateLeftOffset() {
      var offset = "0px";

      switch (this.props.position) {
        case "top":
          offset = "0px";
          break;
        case "bottom":
          offset = "0px";
          break;
        case "left":
          offset = "-" + (this.popoverWidth + this.props.leftOffset) + "px";
          break;
        case "right":
          offset = this.buttonWidth + this.props.leftOffset + "px";
          break;
        default:
          offset = 0;
      }

      return offset;
    }
  }, {
    key: "render",
    value: function render() {
      var toggleButton = _react2["default"].cloneElement(this.props.toggleButton, {
        ref: "toggleButton"
      });

      var popoverClass = "popover-menu " + (this.props.className || "");
      var contentClass = "popover-content " + this.props.position + " " + (this.props.isOpen ? "show" : "");
      var contentStyles = { top: this.calculateTopOffset() };
      contentStyles[this.props.horizontalJustify] = this.calculateLeftOffset();

      return _react2["default"].createElement(
        "div",
        { className: popoverClass },
        toggleButton,
        _react2["default"].createElement(
          "section",
          { className: contentClass, style: contentStyles, ref: "popover" },
          this.props.children
        )
      );
    }
  }], [{
    key: "defaultProps",
    value: {
      toggleButton: _react2["default"].createElement(
        "button",
        { className: "btn btn-lrg btn-success" },
        "Toggle Menu"
      ),
      isOpen: false,
      position: "bottom",
      topOffset: 10,
      leftOffset: 0,
      horizontalJustify: "left"
    },
    enumerable: true
  }]);

  return Popover;
})(_react2["default"].Component);

exports["default"] = Popover;
module.exports = exports["default"];