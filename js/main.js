/* =========================================================
   포트폴리오 웹 이력서 — 인터랙션 (바닐라 JS)
   기능: 다크모드 · 모바일 메뉴 · 활성 섹션 하이라이트 ·
        타이핑 효과 · 스킬 바 · 스크롤 reveal · 프로젝트 필터/모달 ·
        폼 검증 · 맨 위로 버튼
   ========================================================= */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    initActiveSection();
    initTyping();
    initSkillBars();
    initReveal();
    initProjectFilter();
    initProjectModal();
    initContactForm();
    initToTop();
  });

  /* ---------- 다크모드 토글 ----------
     초기 클래스는 <head> 인라인 스크립트에서 이미 적용됨. */
  function initThemeToggle() {
    const btn = $('#theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  /* ---------- 모바일 햄버거 메뉴 ---------- */
  function initMobileMenu() {
    const toggle = $('#menu-toggle');
    const menu = $('#mobile-menu');
    if (!toggle || !menu) return;

    const close = () => {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', '메뉴 열기');
    };
    const open = () => {
      menu.classList.remove('hidden');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', '메뉴 닫기');
    };

    toggle.addEventListener('click', () => {
      menu.classList.contains('hidden') ? open() : close();
    });
    // 메뉴 항목 클릭 시 닫기
    $$('a', menu).forEach((a) => a.addEventListener('click', close));
  }

  /* ---------- 스크롤 시 활성 섹션 네비 하이라이트 ---------- */
  function initActiveSection() {
    const links = $$('.nav-link');
    if (!links.length) return;
    const map = new Map();
    links.forEach((link) => {
      const id = link.getAttribute('href').slice(1);
      const sec = document.getElementById(id);
      if (sec) map.set(sec, link);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = map.get(entry.target);
          if (!link) return;
          if (entry.isIntersecting) {
            links.forEach((l) => l.classList.remove('text-brand-600', 'dark:text-brand-400', 'font-semibold'));
            link.classList.add('text-brand-600', 'dark:text-brand-400', 'font-semibold');
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    map.forEach((_, sec) => observer.observe(sec));
  }

  /* ---------- Hero 타이핑 효과 ---------- */
  function initTyping() {
    const el = $('#typed');
    if (!el) return;
    const phrases = [
      '프론트엔드 개발자',
      '사용자 경험을 만드는 사람',
      'React & Vue 개발자',
      '깔끔한 코드를 추구합니다',
    ];

    if (prefersReducedMotion) {
      el.textContent = phrases[0];
      const cursor = $('.type-cursor');
      if (cursor) cursor.style.display = 'none';
      return;
    }

    let pi = 0; // phrase index
    let ci = 0; // char index
    let deleting = false;

    function tick() {
      const current = phrases[pi];
      el.textContent = current.slice(0, ci);

      let delay = deleting ? 50 : 110;
      if (!deleting && ci === current.length) {
        delay = 1600; // 끝에서 잠시 멈춤
        deleting = true;
      } else if (deleting && ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        delay = 300;
      } else {
        ci += deleting ? -1 : 1;
      }
      setTimeout(tick, delay);
    }
    tick();
  }

  /* ---------- 스킬 프로그레스 바 (뷰포트 진입 시 채움) ---------- */
  function initSkillBars() {
    const bars = $$('.skill-bar');
    if (!bars.length) return;

    const fill = (bar) => {
      const pct = Math.max(0, Math.min(100, parseInt(bar.dataset.percent, 10) || 0));
      bar.style.width = pct + '%';
    };

    if (prefersReducedMotion) {
      bars.forEach(fill);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fill(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    bars.forEach((bar) => observer.observe(bar));
  }

  /* ---------- 스크롤 reveal 애니메이션 ---------- */
  function initReveal() {
    const items = $$('.reveal');
    if (!items.length) return;

    if (prefersReducedMotion) {
      items.forEach((el) => el.classList.add('active'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => observer.observe(el));
  }

  /* ---------- 프로젝트 필터링 ---------- */
  function initProjectFilter() {
    const buttons = $$('.filter-btn');
    const cards = $$('.project-card');
    if (!buttons.length || !cards.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const filter = btn.dataset.filter;
        cards.forEach((card) => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('is-hidden', !match);
        });
      });
    });
  }

  /* ---------- 프로젝트 모달 ---------- */
  function initProjectModal() {
    const modal = $('#project-modal');
    if (!modal) return;
    const backdrop = $('#modal-backdrop');
    const closeBtn = $('#modal-close');
    const img = $('#modal-image');
    const title = $('#modal-title');
    const tech = $('#modal-tech');
    const desc = $('#modal-desc');
    const link = $('#modal-link');
    let lastFocused = null;

    const open = (card) => {
      title.textContent = card.dataset.title || '';
      tech.textContent = card.dataset.tech || '';
      desc.textContent = card.dataset.desc || '';
      img.src = card.dataset.image || '';
      img.alt = (card.dataset.title || '프로젝트') + ' 미리보기';
      link.href = card.dataset.link || '#';

      lastFocused = document.activeElement;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };

    const close = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    };

    $$('.project-card').forEach((card) => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.addEventListener('click', () => open(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(card);
        }
      });
    });

    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) close();
    });

    // 간단한 포커스 트랩 (모달 내부에서 Tab 순환)
    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusables = $$('a[href], button, [tabindex]:not([tabindex="-1"])', modal)
        .filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* ---------- 연락 폼 유효성 검사 ---------- */
  function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;
    const success = $('#form-success');

    const fields = {
      name: { input: $('#name'), error: $('#name-error'), validate: (v) => v.trim().length > 0 },
      email: {
        input: $('#email'),
        error: $('#email-error'),
        validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      },
      message: { input: $('#message'), error: $('#message-error'), validate: (v) => v.trim().length > 0 },
    };

    const checkField = (f) => {
      const ok = f.validate(f.input.value);
      f.error.classList.toggle('hidden', ok);
      f.input.classList.toggle('has-error', !ok);
      f.input.setAttribute('aria-invalid', String(!ok));
      return ok;
    };

    // 입력 중 에러 해제 피드백
    Object.values(fields).forEach((f) => {
      f.input.addEventListener('input', () => {
        if (!f.error.classList.contains('hidden')) checkField(f);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      success.classList.add('hidden');

      let allValid = true;
      let firstInvalid = null;
      Object.values(fields).forEach((f) => {
        const ok = checkField(f);
        if (!ok && !firstInvalid) firstInvalid = f.input;
        allValid = allValid && ok;
      });

      if (!allValid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // 데모 처리: mailto 로 메일 앱 열기
      const name = encodeURIComponent(fields.name.input.value.trim());
      const body = encodeURIComponent(fields.message.input.value.trim() + '\n\n— ' + fields.name.input.value.trim());
      window.location.href =
        'mailto:example@email.com?subject=' + name + '님의 포트폴리오 문의&body=' + body;

      success.classList.remove('hidden');
      form.reset();
    });
  }

  /* ---------- 맨 위로 버튼 ---------- */
  function initToTop() {
    const btn = $('#to-top');
    if (!btn) return;
    const onScroll = () => {
      btn.classList.toggle('hidden', window.scrollY < 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }
})();
