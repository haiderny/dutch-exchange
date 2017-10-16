'use strict';

function modalExit() {
  var parentEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (parentEl) {
    var el = document.getElementsByClassName(parentEl)[0];
    el.classList.contains('hide') ? el.classList.remove('hide') : el.classList.add('hide');
  }
}

function modalShow() {
  var modal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (modal) {
    var el = document.getElementsByClassName(modal)[0];
    el.classList.contains('hide') ? el.classList.remove('hide') : el.classList.add('hide');
  }
}

function toggleMenu() {
  var body = document.getElementsByTagName('body')[0];
  var menu = document.querySelectorAll('header>div>nav')[0];

  // Toggle scrolling on <body> IF menu active
  body.classList.contains('noScroll') ? body.classList.remove('noScroll') : body.classList.add('noScroll');

  // Toggle <nav> main menu panel
  menu.classList.contains('show') ? menu.classList.remove('show') : menu.classList.add('show');
}

function demoPage() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


  var allElements = document.querySelectorAll('.home, [data-screen=amount], [data-screen=details], [data-screen=status]');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = allElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _el = _step.value;

      console.log(_el);
      _el.classList.add('hide');
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (page) {
    var el = document.querySelectorAll(page)[0];
    el.classList.remove('hide');
  }
}