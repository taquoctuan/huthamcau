/**
 * Mobile Navigation Drawer Controller - Môi Trường Xanh
 * Đảm bảo Menu Hamburger hoạt động mượt mà 100% không phụ thuộc Webpack chunk
 */
(function() {
  function initMobileMenu() {
    var menuButtons = document.querySelectorAll('[data-open="#main-menu"], [aria-controls="main-menu"], .icon-menu');
    var drawer = document.getElementById('main-menu');
    if (!drawer) return;

    // Tạo overlay nếu chưa có
    var overlay = document.querySelector('.main-menu-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'main-menu-overlay mobile-sidebar-overlay';
      document.body.appendChild(overlay);
    }

    // Thêm nút đóng vào drawer nếu chưa có
    if (!drawer.querySelector('.drawer-close-btn')) {
      var closeBtn = document.createElement('button');
      closeBtn.className = 'drawer-close-btn';
      closeBtn.setAttribute('aria-label', 'Đóng menu');
      closeBtn.innerHTML = '&times;';
      drawer.insertBefore(closeBtn, drawer.firstChild);
      closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeDrawer();
      });
    }

    function openDrawer() {
      drawer.classList.remove('mfp-hide');
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.classList.add('mobile-menu-active');
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.classList.remove('mobile-menu-active');
    }

    menuButtons.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (drawer.classList.contains('is-open')) {
          closeDrawer();
        } else {
          openDrawer();
        }
      });
    });

    overlay.addEventListener('click', function(e) {
      e.preventDefault();
      closeDrawer();
    });

    // Nhấn ESC để đóng
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }
})();
