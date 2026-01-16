(function() {
  'use strict';

  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const header = document.querySelector('.site-header');

  function toggleMobileMenu() {
    if (!mobileMenuBtn || !mobileNav) return;
    
    const isActive = mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';
    mobileMenuBtn.setAttribute('aria-expanded', isActive);
    mobileNav.setAttribute('aria-hidden', !isActive);
  }

  function closeMobileMenu() {
    if (!mobileMenuBtn || !mobileNav) return;
    
    mobileMenuBtn.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav?.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileNav?.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (!element) return;

    const headerHeight = header ? header.offsetHeight : 0;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href && href !== '#' && href.length > 1) {
        e.preventDefault();
        smoothScrollTo(href);
        closeMobileMenu();
        history.pushState(null, null, href);
      }
    });
  });

  function setActiveNavState() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const linkPage = href?.split('/').pop() || '';
      
      const isActive = linkPage === currentPage || 
                       (currentPage === '' && linkPage === 'index.html') ||
                       (currentPage === 'index.html' && linkPage === 'index.html');
      
      link.classList.toggle('active', isActive);
    });
  }

  setActiveNavState();

  let lastScrollY = 0;
  let ticking = false;

  function handleScroll() {
    const currentScrollY = window.scrollY;
    
    if (header) {
      if (currentScrollY > 10) {
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (!animatedElements.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const animation = entry.target.dataset.animate;
          entry.target.classList.add(`animate-${animation}`);
          entry.target.style.opacity = '1';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  initScrollAnimations();

  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
      window.addEventListener('mousedown', handleMouseDown);
    }
  }

  function handleMouseDown() {
    document.body.classList.remove('user-is-tabbing');
    window.removeEventListener('mousedown', handleMouseDown);
    window.addEventListener('keydown', handleFirstTab);
  }

  window.addEventListener('keydown', handleFirstTab);

  function initPageLoadAnimations() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.opacity = '1';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageLoadAnimations);
  } else {
    initPageLoadAnimations();
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  window.SOS = {
    toggleMobileMenu,
    closeMobileMenu,
    smoothScrollTo,
    debounce,
    throttle
  };

})();
