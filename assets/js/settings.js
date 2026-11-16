(function($){"use strict";$(document).ready(function(){$("#proudct .owl-carousel").owlCarousel({items:3,nav:!0,dots:!1,autoplay:!1,loop:!0,});var ttw=document.body.clientWidth;if(ttw<767){$('.cs-khhbuy .cs-rowkhbuy').owlCarousel({loop:!0,responsiveClass:!0,nav:!0,autoplay:!1,navContainer:!1,responsive:{0:{items:1,margin:8,nav:!0},600:{items:2,margin:10,nav:!0},1000:{items:3,margin:20,nav:!1,loop:!0}}})}
$('.cs-baochicl > .col-inner').owlCarousel({loop:!1,responsiveClass:!0,nav:!0,autoplay:!1,navContainer:!1,dots:!1,responsive:{0:{items:2,margin:10,nav:!0},600:{items:3,margin:20,nav:!0},1000:{items:4,margin:20,nav:!0}}});$('.cs-productinfo > .col-inner').owlCarousel({loop:!1,responsiveClass:!0,nav:!0,autoplay:!1,navContainer:!1,dots:!1,navText:['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" preserveAspectRatio="none" width="100%" height="100%" class="" fill="rgba(250, 221, 210, 1.0)"><path d="M50,95c24.8,0,45-20.2,45-45S74.8,5,50,5S5,25.2,5,50S25.2,95,50,95z M50,15c19.3,0,35,15.7,35,35S69.3,85,50,85  S15,69.3,15,50S30.7,15,50,15z"></path><polygon points="45,72.1 67.1,50 45,27.9 37.9,35 52.9,50 37.9,65 "></polygon></svg>','<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" preserveAspectRatio="none" width="100%" height="100%" class="" fill="rgba(250, 221, 210, 1.0)"><path d="M50,95c24.8,0,45-20.2,45-45S74.8,5,50,5S5,25.2,5,50S25.2,95,50,95z M50,15c19.3,0,35,15.7,35,35S69.3,85,50,85  S15,69.3,15,50S30.7,15,50,15z"></path><polygon points="45,72.1 67.1,50 45,27.9 37.9,35 52.9,50 37.9,65 "></polygon></svg>'],responsive:{0:{items:1,margin:10,nav:!0},600:{items:3,margin:10,nav:!0},1000:{items:4,margin:10,nav:!0}}});/* cs-blogslider1 owlCarousel disabled */$('.cs-myvideo > .col-inner').owlCarousel({loop:!1,responsiveClass:!0,nav:!1,autoplay:!0,autoplayTimeout:3000,navContainer:!1,responsive:{0:{items:1,margin:8,nav:!1},600:{items:2,margin:10,nav:!1},1000:{items:3,margin:20,nav:!1,loop:!1}}});$('.csld-productsliderinfo > .col-inner').owlCarousel({loop:!1,responsiveClass:!0,nav:!1,autoplay:!0,autoplayTimeout:3000,navContainer:!1,responsive:{0:{items:1,margin:8,nav:!1},600:{items:1,margin:10,nav:!1},1000:{items:1,margin:20,nav:!1,loop:!1}}});var owl=$('.csld-productsliderinfo > .col-inner');$('.cs-owl-dot').on('click',function(){owl.trigger('stop.owl.autoplay')
var csindex=$(this).attr("data-cs-index");owl.trigger('to.owl.carousel',[csindex,300])})})})(jQuery)


/* ==========================================================================
   ROBUST COUNT-UP ANIMATION FOR STATISTICS CARDS
   ========================================================================== */
(function() {
  function animateCounter(el) {
    if (el.dataset.counting === 'true' || el.classList.contains('active')) return;
    el.dataset.counting = 'true';

    var rawVal = el.getAttribute('data-target') || el.textContent.trim().replace(/[^0-9]/g, '');
    var target = parseInt(rawVal, 10);
    if (isNaN(target) || target <= 0) {
      el.classList.add('active');
      return;
    }

    el.setAttribute('data-target', target);
    el.textContent = '0';
    el.classList.add('active');

    var duration = 2200; // 2.2 seconds animation
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);

      // easeOutExpo for natural decelerating count
      var ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      var current = Math.floor(ease * target);

      el.textContent = target >= 1000 ? current.toLocaleString('vi-VN') : current;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target >= 1000 ? target.toLocaleString('vi-VN') : target;
        el.dataset.counting = 'done';
      }
    }

    requestAnimationFrame(step);
  }

  function initCounterObserver() {
    var counters = document.querySelectorAll('span.count-up');
    if (!counters.length) return;

    // Cache initial targets
    counters.forEach(function(c) {
      var val = c.textContent.trim().replace(/[^0-9]/g, '');
      if (val) {
        c.setAttribute('data-target', val);
      }
    });

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      counters.forEach(function(c) {
        if (!c.classList.contains('active')) {
          observer.observe(c);
        }
      });
    } else {
      counters.forEach(animateCounter);
    }

    // Safety timeout: ensure numbers are always visible
    setTimeout(function() {
      counters.forEach(function(c) {
        if (!c.classList.contains('active')) {
          animateCounter(c);
        }
      });
    }, 3500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounterObserver);
  } else {
    initCounterObserver();
  }
})();
