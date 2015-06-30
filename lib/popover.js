'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var getDimensions = function getDimensions(el) {
  var el_style = window.getComputedStyle(el),
      el_display = el_style.display,
      el_position = el_style.position,
      el_visibility = el_style.visibility,
      el_max_height = el_style.maxHeight.replace('px', '').replace('%', ''),
      wanted_dimensions = {};

  // if its not hidden we just return normal height
  if (el_display !== 'none' && el_max_height !== '0') {
    return el.offsetHeight;
  }

  // the element is hidden so:
  // making the el block so we can measure its height but still be hidden
  el.style.position = 'absolute';
  el.style.visibility = 'hidden';
  el.style.display = 'block';

  wanted_dimensions['height'] = el.offsetHeight;
  wanted_dimensions['width'] = el.offsetWidth;

  // reverting to the original values
  el.style.display = el_display;
  el.style.position = el_position;
  el.style.visibility = el_visibility;

  return wanted_dimensions;
};

var Popover = (function (_React$Component) {
  function Popover(props) {
    _classCallCheck(this, Popover);

    _get(Object.getPrototypeOf(Popover.prototype), 'constructor', this).call(this, props);

    this.handleClick = this.handleClick.bind(this);
  }

  _inherits(Popover, _React$Component);

  _createClass(Popover, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      this.buttonHeight = _react2['default'].findDOMNode(this.refs.toggleButton).offsetHeight;
      this.buttonWidth = _react2['default'].findDOMNode(this.refs.toggleButton).offsetWidth;

      var dimensions = getDimensions(_react2['default'].findDOMNode(this.refs.popover));

      this.popoverHeight = dimensions.height;
      this.popoverWidth = dimensions.width;

      document.addEventListener('click', function (ev) {
        ev.stopPropagation();
        _this.handleClick(true);
      });

      _react2['default'].findDOMNode(this.refs.popover).addEventListener('click', function (ev) {
        ev.stopPropagation();
        _this.handleClick(_this.props.isOpen);
      });

      _react2['default'].findDOMNode(this.refs.toggleButton).addEventListener('click', function (ev) {
        ev.stopPropagation();
        _this.handleClick(_this.props.isOpen);
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(value) {
      this.props.handleClick(value);
    }
  }, {
    key: 'calculateTopOffset',
    value: function calculateTopOffset() {
      var offset = '0px';

      switch (this.props.position) {
        case 'top':
          offset = '-' + (this.popoverHeight + 10) + 'px';
          break;
        case 'bottom':
          offset = this.buttonHeight + 10 + 'px';
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
  }, {
    key: 'calculateLeftOffset',
    value: function calculateLeftOffset() {
      var offset = '0px';

      switch (this.props.position) {
        case 'top':
          offset = '0px';
          break;
        case 'bottom':
          offset = '0px';
          break;
        case 'left':
          offset = '-' + (this.popoverWidth + 10) + 'px';
          break;
        case 'right':
          offset = this.popoverWidth + 'px';
          break;
        default:
          offset = 0;
      }

      return offset;
    }
  }, {
    key: 'render',
    value: function render() {
      var toggleButton = _react2['default'].cloneElement(this.props.toggleButton, {
        ref: 'toggleButton'
      });

      var contentClass = 'popover-content ' + this.props.position + ' ' + (this.props.isOpen ? 'show' : '');
      var contentStyles = {
        top: this.calculateTopOffset(),
        left: this.calculateLeftOffset()
      };

      return _react2['default'].createElement(
        'div',
        { className: 'popover-menu' },
        toggleButton,
        _react2['default'].createElement(
          'section',
          { className: contentClass, style: contentStyles, ref: 'popover' },
          this.props.children
        )
      );
    }
  }], [{
    key: 'defaultProps',
    value: {
      toggleButton: _react2['default'].createElement(
        'button',
        { className: 'btn btn-lrg btn-success' },
        'Toggle Menu'
      ),
      isOpen: false,
      position: 'bottom'
    },
    enumerable: true
  }]);

  return Popover;
})(_react2['default'].Component);

exports['default'] = Popover;
module.exports = exports['default'];