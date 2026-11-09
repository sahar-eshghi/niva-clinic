(() => {
  const root = document.documentElement;
  const languageToggle = document.getElementById('languageToggle');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const form = document.getElementById('appointmentForm');
  const formStatus = document.getElementById('formStatus');
  const currentYear = document.getElementById('currentYear');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js-enabled');
  let currentLanguage = 'fa';

  currentYear.textContent = new Date().getFullYear();

  const translate = (language) => {
    currentLanguage = language;
    const isEnglish = language === 'en';
    root.lang = isEnglish ? 'en' : 'fa';
    root.dir = isEnglish ? 'ltr' : 'rtl';
    document.body.classList.toggle('is-english', isEnglish);
    document.querySelectorAll('[data-fa][data-en]').forEach((element) => {
      const value = element.dataset[isEnglish ? 'en' : 'fa'];
      if (value !== undefined) element.innerHTML = value;
    });
    document.querySelectorAll('[data-placeholder-fa][data-placeholder-en]').forEach((element) => {
      element.placeholder = element.dataset[isEnglish ? 'placeholderEn' : 'placeholderFa'];
    });
    document.querySelectorAll('[data-aria-fa][data-aria-en]').forEach((element) => {
      element.setAttribute('aria-label', element.dataset[isEnglish ? 'ariaEn' : 'ariaFa']);
    });
    document.querySelectorAll('[data-placeholder-link]').forEach((link) => link.setAttribute('aria-disabled', 'true'));
    languageToggle.setAttribute('aria-pressed', String(isEnglish));
    languageToggle.setAttribute('aria-label', isEnglish ? 'Switch language to Persian' : 'Switch language to English');
    menuToggle.setAttribute('aria-label', isEnglish ? (menuToggle.getAttribute('aria-expanded') === 'true' ? 'Close menu' : 'Open menu') : (menuToggle.getAttribute('aria-expanded') === 'true' ? 'بستن منو' : 'باز کردن منو'));
    document.title = isEnglish ? 'NIVA Aesthetic Clinic | Your Beauty, Refined' : 'کلینیک زیبایی نیوا | NIVA Aesthetic Clinic';
    if (formStatus.textContent) formStatus.textContent = isEnglish ? 'Demo only: this form has not sent or saved your information.' : 'این فرم نمایشی است و اطلاعات شما ارسال یا ذخیره نشده است.';
    document.querySelectorAll('.field-error').forEach((error) => { error.textContent = ''; });
  };

  languageToggle.addEventListener('click', () => translate(currentLanguage === 'fa' ? 'en' : 'fa'));

  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-label', currentLanguage === 'en' ? 'Open menu' : 'باز کردن منو');
  };
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    mainNav.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-label', currentLanguage === 'en' ? (open ? 'Close menu' : 'Open menu') : (open ? 'بستن منو' : 'باز کردن منو'));
  });
  mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', (event) => {
    if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });

  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries, io) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    document.querySelectorAll('.section-label, .principle-item, .treatment-row, .experience-copy, .about-story, .journal-feature, .journal-small, .journey-figure, .journey-note, .team-member, .testimonial-content, .appointment-form, .faq-intro, .faq-list').forEach((element) => {
      element.classList.add('reveal');
      observer.observe(element);
    });
  }



  // Full-bleed Categories reveal: one-shot IntersectionObserver, 0.1 threshold.
  const categoriesGrid = document.querySelector('.categories-grid');
  if (categoriesGrid) {
    const categoryCards = [...categoriesGrid.querySelectorAll('.category-card')];
    categoryCards.forEach((card, index) => card.style.setProperty('--category-delay', `${index * 150}ms`));

    if ('IntersectionObserver' in window && !reducedMotion) {
      const categoriesObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            categoriesGrid.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      categoriesObserver.observe(categoriesGrid);
    } else {
      categoriesGrid.classList.add('is-visible');
    }

    // Decorative background videos stay still for visitors who request reduced motion.
    if (reducedMotion) {
      categoriesGrid.querySelectorAll('video').forEach((video) => {
        video.pause();
        video.removeAttribute('autoplay');
      });
    }
  }

  if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    const parallaxImage = document.querySelector('[data-parallax]');
    const parallaxWrap = document.querySelector('[data-parallax-wrap]');
    let frame = null;
    const updateParallax = () => {
      if (!parallaxImage || !parallaxWrap) return;
      const bounds = parallaxWrap.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      if (bounds.bottom < 0 || bounds.top > viewport) return;
      const progress = (viewport - bounds.top) / (viewport + bounds.height);
      const shift = (progress - 0.5) * 18;
      parallaxImage.style.transform = `scale(1.08) translate3d(0, ${shift.toFixed(2)}px, 0)`;
      frame = null;
    };
    window.addEventListener('scroll', () => {
      if (frame === null) frame = window.requestAnimationFrame(updateParallax);
    }, { passive: true });
    window.addEventListener('resize', updateParallax, { passive: true });
  }

  const phonePattern = /^[+\d\s()\-]{7,22}$/;
  const setFieldError = (field, message) => {
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    const error = field.closest('.form-field')?.querySelector('.field-error');
    if (error) error.textContent = message;
  };
  const validateField = (field) => {
    let error = '';
    const value = field.value.trim();
    if (field.required && !value) error = currentLanguage === 'en' ? 'This field is required.' : 'تکمیل این فیلد ضروری است.';
    else if (field.id === 'fullName' && value.length < 2) error = currentLanguage === 'en' ? 'Please enter your full name.' : 'لطفاً نام و نام خانوادگی را وارد کنید.';
    else if (field.id === 'phone' && !phonePattern.test(value)) error = currentLanguage === 'en' ? 'Please enter a valid phone number.' : 'لطفاً شماره تماس معتبر وارد کنید.';
    setFieldError(field, error);
    return !error;
  };
  form.querySelectorAll('input:not([type="checkbox"]), select').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => { if (field.hasAttribute('aria-invalid')) validateField(field); });
    field.addEventListener('change', () => { if (field.hasAttribute('aria-invalid')) validateField(field); });
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = [...form.querySelectorAll('#fullName, #phone, #treatment')];
    const valid = fields.map(validateField).every(Boolean);
    const consent = document.getElementById('consent');
    if (!consent.checked) {
      formStatus.textContent = currentLanguage === 'en' ? 'Please review and accept the privacy notice before continuing.' : 'لطفاً متن مربوط به حریم خصوصی را بررسی و تأیید کنید.';
      consent.focus();
      return;
    }
    if (!valid) {
      formStatus.textContent = currentLanguage === 'en' ? 'Please review the highlighted fields.' : 'لطفاً فیلدهای مشخص‌شده را بررسی کنید.';
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    formStatus.textContent = currentLanguage === 'en' ? 'Preview complete. Nothing was sent or stored. Connect a booking service before launch.' : 'پیش‌نمایش فرم تکمیل شد؛ چیزی ارسال یا ذخیره نشد. پیش از انتشار، سیستم رزرو را متصل کنید.';
  });

  // Hero note: dismissible pill (same pattern as the reference's shipping banner).
  const heroPill = document.getElementById('heroPill');
  const heroPillClose = document.getElementById('heroPillClose');
  if (heroPill && heroPillClose) {
    heroPillClose.addEventListener('click', () => {
      heroPill.classList.add('is-dismissed');
      heroPill.setAttribute('aria-hidden', 'true');
    });
  }

  // Accordions: one open item per group (philosophy principles, FAQ).
  document.querySelectorAll('.principles, .faq-list').forEach((group) => {
    const items = [...group.querySelectorAll('details')];
    items.forEach((item) => item.addEventListener('toggle', () => {
      if (!item.open) return;
      items.forEach((other) => { if (other !== item) other.open = false; });
    }));
  });

  // Keep placeholder social links from navigating to an empty fragment.
  document.querySelectorAll('[data-placeholder-link]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
  });
})();
