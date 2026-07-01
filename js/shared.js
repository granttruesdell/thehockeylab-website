/* ============================================================
   THE HOCKEY LAB — SHARED COMPONENTS & INTERACTIONS
   ============================================================ */

// ── NAV HTML ──
const NAV_HTML = `
<nav class="site-nav" id="site-nav">
  <a href="index.html" class="nav-logo" onclick="if(window.location.pathname.endsWith('index.html')||window.location.pathname==='/'){window.scrollTo({top:0,behavior:'smooth'});return false;}">THE HOCKEY <span>LAB</span></a>
  <ul class="nav-links">
    <li><a href="train.html">Train With Us</a></li>
    <li><a href="method.html">The Method</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="faq.html">FAQ</a></li>
    <li><a href="contact.html">Contact</a></li>
    <li class="nav-social">
      <a href="https://instagram.com/thehockeylabofficial" class="nav-social-link nav-social-link--ig" target="_blank" rel="noopener" aria-label="Instagram">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
      </a>
      <a href="https://www.facebook.com/profile.php?id=61560627311954" class="nav-social-link nav-social-link--fb" target="_blank" rel="noopener" aria-label="Facebook">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      </a>
      <a href="https://www.youtube.com/@thehockeylabofficial" class="nav-social-link nav-social-link--yt" target="_blank" rel="noopener" aria-label="YouTube">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#080808"/></svg>
      </a>
    </li>
    <li><a href="get-started.html" class="nav-btn nav-btn-charter">Get Started &rarr;</a></li>
  </ul>
  <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="nav-mobile-menu" id="nav-mobile-menu">
  <ul class="nav-mobile-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="train.html">Train With Us</a></li>
    <li><a href="method.html">The Method</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="faq.html">FAQ</a></li>
    <li><a href="contact.html">Contact</a></li>
    <li><a href="get-started.html">Get Started</a></li>
  </ul>
  <a href="get-started.html" class="nav-btn-mobile">Get Started &rarr;</a>
  <div class="nav-mobile-social">
    <a href="https://instagram.com/thehockeylabofficial" class="nav-social-link nav-social-link--ig" target="_blank" rel="noopener" aria-label="Instagram">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
    </a>
    <a href="https://www.facebook.com/profile.php?id=61560627311954" class="nav-social-link nav-social-link--fb" target="_blank" rel="noopener" aria-label="Facebook">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
    </a>
    <a href="https://www.youtube.com/@thehockeylabofficial" class="nav-social-link nav-social-link--yt" target="_blank" rel="noopener" aria-label="YouTube">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#080808"/></svg>
    </a>
  </div>
</div>`;

