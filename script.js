/* ===== PRODUCTION BREW — script.js ===== */

/* ---------- THEME TOGGLE ---------- */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('pb-theme', theme);
  if (themeToggle) themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function initTheme() {
  const saved = localStorage.getItem('pb-theme') || 'light';
  applyTheme(saved);
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

initTheme();

/* ---------- HAMBURGER NAV ---------- */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // close menu on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

/* ---------- ACTIVE NAV LINK ---------- */
(function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'home.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'home.html')) {
      a.classList.add('active');
    }
  });
})();

/* ---------- SCROLL FADE-IN ---------- */
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
}

/* ---------- STAR RATING ---------- */
function initStarRating() {
  const stars = document.querySelectorAll('.star[data-value]');
  const ratingVal = document.getElementById('ratingValue');
  const ratingText = document.getElementById('ratingText');
  if (!stars.length) return;

  const savedRating = parseFloat(localStorage.getItem('pb-rating')) || 4;

  function setRating(val) {
    stars.forEach(s => {
      const v = parseInt(s.dataset.value);
      s.classList.toggle('filled', v <= val);
    });
    if (ratingVal) ratingVal.textContent = val + '.0';
    if (ratingText) {
      const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];
      ratingText.textContent = labels[val] || '';
    }
    localStorage.setItem('pb-rating', val);
  }

  setRating(savedRating);

  stars.forEach(star => {
    star.addEventListener('click', () => setRating(parseInt(star.dataset.value)));
    star.addEventListener('mouseenter', () => {
      const v = parseInt(star.dataset.value);
      stars.forEach(s => s.classList.toggle('filled', parseInt(s.dataset.value) <= v));
    });
    star.addEventListener('mouseleave', () => {
      const saved = parseFloat(localStorage.getItem('pb-rating')) || 4;
      stars.forEach(s => s.classList.toggle('filled', parseInt(s.dataset.value) <= saved));
    });
  });
}

/* ---------- CONTACT FORM ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = '✅ Message Sent!';
    btn.disabled = true;
    btn.style.opacity = '0.75';
    setTimeout(() => {
      btn.textContent = orig;
      btn.disabled = false;
      btn.style.opacity = '1';
      form.reset();
    }, 3000);
  });
}

/* ---------- NAVBAR SCROLL SHADOW ---------- */
function initNavbarScroll() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20
      ? '0 4px 32px rgba(0,0,0,0.3)'
      : 'none';
  }, { passive: true });
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initStarRating();
  initContactForm();
  initNavbarScroll();
});
