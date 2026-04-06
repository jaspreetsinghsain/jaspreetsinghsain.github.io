/* ===========================
   NAVIGATION
=========================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(l => {
  l.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ===========================
   COUNTER ANIMATION
=========================== */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const start = performance.now();
    function update(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}
const statsEl = document.querySelector('.hero-stats');
if (statsEl) {
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateCounters(); }
  }, { threshold: 0.4 }).observe(statsEl);
}

/* ===========================
   SCROLL REVEAL
=========================== */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal, .edu-card, .skill-cat, .cert-card, .proj-card, .tl-item, .tl-reveal, .about-card').forEach(el => {
  revealObs.observe(el);
});

/* ===========================
   SKILL BARS
=========================== */
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar-fill').forEach(b => {
        b.style.width = b.dataset.w + '%';
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-cat').forEach(el => skillObs.observe(el));

/* ===========================
   DASHBOARD CAROUSEL
=========================== */
const slides = document.querySelectorAll('.dash-slide');
const infoPanels = document.querySelectorAll('.dash-info-panel');
const ddots = document.querySelectorAll('.ddot');
const counter = document.getElementById('dashCounter');
let cur = 0;

function goTo(i) {
  slides[cur].classList.remove('active');
  infoPanels[cur].classList.remove('active');
  ddots[cur].classList.remove('active');
  cur = i;
  slides[cur].classList.add('active');
  infoPanels[cur].classList.add('active');
  ddots[cur].classList.add('active');
  if (counter) counter.textContent = (cur + 1) + ' / ' + slides.length;
}

document.getElementById('dashNext').addEventListener('click', () => goTo((cur + 1) % slides.length));
document.getElementById('dashPrev').addEventListener('click', () => goTo((cur - 1 + slides.length) % slides.length));
ddots.forEach(d => d.addEventListener('click', () => goTo(parseInt(d.dataset.i))));

let autoSlide = setInterval(() => goTo((cur + 1) % slides.length), 5000);
const dashWrap = document.querySelector('.dash-wrapper');
if (dashWrap) {
  dashWrap.addEventListener('mouseenter', () => clearInterval(autoSlide));
  dashWrap.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => goTo((cur + 1) % slides.length), 5000);
  });
}

/* ===========================
   CONTACT FORM
=========================== */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    setTimeout(() => {
      document.getElementById('formNote').textContent = '✓ Message sent! I\'ll get back to you soon.';
      form.reset();
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled = false;
      setTimeout(() => document.getElementById('formNote').textContent = '', 4000);
    }, 1500);
  });
}

/* ===========================
   SMOOTH SCROLL
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) {
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  });
});

/* ===========================
   ACTIVE NAV
=========================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(l => {
    l.style.color = '';
    if (l.getAttribute('href') === '#' + current) l.style.color = 'var(--gold)';
  });
});