// ── FOOTER HTML ──
const FOOTER_HTML = `
<footer class="site-footer">
  <div class="footer-main">
    <div class="footer-brand">
      <div class="footer-logo-text">THE HOCKEY <span>LAB</span></div>
      <div class="footer-tagline">Where Athletes Are Built</div>
      <p class="footer-desc">The Hockey Lab is a goalie-first development program inside the Coquitlam Express Performance Centre. General Manager &amp; Lead Instructor: Grant Truesdell. Built for goalies. Skaters welcome. Opening Summer 2026.</p>
      <div class="footer-waitlist-box">
        <div class="footer-waitlist-label">Opening Summer 2026 &mdash; Memberships Available Now</div>
        <a href="get-started.html">Join the free trial waitlist or grab a Lab Pack &rarr;</a>
      </div>
      <div class="footer-social">
        <a href="https://instagram.com/thehockeylabofficial" class="footer-social-link footer-social-link--ig" target="_blank" rel="noopener" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
        <a href="https://www.facebook.com/profile.php?id=61560627311954" class="footer-social-link footer-social-link--fb" target="_blank" rel="noopener" aria-label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="https://www.youtube.com/@thehockeylabofficial" class="footer-social-link footer-social-link--yt" target="_blank" rel="noopener" aria-label="YouTube">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#080808"/></svg>
        </a>
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
        <li><a href="about.html">About</a></li>
        <li><a href="faq.html">FAQ</a></li>
        <li><a href="waitlist.html">Join the Waitlist</a></li>
        <li><a href="https://g.page/r/CVE_VTfxO_5qEAE/review" target="_blank" rel="noopener">Review Us on Google</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <div class="footer-col-title">Contact</div>
      <div class="footer-contact-item">
        <div class="footer-contact-label">Location</div>
        <div class="footer-contact-value"><a href="https://maps.google.com/?q=1020+Austin+Avenue+Coquitlam+BC" target="_blank" rel="noopener">Unit 211, 1020 Austin Ave<br>Coquitlam, BC</a></div>
      </div>
      <div class="footer-contact-item">
        <div class="footer-contact-label">Opening</div>
        <div class="footer-contact-value">Summer 2026 &mdash; Coming Soon</div>
      </div>
      <div class="footer-contact-item">
        <div class="footer-contact-label">Email</div>
        <div class="footer-contact-value"><a href="mailto:info@thehockeylabofficial.com">info@thehockeylabofficial.com</a></div>
      </div>
      <div class="footer-contact-item">
        <div class="footer-contact-label">Phone</div>
        <div class="footer-contact-value"><a href="tel:7783029245">(778) 302-9245</a></div>
      </div>
      <div class="footer-contact-item">
        <div class="footer-contact-label">Instagram</div>
        <div class="footer-contact-value"><a href="https://instagram.com/thehockeylabofficial" target="_blank" rel="noopener">@thehockeylabofficial</a></div>
      </div>
      <div class="footer-contact-item">
        <div class="footer-contact-label">Facebook</div>
        <div class="footer-contact-value"><a href="https://www.facebook.com/profile.php?id=61560627311954" target="_blank" rel="noopener">The Hockey Lab</a></div>
      </div>
      <div class="footer-contact-item">
        <div class="footer-contact-label">YouTube</div>
        <div class="footer-contact-value"><a href="https://www.youtube.com/@thehockeylabofficial" target="_blank" rel="noopener">@thehockeylabofficial</a></div>
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
  <a href="get-started.html#free-trial">Claim Your Free Trial Session &rarr;</a>
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

  // ── Pathway Stepper ──
  const psNodes = document.querySelectorAll('.ps-node');
  const psPanels = document.querySelectorAll('.ps-panel');
  const psLine = document.querySelector('.ps-line');
  if (psNodes.length > 0) {
    const progressMap = ['0%', '33.3%', '66.6%', '100%'];
    const activateStep = (idx) => {
      psNodes.forEach((n, i) => n.classList.toggle('active', i === idx));
      psPanels.forEach((p, i) => p.classList.toggle('active', i === idx));
      if (psLine) psLine.style.setProperty('--ps-progress', progressMap[idx]);

      // Highlight + auto-open the matching program card if on the homepage
      const progGrid = document.getElementById('prog-grid');
      if (progGrid) {
        const activeNode = psNodes[idx];
        const progKey = activeNode ? activeNode.dataset.prog : null;
        // Update mobile prog-row-node active states
        document.querySelectorAll('.prog-row-node').forEach(rn => {
          rn.classList.toggle('ps-row-active', rn.dataset.prog === progKey);
        });
        document.querySelectorAll('.prog-tile').forEach(tile => {
          const isMatch = tile.dataset.prog === progKey;
          tile.classList.toggle('ps-highlighted', isMatch);
          const details = tile.querySelector('.prog-details');
          const arrow = tile.querySelector('.prog-arrow');
          if (isMatch) {
            // Open this card
            tile.classList.add('expanded');
            if (details) { details.style.maxHeight = details.scrollHeight + 'px'; details.style.paddingTop = '16px'; details.setAttribute('aria-hidden', 'false'); }
            if (arrow) arrow.style.transform = 'rotate(180deg)';
          } else {
            // Close all others
            tile.classList.remove('expanded');
            if (details) { details.style.maxHeight = '0'; details.style.paddingTop = '0'; details.setAttribute('aria-hidden', 'true'); }
            if (arrow) arrow.style.transform = 'rotate(0deg)';
          }
        });
      }
    };
    psNodes.forEach((node, i) => {
      node.addEventListener('click', () => activateStep(i));
    });
    // Mobile prog-row-node tap also activates the stepper
    document.querySelectorAll('.prog-row-node').forEach(rn => {
      rn.addEventListener('click', () => {
        const step = parseInt(rn.dataset.step, 10);
        if (!isNaN(step)) activateStep(step);
      });
    });
    // Set initial progress line and highlight
    // Use rAF so scrollHeight is measured after first paint
    if (psLine) psLine.style.setProperty('--ps-progress', progressMap[0]);
    requestAnimationFrame(() => { activateStep(0); });
  }

  // ── Expandable Program Cards ──
  const progToggles = document.querySelectorAll('.prog-toggle');
  progToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const tile = toggle.closest('.prog-expand');
      const details = tile.querySelector('.prog-details');
      const arrow = toggle.querySelector('.prog-arrow');
      const isOpen = tile.classList.contains('expanded');
      // Close all others
      document.querySelectorAll('.prog-expand.expanded').forEach(t => {
        if (t !== tile) {
          t.classList.remove('expanded');
          const d = t.querySelector('.prog-details');
          const a = t.querySelector('.prog-arrow');
          if (d) { d.style.maxHeight = '0'; d.style.paddingTop = '0'; d.setAttribute('aria-hidden', 'true'); }
          if (a) a.style.transform = 'rotate(0deg)';
        }
      });
      if (isOpen) {
        tile.classList.remove('expanded');
        if (details) { details.style.maxHeight = '0'; details.style.paddingTop = '0'; details.setAttribute('aria-hidden', 'true'); }
        if (arrow) arrow.style.transform = 'rotate(0deg)';
      } else {
        tile.classList.add('expanded');
        if (details) { details.style.maxHeight = details.scrollHeight + 'px'; details.style.paddingTop = '16px'; details.setAttribute('aria-hidden', 'false'); }
        if (arrow) arrow.style.transform = 'rotate(180deg)';
      }
    });
  });

});

// ── Prog details initial state ──
document.querySelectorAll('.prog-details').forEach(d => {
  d.style.maxHeight = '0';
  d.style.overflow = 'hidden';
  d.style.transition = 'max-height 0.4s ease, padding-top 0.3s ease';
  d.style.paddingTop = '0';
});
