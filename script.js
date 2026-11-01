/* ES5 syntax keeps navigation usable in Safari on iOS 9.
   Article content is visible in CSS even when this script cannot run. */
(function () {
  'use strict';

  var header = document.querySelector('[data-header]');
  var menuButton = document.querySelector('[data-menu-button]');
  var nav = document.querySelector('[data-nav]');
  var yearItems = document.querySelectorAll('[data-year]');
  var i;

  function updateHeader() {
    if (!header) return;
    if ((window.pageYOffset || document.documentElement.scrollTop) > 12) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.sr-only').textContent = 'メニューを開く';
    nav.classList.remove('open');
    document.body.style.overflow = '';
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, false);

  for (i = 0; i < yearItems.length; i += 1) {
    yearItems[i].textContent = String(new Date().getFullYear());
  }

  if (menuButton && nav) {
    menuButton.addEventListener('click', function () {
      if (menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      } else {
        menuButton.setAttribute('aria-expanded', 'true');
        menuButton.querySelector('.sr-only').textContent = 'メニューを閉じる';
        nav.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    }, false);

    var links = nav.querySelectorAll('a');
    for (i = 0; i < links.length; i += 1) {
      links[i].addEventListener('click', closeMenu, false);
    }
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' || event.keyCode === 27) closeMenu();
    }, false);
    window.addEventListener('resize', function () {
      if (document.documentElement.clientWidth > 900) closeMenu();
    }, false);

    // Collapse the mobile navigation only after all its handlers are ready.
    document.documentElement.classList.add('has-menu');
  }
}());
