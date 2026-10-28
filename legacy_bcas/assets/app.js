/* BCAS International Placements — progressive enhancement, accessible interactions */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let toastTimer;

  function toast(message) {
    const node = $('#toast');
    if (!node) return;
    node.textContent = message;
    node.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('show'), 2600);
  }

  // Mark the current page in desktop and mobile navigation for clearer orientation.
  const currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  $$('a[href]').forEach(link => {
    const href = (link.getAttribute('href') || '').split('?')[0].split('#')[0].toLowerCase();
    if (href && href === currentFile && !link.closest('.footer')) {
      link.setAttribute('aria-current', 'page');
      if (link.closest('.mobile-nav')) link.classList.add('active');
    }
  });

  // Set the year centrally so every page remains current.
  $$('#year').forEach(node => { node.textContent = new Date().getFullYear(); });

  // Accessible mobile navigation: close on navigation, Escape and outside click.
  const menu = $('#menuToggle');
  const nav = $('#navLinks');
  const setMenu = open => {
    if (!menu || !nav) return;
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menu.innerHTML = open ? '<span aria-hidden="true">×</span>' : '<span aria-hidden="true">☰</span>';
    document.body.classList.toggle('menu-open', open);
  };
  if (menu && nav) {
    menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
    document.addEventListener('click', event => {
      if (nav.classList.contains('open') && !event.target.closest('#navLinks') && !event.target.closest('#menuToggle')) setMenu(false);
    });
    window.addEventListener('resize', () => { if (window.innerWidth > 780) setMenu(false); });
  }

  // Motion: elegant entrance, scroll reveal, and progress indicator. Content remains visible without JS.
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.prepend(progress);
  const topButton = document.createElement('button');
  topButton.type = 'button';
  topButton.className = 'back-to-top';
  topButton.setAttribute('aria-label', 'Back to top');
  topButton.innerHTML = '<span aria-hidden="true">↑</span>';
  document.body.append(topButton);
  topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  const updateScrollUI = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? Math.min(100, Math.max(0, window.scrollY / scrollable * 100)) : 0;
    progress.style.transform = `scaleX(${percent / 100})`;
    topButton.classList.toggle('visible', window.scrollY > 520);
  };
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  window.addEventListener('resize', updateScrollUI);
  updateScrollUI();

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealTargets = $$('.hero-copy, .hero-visual, .section-intro, .section-heading-row, .destination-card, .support-card, .process-step, .contact-strip-inner, .page-intro .container, .content-panel, .course, .form-card, .campus-card, .story-card, .blog-card, .blog-featured, .blog-article-wrap, .blog-cta, .blog-feature-image');
    revealTargets.forEach((node, index) => {
      if (node.closest('.hero') && node.classList.contains('hero-copy')) return;
      node.classList.add('motion-reveal');
      if (node.matches('.destination-card, .support-card, .process-step, .course, .campus-card, .story-card, .blog-card')) {
        node.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 65}ms`);
      }
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    $$('.motion-reveal').forEach(node => observer.observe(node));
  }

  // Internal page transition; preserve modifier clicks, new tabs, and reduced-motion settings.
  if (!reduceMotion) {
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank' || link.hasAttribute('download')) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
      let target;
      try { target = new URL(href, window.location.href); } catch { return; }
      if (target.origin !== window.location.origin || target.pathname === window.location.pathname && target.search === window.location.search) return;
      event.preventDefault();
      document.body.classList.add('page-leaving');
      window.setTimeout(() => { window.location.href = target.href; }, 135);
    });
    window.addEventListener('pageshow', () => document.body.classList.remove('page-leaving'));
  }

  // Saved course shortlist. Escape text before inserting locally stored values into markup.
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  let saved = [];
  try {
    const value = JSON.parse(localStorage.getItem('bcasSaved') || '[]');
    if (Array.isArray(value)) saved = value.filter(item => typeof item === 'string').slice(0, 100);
  } catch { saved = []; }
  function renderSaved() {
    $$('.saved-count').forEach(node => { node.textContent = saved.length; });
    $$('[data-save]').forEach(button => {
      const active = saved.includes(button.dataset.save);
      button.textContent = active ? '♥ Saved' : '♡ Save';
      button.setAttribute('aria-pressed', String(active));
    });
    const list = $('#savedList');
    if (list) {
      list.innerHTML = saved.length
        ? saved.map(name => `<div class="saved-item"><span>${escapeHTML(name)}</span><button type="button" data-remove="${escapeHTML(name)}">Remove</button></div>`).join('')
        : '<div class="empty">No saved course ideas yet.</div>';
    }
  }
  function persistSaved() {
    try { localStorage.setItem('bcasSaved', JSON.stringify(saved)); } catch { toast('Your browser could not save this shortlist.'); }
    renderSaved();
  }
  document.addEventListener('click', event => {
    const saveButton = event.target.closest('[data-save]');
    if (saveButton) {
      const name = saveButton.dataset.save;
      saved = saved.includes(name) ? saved.filter(item => item !== name) : [...saved, name].slice(0, 100);
      persistSaved();
      toast(saved.includes(name) ? 'Saved for later' : 'Removed from saved list');
      return;
    }
    const removeButton = event.target.closest('[data-remove]');
    if (removeButton) {
      saved = saved.filter(item => item !== removeButton.dataset.remove);
      persistSaved();
      toast('Removed from your shortlist');
    }
  });

  // Course filtering combines category + search, so either control can be used after the other.
  const courseSearch = $('#courseSearch');
  const courseCards = $$('[data-searchable]');
  const courseFilters = $$('[data-filter]');
  let activeCourseFilter = 'All';
  function filterCourses() {
    const query = (courseSearch?.value || '').trim().toLowerCase();
    let visible = 0;
    courseCards.forEach(card => {
      const matchesCategory = activeCourseFilter === 'All' || card.dataset.category === activeCourseFilter;
      const matchesQuery = !query || card.textContent.toLowerCase().includes(query);
      card.hidden = !(matchesCategory && matchesQuery);
      if (!card.hidden) visible++;
    });
    const empty = $('#courseEmpty');
    if (empty) empty.hidden = visible > 0;
    courseFilters.forEach(button => {
      const active = button.dataset.filter === activeCourseFilter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }
  courseFilters.forEach(button => button.addEventListener('click', () => { activeCourseFilter = button.dataset.filter || 'All'; filterCourses(); }));
  if (courseSearch) courseSearch.addEventListener('input', filterCourses);

  // Demo forms intentionally do not send data to BCAS. Never imply a real application was submitted.
  $$('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const result = $('.result', form);
      if (result) {
        result.hidden = false;
        result.textContent = 'Demo enquiry saved in this browser only. It has not been sent to BCAS. For an official enquiry, contact the BCAS team using the links on this page.';
      }
      try {
        const enquiries = JSON.parse(localStorage.getItem('bcasDemoEnquiries') || '[]');
        enquiries.push({ data: Object.fromEntries(new FormData(form)), date: new Date().toISOString() });
        localStorage.setItem('bcasDemoEnquiries', JSON.stringify(enquiries.slice(-30)));
      } catch { /* Private browsing may disable local storage. */ }
      toast('Demo enquiry handled in this browser');
      form.reset();
    });
  });

  // Guided homepage finder, if present.
  const finder = $('#finderForm');
  if (finder) finder.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(finder);
    const result = $('#finderResult');
    if (!result) return;
    result.hidden = false;
    const subject = data.get('interest') || 'Open to options';
    const country = data.get('country') || 'Open to options';
    const level = data.get('level') || 'Not sure yet';
    result.replaceChildren();
    const heading = document.createElement('strong'); heading.textContent = 'Your starting point';
    const paragraph = document.createElement('p'); paragraph.textContent = `Subject: ${subject} · Destination: ${country} · Level: ${level}`;
    const link = document.createElement('a'); link.className = 'btn primary'; link.href = `apply.html?subject=${encodeURIComponent(subject)}&country=${encodeURIComponent(country)}&level=${encodeURIComponent(level)}`; link.textContent = 'Discuss these options ↗';
    result.append(heading, paragraph, link);
  });

  // Prefill the enquiry page when arriving from the guided finder.
  if (location.pathname.endsWith('apply.html')) {
    const params = new URLSearchParams(location.search);
    const mappings = { subject: '#interest', country: '#country', level: '#level' };
    Object.entries(mappings).forEach(([key, selector]) => {
      const field = $(selector); const value = params.get(key);
      if (field && value && [...field.options].some(option => option.text === value || option.value === value)) field.value = value;
    });
  }

  $$('[data-tab]').forEach(button => button.addEventListener('click', () => {
    $$('[data-tab]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-selected', String(active)); });
    $$('.tab-panel').forEach(panel => panel.classList.toggle('active', panel.id === button.dataset.tab));
  }));
  renderSaved();
})();
