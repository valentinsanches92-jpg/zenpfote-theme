/* ============================================================
   ZENPFOTE V2 — JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── ANNOUNCEMENT BAR rotation ── */
  (function () {
    const slides = document.querySelectorAll('.zp2 .ann-slide');
    if (!slides.length) return;
    let idx = 0;
    slides.forEach((s, i) => { s.style.display = i === 0 ? 'block' : 'none'; });
    setInterval(function () {
      slides[idx].style.display = 'none';
      idx = (idx + 1) % slides.length;
      slides[idx].style.display = 'block';
    }, 4000);
  })();

  /* ── MOBILE MENU ── */
  const hamburger = document.querySelector('.zp2 .nav-hamburger');
  const mobileMenu = document.querySelector('.zp2 .mobile-menu');
  const menuClose = document.querySelector('.zp2 .mobile-menu-close');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () { mobileMenu.classList.add('open'); });
    if (menuClose) menuClose.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) mobileMenu.classList.remove('open');
    });
  }

  /* ── HERO SWIPER ── */
  if (typeof Swiper !== 'undefined') {
    if (document.querySelector('.zp2 .hero-swiper .swiper-wrapper')) {
      new Swiper('.zp2 .hero-swiper', {
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.zp2 .hero-swiper .swiper-pagination', clickable: true },
        navigation: {
          nextEl: '.zp2 .hero-swiper .swiper-button-next',
          prevEl: '.zp2 .hero-swiper .swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 600,
      });
    }

    /* ── REVIEWS SWIPER ── */
    if (document.querySelector('.zp2 .reviews-swiper .swiper-wrapper')) {
      new Swiper('.zp2 .reviews-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 4500, disableOnInteraction: false },
        pagination: { el: '.zp2 .reviews-swiper .swiper-pagination', clickable: true },
        breakpoints: {
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
    }

    /* ── PRODUCT MEDIA THUMBS SWIPER ── */
    if (document.querySelector('.zp2 .product-thumb-swiper')) {
      new Swiper('.zp2 .product-thumb-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 10,
        freeMode: true,
      });
    }
  }

  /* ── BUNDLE PICKER ── */
  document.querySelectorAll('.zp2 .bcard').forEach(function (card) {
    card.addEventListener('click', function () {
      document.querySelectorAll('.zp2 .bcard').forEach(function (c) { c.classList.remove('sel'); });
      card.classList.add('sel');
    });
  });

  /* ── ADDON TOGGLE ── */
  document.querySelectorAll('.zp2 .addon-row').forEach(function (row) {
    row.addEventListener('click', function (e) {
      e.stopPropagation();
      row.classList.toggle('on');
      const cb = row.querySelector('.addon-cb');
      if (cb) cb.textContent = row.classList.contains('on') ? '✓' : '';
    });
  });

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.zp2 .faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.zp2 .faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── FEATURES IMAGE GALLERY ── */
  document.querySelectorAll('.zp2 .features-thumb').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      document.querySelectorAll('.zp2 .features-thumb').forEach(function (t) { t.classList.remove('active'); });
      thumb.classList.add('active');
      const mainImg = document.querySelector('.zp2 .features-media img');
      const phIcon = document.querySelector('.zp2 .features-media .ph-icon');
      const src = thumb.dataset.src;
      if (src && mainImg) { mainImg.src = src; }
      else if (phIcon) { /* keep placeholder */ }
    });
  });

  /* ── PRODUCT TABS ── */
  document.querySelectorAll('.zp2 .tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = btn.dataset.tab;
      document.querySelectorAll('.zp2 .tab-btn').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.zp2 .tab-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── PRODUCT MEDIA GALLERY (manual thumbs) ── */
  document.querySelectorAll('.zp2 .thumb-item').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      document.querySelectorAll('.zp2 .thumb-item').forEach(function (t) { t.classList.remove('active'); });
      thumb.classList.add('active');
      const main = document.querySelector('.zp2 .media-main');
      if (!main) return;
      const src = thumb.dataset.src;
      const type = thumb.dataset.type;
      if (!src) return;
      if (type === 'video') {
        main.innerHTML = '<video src="' + src + '" controls autoplay muted loop style="width:100%;height:100%;object-fit:cover;"></video>';
      } else {
        main.innerHTML = '<img src="' + src + '" alt="Produktbild">';
      }
    });
  });

  /* ── TRACKING FORM ── */
  const trackForm = document.getElementById('zp-track-form');
  if (trackForm) {
    trackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const result = document.querySelector('.zp2 .tracking-result');
      if (result) result.classList.add('visible');
    });
  }

  /* ── INTERSECTION OBSERVER (fade-in) ── */
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.zp2 .how-card, .zp2 .review-card, .zp2 .feature-item, .zp2 .faq-item, .zp2 .trust-item, .zp2 .bcard').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

});
