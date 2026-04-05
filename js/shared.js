/* ============================================================
   THE HOCKEY LAB — SHARED COMPONENTS & INTERACTIONS
   ============================================================ */

// ── NAV HTML ──
const NAV_HTML = `
<nav class="site-nav" id="site-nav">
  <a href="index.html" class="nav-logo">THE HOCKEY <span>LAB</span></a>
  <ul class="nav-links">
    <li><a href="programs.html">Programs</a></li>
    <li><a href="method.html">The Method</a></li>
    <li><a href="mental-edge.html">Mental Edge</a></li>
    <li><a href="about.html">About Grant</a></li>
    <li><a href="waitlist.html" class="nav-btn">Join the Waitlist</a></li>
  </ul>
  <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="nav-mobile-menu" id="nav-mobile-menu">
  <ul class="nav-mobile-links">
    <li><a href="programs.html">Programs</a></li>
    <li><a href="method.html">The Method</a></li>
    <li><a href="mental-edge.html">Mental Edge</a></li>
    <li><a href="about.html">About Grant</a></li>
  </ul>
  <a href="waitlist.html" class="nav-btn-mobile">Join the Waitlist</a>
</div>`;

// ── FOOTER HTML ──
const FOOTER_HTML = `
<footer class="site-footer">
  <div class="footer-main">
    <div class="footer-brand">
      <div class="footer-logo-text">THE HOCKEY <span>LAB</span></div>
      <div class="footer-tagline">Skills &nbsp;·&nbsp; Strength &nbsp;·&nbsp; Mindset</div>
      <p class="footer-desc">A structured off-ice development system built for athletes who want to train with purpose, progress with intention, and perform when it matters most.</p>
      <div class="footer-waitlist-box">
        <div class="footer-waitlist-label">Now Accepting Waitlist</div>
        <a href="waitlist.html">Join the waitlist for early access when we open at our new facility &rarr;</a>
      </div>
    </div>
    <div class="footer-col">
      <div class="footer-col-title">Programs</div>
      <ul>
        <li><a href="programs.html#young-cup">Young Cup (Ages 5-7)</a></li>
        <li><a href="programs.html#development">Development (Ages 8-11)</a></li>
        <li><a href="programs.html#performance">Performance (Ages 12-16)</a></li>
        <li><a href="programs.html#elite">Elite (Ages 16+)</a></li>
        <li><a href="mental-edge.html">Mental Edge Program</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <div class="footer-col-title">Navigate</div>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="method.html">The Method</a></li>
        <li><a href="mental-edge.html">Mental Edge</a></li>
        <li><a href="about.html">About Grant</a></li>
        <li><a href="waitlist.html">Join the Waitlist</a></li>
        <li><a href="https://g.page/r/CVE_VTfxO_5qEAE/review" target="_blank" rel="noopener">Review Us on Google</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <div class="footer-col-title">Contact</div>
      <div class="footer-contact-item">
        <div class="footer-contact-label">Coming Soon</div>
        <div class="footer-contact-value">New Facility<br>Coquitlam, BC</div>
      </div>
      <div class="footer-contact-item">
        <div class="footer-contact-label">Email</div>
        <div class="footer-contact-value"><a href="mailto:grant@thehockeylabofficial.com">grant@thehockeylabofficial.com</a></div>
      </div>
      <div class="footer-contact-item">
        <div class="footer-contact-label">Phone</div>
        <div class="footer-contact-value"><a href="tel:7783029245">(778) 302-9245</a></div>
      </div>
      <div class="footer-contact-item">
        <div class="footer-contact-label">Instagram</div>
        <div class="footer-contact-value"><a href="https://instagram.com/thehockeylabofficial" target="_blank" rel="noopener">@thehockeylabofficial</a></div>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-copy">&copy; 2026 The Hockey Lab. All rights reserved. Coquitlam, BC.</div>
    <div class="footer-legal">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Use</a>
    </div>
  </div>
</footer>`;

// ── MOBILE CTA BAR ──
const MOBILE_CTA_HTML = `
<div class="mobile-cta-bar" id="mobile-cta-bar">
  <a href="waitlist.html">Join the Waitlist &rarr;</a>
</div>`;

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {

  // Inject nav
  const navHolder = document.getElementById('nav-placeholder');
  if (navHolder) navHolder.outerHTML = NAV_HTML;

  // Inject footer
  const footerHolder = document.getElementById('footer-placeholder');
  if (footerHolder) footerHolder.outerHTML = FOOTER_HTML;

  // Inject mobile CTA (not on waitlist page)
  const mobileCTAHolder = document.getElementById('mobile-cta-placeholder');
  if (mobileCTAHolder) mobileCTAHolder.outerHTML = MOBILE_CTA_HTML;

  // ── Active nav link ──
  const links = document.querySelectorAll('.nav-links a:not(.nav-btn), .nav-mobile-links a');
  links.forEach(link => {
    if (link.href === window.location.href) link.classList.add('active');
  });

  // ── Nav scroll behavior ──
  const nav = document.getElementById('site-nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Hamburger menu ──
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Scroll reveal ──
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  // ── Parallax on hero bg ──
  const heroBg = document.querySelector('.hero-parallax');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroBg.style.transform = `translateY(${scrolled * 0.35}px)`;
    }, { passive: true });
  }

  // ── Countdown timer (target: June 1, 2026) ──
  const countdownEls = document.querySelectorAll('[data-countdown]');
  if (countdownEls.length > 0) {
    const target = new Date('2026-06-01T09:00:00-07:00').getTime();
    const tick = () => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        countdownEls.forEach(el => {
          el.innerHTML = '<span style="font-family:\'Exo 2\',sans-serif;font-weight:900;font-size:20px;color:var(--gold);letter-spacing:-1px;text-transform:uppercase;">We Are Open</span>';
        });
        return;
      }
      const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const pad = n => String(n).padStart(2, '0');
      countdownEls.forEach(el => {
        el.innerHTML = `
          <div class="countdown-wrap">
            <div class="countdown-unit"><span class="countdown-num">${pad(days)}</span><span class="countdown-label">Days</span></div>
            <div class="countdown-sep">:</div>
            <div class="countdown-unit"><span class="countdown-num">${pad(hours)}</span><span class="countdown-label">Hours</span></div>
            <div class="countdown-sep">:</div>
            <div class="countdown-unit"><span class="countdown-num">${pad(minutes)}</span><span class="countdown-label">Mins</span></div>
            <div class="countdown-sep">:</div>
            <div class="countdown-unit"><span class="countdown-num">${pad(seconds)}</span><span class="countdown-label">Secs</span></div>
          </div>`;
      });
    };
    tick();
    setInterval(tick, 1000);
  }

  // ── Number counter animation ──
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 1200;
          const start = performance.now();
          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));
  }

  // ── Gold line reveal on section eyebrows ──
  const eyebrows = document.querySelectorAll('.t-eyebrow');
  eyebrows.forEach(eb => {
    eb.style.overflow = 'hidden';
  });

});
