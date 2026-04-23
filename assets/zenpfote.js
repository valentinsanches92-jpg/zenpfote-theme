function pickBundle(card) {
  document.querySelectorAll('.bcard').forEach(function(c) { c.classList.remove('sel'); });
  card.classList.add('sel');
}

function tog(e, row) {
  e.stopPropagation();
  row.classList.toggle('on');
  var cb = row.querySelector('.addon-cb');
  cb.textContent = row.classList.contains('on') ? '✓' : '';
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.variant-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.variant-btn').forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) e.target.style.opacity = '1';
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.how-card, .review-card, .feature-item, .faq-item').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.5s ease';
    observer.observe(el);
  });
});
