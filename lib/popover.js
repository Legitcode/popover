"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Popover = (function (_React$Component) {
  _inherits(Popover, _React$Component);

  _createClass(Popover, null, [{
    key: 'defaultProps',
    value: {
      toggleButton: null,
      position: 'bottom',
      topOffset: 10,
      leftOffset: 0,
      horizontalJustify: 'left'
    },
    enumerable: true
  }]);

  function Popover(props) {
    var _this = this;

    _classCallCheck(this, Popover);

    _get(Object.getPrototypeOf(Popover.prototype), 'constructor', this).call(this, props);

    this.toggle = function () {
      _this.setState({ isOpen: !_this.state.isOpen });
    };

    this.state = {
      topOffset: 0,
      leftOffset: 0,
      isOpen: props.isOpen || false
    };
  }

  _createClass(Popover, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.isOpen != this.state.isOpen) this.setState({ isOpen: props.isOpen });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.state.isOpen) this.calculateHeights();
      if (this.props.closeOnOuterClick !== false) {
        document.addEventListener('click', function (ev) {
          if (ev.target.dataset['popover']) return ev.stopImmediatePropagation();
          if (_this2.state.isOpen == true) _this2.setState({ isOpen: false });
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.isOpen && this.state.isOpen != prevState.isOpen) this.calculateHeights();
    }
  }, {
    key: 'calculateHeights',
    value: function calculateHeights() {
      if (!this.state.isOpen) return true;
      this.buttonHeight = _react2['default'].findDOMNode(this.refs.toggleButton).offsetHeight;
      this.buttonWidth = _react2['default'].findDOMNode(this.refs.toggleButton).offsetWidth;

      this.popoverHeight = _react2['default'].findDOMNode(this.refs.popover).offsetHeight;
      this.popoverWidth = _react2['default'].findDOMNode(this.refs.popover).offsetWidth;

      this.setState({
        topOffset: this.calculateTopOffset(),
        leftOffset: this.calculateLeftOffset()
      });
    }
  }, {
    key: 'calculateTopOffset',
    value: function calculateTopOffset() {
      var offset = '0px';

      switch (this.props.position) {
        case 'top':
          offset = '-' + (this.popoverHeight + this.props.topOffset) + 'px';
          break;
        case 'bottom':
          offset = this.buttonHeight + this.props.topOffset + 'px';
          break;
        case 'left':
          offset = this.props.topOffset + 'px';
          break;
        case 'right':
          offset = this.props.topOffset + 'px';
          break;
        default:
          offset = 0;
      }

      return offset;
    }
  }, {
    key: 'calculateLeftOffset',
    value: function calculateLeftOffset() {
      var offset = '0px';

      switch (this.props.position) {
        case 'top':
          offset = this.props.leftOffset + 'px';
          break;
        case 'bottom':
          offset = this.props.leftOffset + 'px';
          break;
        case 'left':
          offset = '-' + (this.popoverWidth + this.props.leftOffset) + 'px';
          break;
        case 'right':
          offset = this.buttonWidth + this.props.leftOffset + 'px';
          break;
        default:
          offset = 0;
      }

      return offset;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.toggleButton) {
        var toggleButton = _react2['default'].cloneElement(this.props.toggleButton, {
          ref: 'toggleButton',
          'data-popover': true,
          onClick: this.toggle
        });
      } else {
        var toggleButton = _react2['default'].createElement('div', {
          style: { display: 'none' },
          onClick: this.toggle,
          'data-popover': 'true',
          ref: 'toggleButton'
        });
      }

      var contentStyles = { top: this.state.topOffset };
      contentStyles[this.props.horizontalJustify] = this.state.leftOffset;

      return _react2['default'].createElement(
        'div',
        { className: 'popover-menu ' + (this.props.className || '') },
        toggleButton,
        this.state.isOpen ? _react2['default'].createElement(
          'section',
          {
            className: 'popover-content ' + this.props.position + ' show',
            style: contentStyles,
            onClick: this.toggle,
            ref: 'popover' },
          this.props.children
        ) : null
      );
    }
  }]);

  return Popover;
})(_react2['default'].Component);

exports['default'] = Popover;
module.exports = exports['default'];