
function modalExit (parentEl = null) {
  if (parentEl) {
    let el = document.getElementsByClassName(parentEl)[0]
    el.classList.contains('hide') ? el.classList.remove('hide') : el.classList.add('hide')
  }
}

function modalShow (modal = null) {
  if (modal) {
    let el = document.getElementsByClassName(modal)[0]
    el.classList.contains('hide') ? el.classList.remove('hide') : el.classList.add('hide')
  }
}

function toggleMenu () {
  let body = document.getElementsByTagName('body')[0]
  let menu = document.querySelectorAll('header>div>nav')[0]

  // Toggle scrolling on <body> IF menu active
  body.classList.contains('noScroll') ? body.classList.remove('noScroll') : body.classList.add('noScroll')

  // Toggle <nav> main menu panel
  menu.classList.contains('show') ? menu.classList.remove('show') : menu.classList.add('show')
}

function demoPage (page = null) {

  let allElements = document.querySelectorAll('.home, [data-screen=amount], [data-screen=details], [data-screen=status]')
  for (let el of allElements) {
    console.log(el)
    el.classList.add('hide')
  }

  if (page) {
    let el = document.querySelectorAll(page)[0]
    el.classList.remove('hide')
  }
}