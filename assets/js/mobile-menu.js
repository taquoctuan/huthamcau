/**
 * Mobile Navigation Drawer Controller - Môi Trường Xanh
 * Độc lập 100%, không xung đột với Magnific Popup của Flatsome.
 * Hoạt động mượt mà ở mọi vị trí cuộn trang (kể cả khi cuộn xuống cuối trang).
 */
(function() {
  function initMobileMenu() {
    var drawer = document.getElementById('main-menu');
    if (!drawer) return;

    // Các selector của nút mở menu
    var triggerSelectors = [
      '[data-drawer-open="#main-menu"]',
      '[data-open="#main-menu"]',
      '[aria-controls="main-menu"]',
      '.icon-menu',
      '.mobile-nav-trigger'
    ].join(', ');

    var menuButtons = document.querySelectorAll(triggerSelectors);

    // Tạo overlay nếu chưa có
    var overlay = document.querySelector('.main-menu-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'main-menu-overlay mobile-sidebar-overlay';
      document.body.appendChild(overlay);
    }

    // Header chứa thương hiệu & nút đóng (X) bên trong drawer
    var drawerHeader = drawer.querySelector('.drawer-header');
    if (!drawerHeader) {
      // Xóa nút close đơn lẻ cũ nếu có ngoài header
      var oldClose = drawer.querySelector(':scope > .drawer-close-btn');
      if (oldClose) oldClose.remove();

      drawerHeader = document.createElement('div');
      drawerHeader.className = 'drawer-header';
      drawerHeader.innerHTML = [
        '<div class="drawer-brand">',
        '  <span class="drawer-brand-title">Môi Trường Xanh</span>',
        '</div>',
        '<button type="button" class="drawer-close-btn" aria-label="Đóng menu">&times;</button>'
      ].join('');
      drawer.insertBefore(drawerHeader, drawer.firstChild);
    }

    var closeBtn = drawerHeader.querySelector('.drawer-close-btn');
    if (closeBtn) {
      closeBtn.onclick = function(e) {
        e.preventDefault();
        closeDrawer();
      };
    }

    function openDrawer() {
      // Đảm bảo drawer luôn cuộn lên đầu khi mở
      drawer.scrollTop = 0;
      
      // Hiển thị drawer & overlay
      drawer.classList.remove('mfp-hide');
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.classList.add('mobile-menu-active');
      document.documentElement.classList.add('mobile-menu-active');
      
      // Cập nhật trạng thái accessibility
      menuButtons.forEach(function(btn) {
        btn.setAttribute('aria-expanded', 'true');
      });
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.classList.remove('mobile-menu-active');
      document.documentElement.classList.remove('mobile-menu-active');

      menuButtons.forEach(function(btn) {
        btn.setAttribute('aria-expanded', 'false');
      });
    }

    // Bắt sự kiện click trên các nút mở menu
    menuButtons.forEach(function(btn) {
      btn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (drawer.classList.contains('is-open')) {
          closeDrawer();
        } else {
          openDrawer();
        }
      };
    });

    // Bấm vào overlay để đóng
    overlay.onclick = function(e) {
      e.preventDefault();
      closeDrawer();
    };

    // Bấm ESC để đóng
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });

    // Tự động đóng khi click vào liên kết chuyển trang bên trong menu
    var menuLinks = drawer.querySelectorAll('a[href]:not([href="#"]):not([href=""])');
    menuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        closeDrawer();
      });
    });

    // Ngăn chặn sự kiện cuộn/touch lan truyền ngoài ý muốn khi chạm vào overlay
    overlay.addEventListener('touchmove', function(e) {
      e.preventDefault();
    }, { passive: false });
  }

  // Tối ưu hóa Sticky Header khi cuộn trang
  function initStickyHeader() {
    var header = document.getElementById('header') || document.querySelector('header.header');
    if (!header) return;

    function handleScroll() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (scrollY > 15) {
        header.classList.add('is-sticky', 'stuck');
      } else {
        header.classList.remove('is-sticky', 'stuck');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  function start() {
    initMobileMenu();
    initStickyHeader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
