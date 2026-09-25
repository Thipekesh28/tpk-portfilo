// portfolio.js – Thipekesh Thavarajah Portfolio
'use strict';

/* ── Navigation scroll state ───────────────────────── */
const nav = document.getElementById('site-nav');
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav?.classList.add('scrolled');
    scrollTopBtn?.classList.add('visible');
  } else {
    nav?.classList.remove('scrolled');
    scrollTopBtn?.classList.remove('visible');
  }
}, { passive: true });

/* ── Active nav link on scroll ─────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

function setActiveLink() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 90;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });

/* ── Mobile menu ────────────────────────────────────── */
const toggle    = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('nav-mobile');

toggle?.addEventListener('click', () => {
  const open = mobileNav?.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.querySelector('.icon-open').style.display  = open ? 'none'  : 'block';
  toggle.querySelector('.icon-close').style.display = open ? 'block' : 'none';
});

// Close on link click
mobileNav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    if (toggle) {
      toggle.querySelector('.icon-open').style.display  = 'block';
      toggle.querySelector('.icon-close').style.display = 'none';
    }
  });
});

// Close on outside click
document.addEventListener('click', e => {
  if (mobileNav?.classList.contains('open') &&
      !mobileNav.contains(e.target) && !toggle?.contains(e.target)) {
    mobileNav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    if (toggle) {
      toggle.querySelector('.icon-open').style.display  = 'block';
      toggle.querySelector('.icon-close').style.display = 'none';
    }
  }
});

/* ── Scroll-to-top ──────────────────────────────────── */
scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Intersection Observer animations ───────────────── */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.animDelay || 0;
        setTimeout(() => entry.target.classList.add('visible'), Number(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-anim]').forEach(el => observer.observe(el));
} else {
  // Immediately show everything for reduced motion
  document.querySelectorAll('[data-anim]').forEach(el => el.classList.add('visible'));
}

/* ── Certificate tabs ───────────────────────────────── */
const certTabs   = document.querySelectorAll('.cert-tab');
const certPanels = document.querySelectorAll('.cert-panel');

certTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    certTabs.forEach(t => t.classList.toggle('active', t === tab));
    certPanels.forEach(p => p.classList.toggle('active', p.id === 'panel-' + target));
  });
});

/* ── Smooth scroll for all anchor links ─────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Current year for footer ────────────────────────── */
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
