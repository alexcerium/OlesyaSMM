// assets/js/script.js
document.addEventListener('DOMContentLoaded', () => {
  /* =========================
     1) Бургер-меню
  ========================== */
  const burger = document.querySelector('.hamburger');
  const menu = document.querySelector('.nav-menu');

  burger?.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu?.classList.toggle('active');   // старый класс
    menu?.classList.toggle('is-open');  // новый класс из обновлённого CSS
    document.body.classList.toggle('menu-open');
  });

  /* =========================
     2) Модальные окна проектов
        - "Смотреть" открывает модалку
        - "Перейти" — обычная ссылка из HTML
  ========================== */
  const modal = document.getElementById('projectModal');
  const closeBtn = modal?.querySelector('.close');

  // Плавное открытие с анимацией
  function openModalById(id) {
    if (!modal) return;

    // Показать только нужный item
    const items = modal.querySelectorAll('.modal-item');
    let matched = false;
    items.forEach((it) => {
      const show = it.getAttribute('data-modal') === String(id);
      it.style.display = show ? 'block' : 'none';
      if (show) matched = true;
    });
    // Если не нашли — показать первый
    if (!matched && items[0]) items[0].style.display = 'block';

    // Анимация появления контейнера
    const content = modal.querySelector('.modal-content');
    modal.style.display = 'block';
    modal.style.opacity = '0';
    content.style.transform = 'scale(0.92)';
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      modal.style.opacity = '1';
      content.style.transition = 'transform .25s ease';
      content.style.transform = 'scale(1)';
    });

    // Мягкий вход внутренних блоков
    const currentItem =
      modal.querySelector('.modal-item[style*="block"]') || modal.querySelector('.modal-item');

    if (currentItem) {
      const blocks = currentItem.querySelectorAll('.modal-animate');
      blocks.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(14px)';
        el.style.transition = 'opacity .35s ease, transform .35s ease';
      });

      setTimeout(() => {
        blocks.forEach((el) => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      }, 120);
    }
  }

  function closeModal() {
    if (!modal) return;
    const content = modal.querySelector('.modal-content');
    modal.style.opacity = '0';
    content.style.transform = 'scale(0.94)';
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 200);
  }

 // Делегирование клика по "Смотреть"
document.addEventListener('click', (e) => {
  const viewBtn = e.target.closest('.btn-view');
  if (!viewBtn) return;

  const card = viewBtn.closest('.client-card');
  if (!card) return;

  const id = card.dataset.project || card.dataset.id || '1';
  openModalById(id);
});

  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.style.display === 'block') closeModal();
  });

  /* =========================
     3) Избранный кейс (анимация + счётчики)
        Секция: #projects .featured-case
  ========================== */
  const projectsSection = document.getElementById('projects');
  const featured = projectsSection?.querySelector('.featured-case');

  if (featured) {
    const targets = featured.querySelectorAll('.case-text, .case-results, .case-actions .btn');
    targets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity .4s ease, transform .4s ease';
    });

    const featuredObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // Ступенчатое появление
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

  /* =========================
     4) Видео Reels: загрузка/автоплей/фолбэк
  ========================== */
  const video = document.querySelector('.reels-video');
  const loading = document.querySelector('.video-loading');
  const fallback = document.querySelector('.video-fallback');

  if (video) {
    const hideLoading = () => {
      if (loading) loading.style.display = 'none';
    };

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

  /* =========================
     5) Изображения: lazy + onerror
  ========================== */
  document.querySelectorAll('img').forEach((img) => {
    img.loading = 'lazy';
    img.addEventListener('error', () => {
      img.style.display = 'none';
      img.parentElement?.classList?.add('no-image');
    });
  });

  /* =========================
     6) Глобальные скролл-анимации (минимализм)
        — всё появляется только при входе в вьюпорт
  ========================== */

  // Какие блоки «раскрывать» при скролле
  const animatedSelectors = [
    '.hero-content',
    '.about-text',
    '.software-section',
    '.clients-grid',
    '.workflow-steps .step',
    '.faq-item'
  ];

  // Назначаем класс .reveal + легкие задержки
  animatedSelectors.forEach((selector, index) => {
    document.querySelectorAll(selector).forEach((el) => {
      // если элемент уже в модалке или внутри featured-case с ручной анимацией — можно пропустить,
      // но в нашем наборе они и так не пересекаются
      el.classList.add('reveal');

      const delayClassIndex = (index % 3) + 1;
      el.classList.add(`reveal-delay-${delayClassIndex}`);
    });
  });

  // IntersectionObserver для плавного появления
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2
    }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

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
        (event) => {
          if (event.propertyName !== 'max-height') return;
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
        (event) => {
          if (event.propertyName !== 'max-height') return;
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
      if (isOpen) {
        closeItem();
      } else {
        openItem();
      }
    };

    item.addEventListener('click', toggleItem);
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleItem();
      }
    });
  });
});