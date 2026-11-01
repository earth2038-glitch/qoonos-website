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

  // Animate only when entering the viewport. Never hide waiting content:
  // without JavaScript, scroll events or CSS animations it stays readable.
  var rootStyle = document.documentElement.style;
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !rootStyle || !('animation' in rootStyle || 'webkitAnimation' in rootStyle)) return;

  var revealItems = document.querySelectorAll('.reveal');
  var revealed = [];
  var revealPending = false;
  var remaining = revealItems.length;

  function revealInView() {
    revealPending = false;
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var index;
    for (index = 0; index < revealItems.length; index += 1) {
      if (revealed[index]) continue;
      var bounds = revealItems[index].getBoundingClientRect();
      if (bounds.top < viewportHeight * 0.96 && bounds.bottom > 0) {
        revealed[index] = true;
        remaining -= 1;
        revealItems[index].classList.add('is-entering');
      }
    }
    if (remaining === 0) {
      window.removeEventListener('scroll', scheduleReveal, false);
      window.removeEventListener('resize', scheduleReveal, false);
    }
  }

  function scheduleReveal() {
    if (revealPending) return;
    revealPending = true;
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(revealInView);
    } else {
      window.setTimeout(revealInView, 16);
    }
  }

  window.addEventListener('scroll', scheduleReveal, false);
  window.addEventListener('resize', scheduleReveal, false);
  revealInView();
}());
