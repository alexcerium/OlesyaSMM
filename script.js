// assets/js/script.js
document.addEventListener('DOMContentLoaded', () => {

  /* =======================================================
   * 1. НАВИГАЦИЯ
   * ======================================================= */
  const burger = document.querySelector('.hamburger');
  const menu = document.querySelector('.nav-menu');

  burger?.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu?.classList.toggle('active');
    menu?.classList.toggle('is-open');
    document.body.classList.toggle('menu-open');
  });


  /* =======================================================
   * 2. МЕДИА: ИЗОБРАЖЕНИЯ + ВИДЕО + ПРИМЕРЫ ПОСТИНГА
   * ======================================================= */

  // --- 2.1 Lazy-загрузка изображений по всему сайту ---
  document.querySelectorAll('img').forEach((img) => {
    img.loading = 'lazy';
    img.addEventListener('error', () => {
      img.style.display = 'none';
      img.parentElement?.classList?.add('no-image');
    });
  });

  // --- 2.2 Видео в блоке Reels ---
  const video = document.querySelector('.reels-video');
  const loading = document.querySelector('.video-loading');
  const fallback = document.querySelector('.video-fallback');

  if (video) {
    const hideLoading = () => { if (loading) loading.style.display = 'none'; };

    video.addEventListener('loadeddata', hideLoading);
    video.addEventListener('canplay', hideLoading);
    video.addEventListener('error', () => {
      hideLoading();
      if (fallback) fallback.style.display = 'block';
      video.controls = true;
    });

    // Попытка автоплея
    const attempt = video.play();
    if (attempt && typeof attempt.then === 'function') {
      attempt.then(hideLoading).catch(() => {
        hideLoading();
        video.controls = true;
      });
    } else {
      video.controls = true;
      hideLoading();
    }
  }

  // --- 2.3 Примеры постинга (lazy data-src + автоплей видео) ---
const postingMedia = document.querySelectorAll(
  '.posting-grid img[data-src], .posting-grid video[data-src]'
);

if (postingMedia.length) {
  const postingObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const realSrc = el.getAttribute('data-src');
        if (!realSrc) {
          obs.unobserve(el);
          return;
        }

        if (el.tagName === 'VIDEO') {
          // подставляем src и настраиваем видео
          el.src = realSrc;
          el.preload = 'metadata';
          el.muted = true;
          el.playsInline = true;
          el.loop = true;

          // пробуем автоплей
          const playPromise = el.play();
          if (playPromise && typeof playPromise.then === 'function') {
            playPromise.catch(() => {
              // если браузер не дал автоплей — хотя бы постер подгрузится
            });
          }
        } else {
          // обычные изображения
          el.src = realSrc;
          el.loading = 'lazy';
        }

        el.removeAttribute('data-src');
        obs.unobserve(el);
      });
    },
    {
      rootMargin: '200px 0px',
      threshold: 0.01
    }
  );

  postingMedia.forEach((el) => postingObserver.observe(el));
}


  /* =======================================================
   * 3. ВИЗУАЛЬНЫЕ ЭФФЕКТЫ: АНІМАЦИИ, REVEAL, СЧЁТЧИКИ
   * ======================================================= */

  // --- 3.1 Избранный кейс (#projects .featured-case) ---
  const featured = document.querySelector('#projects .featured-case');
  if (featured) {
    const targets = featured.querySelectorAll('.case-text, .case-results, .case-actions .btn');

    // Начальные стили
    targets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity .4s ease, transform .4s ease';
    });

    const featuredObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // Плавное появление
          targets.forEach((el, idx) => {
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'none';
            }, idx * 90);
          });

          // Счётчики
          const numbers = featured.querySelectorAll('.result .number, .result-number');
          numbers.forEach(animateCounter);

          featuredObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.25 }
    );

    featuredObserver.observe(featured);
  }

  // --- 3.2 Анимация числовых счётчиков ---
  function animateCounter(el) {
    const raw = (el.textContent || '').trim();
    const hasPercent = raw.includes('%');
    const hasPlus = raw.includes('+');
    const target = parseInt(raw.replace(/[^\d]/g, ''), 10);
    if (!target || Number.isNaN(target)) return;

    let cur = 0;
    const steps = 40;
    const step = Math.max(1, Math.round(target / steps));

    const tick = () => {
      cur += step;
      if (cur >= target) cur = target;
      el.textContent = `${hasPlus ? '+' : ''}${cur}${hasPercent ? '%' : ''}`;
      if (cur < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // --- 3.3 Reveal-анимации при скролле ---
  const animatedSelectors = [
    '.hero-content',
    '.about-text',
    '.software-section',
    '.clients-grid',
    '.workflow-steps .step',
    '.faq-item'
  ];

  animatedSelectors.forEach((selector, index) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add('reveal');
      const delayClassIndex = (index % 3) + 1;
      el.classList.add(`reveal-delay-${delayClassIndex}`);
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));


  /* =======================================================
   * 4. ИНТЕРАКТИВ: FAQ + АРІА-ОПЦИИ
   * ======================================================= */
  const faqItems = document.querySelectorAll('.faq-item');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  faqItems.forEach((item) => {
    const answer = item.querySelector('p');
    if (!answer) return;

    answer.style.maxHeight = '0px';
    item.dataset.faqState = 'closed';

    const openItem = () => {
      item.classList.add('is-open');
      item.setAttribute('aria-expanded', 'true');
      item.dataset.faqState = 'opening';

      if (prefersReducedMotion) {
        answer.style.maxHeight = 'none';
        item.dataset.faqState = 'open';
        return;
      }

      answer.style.maxHeight = '0px';
      requestAnimationFrame(() => {
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      });

      answer.addEventListener(
        'transitionend',
        (e) => {
          if (e.propertyName !== 'max-height') return;
          answer.style.maxHeight = 'none';
          item.dataset.faqState = 'open';
        },
        { once: true }
      );
    };

    const closeItem = () => {
      item.setAttribute('aria-expanded', 'false');
      item.dataset.faqState = 'closing';

      if (prefersReducedMotion) {
        item.classList.remove('is-open');
        answer.style.maxHeight = '0px';
        item.dataset.faqState = 'closed';
        return;
      }

      if (answer.style.maxHeight === 'none') {
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }

      requestAnimationFrame(() => {
        answer.style.maxHeight = '0px';
      });

      answer.addEventListener(
        'transitionend',
        (e) => {
          if (e.propertyName !== 'max-height') return;
          if (item.dataset.faqState === 'closing') {
            item.classList.remove('is-open');
            item.dataset.faqState = 'closed';
          }
        },
        { once: true }
      );
    };

    const toggleItem = () => {
      const isOpen = item.classList.contains('is-open');
      if (isOpen) closeItem();
      else openItem();
    };

    item.addEventListener('click', toggleItem);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleItem();
      }
    });
  });

});