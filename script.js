document.addEventListener('DOMContentLoaded', function () {
  // Countdown Timer
  const countDownDate = new Date('2025-07-26T00:00:00').getTime();
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const countdownContainer = document.getElementById('countdown');

  function setCountdown(diff) {
    if (diff < 0) {
      countdownContainer.innerHTML = "<h3 style='color:#f39c12; margin:0;'>The Event Has Started!</h3>";
      return true;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl.textContent !== String(days).padStart(2, '0')) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl.textContent !== String(hours).padStart(2, '0')) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl.textContent !== String(minutes).padStart(2, '0')) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl.textContent !== String(seconds).padStart(2, '0')) secondsEl.textContent = String(seconds).padStart(2, '0');
    return false;
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    if (setCountdown(distance)) {
      clearInterval(timer);
    }
  }

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);

  // Mobile Menu Toggle with Blur
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open', navMenu.classList.contains('active'));
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Close on link click
  document.querySelectorAll('#navMenu a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Close when clicking blur background
  document.addEventListener('click', function (e) {
    if (
      document.body.classList.contains('menu-open') &&
      !navMenu.contains(e.target) &&
      e.target !== mobileMenuBtn &&
      !mobileMenuBtn.contains(e.target)
    ) {
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  }, true);

  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Back to top button (Note: The HTML for this button was not present in the original code, but the JS was. I've kept the JS in case you add the button later.)
  // const backToTop = document.getElementById('backToTop');
  // window.addEventListener('scroll', () => {
  //   if (window.scrollY > 300) {
  //     backToTop.classList.add('active');
  //   } else {
  //     backToTop.classList.remove('active');
  //   }
  // });

  // Schedule tabs (No schedule section in the provided HTML, but keeping the JS for future use)
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
        b.setAttribute('tabindex', '-1');
      });
      document.querySelectorAll('.tab-content').forEach((c) => {
        c.classList.remove('active');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      btn.setAttribute('tabindex', '0');
      document.getElementById(btn.getAttribute('data-day')).classList.add('active');
    });
  });

  document.querySelectorAll('section, .committee-card, .core-member-card, .hero-content').forEach(el => {
  el.classList.add('fade-in-up');
});

  // FAQ accordion (No FAQ section in the provided HTML, but keeping the JS for future use)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });

  // Payment method selection (No payment section in the provided HTML, but keeping the JS for future use)
  const paymentMethods = document.querySelectorAll('.payment-method');
  paymentMethods.forEach((method) => {
    method.addEventListener('click', () => {
      paymentMethods.forEach((m) => {
        m.classList.remove('active');
        m.setAttribute('aria-checked', 'false');
        m.setAttribute('tabindex', '-1');
      });
      method.classList.add('active');
      method.setAttribute('aria-checked', 'true');
      method.setAttribute('tabindex', '0');
    });
  });

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      '.about-text, .about-image, .committee-card, .schedule-item, .registration-image, .registration-form, .contact-info, .contact-map, .faq-item'
    );
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      if (elementPosition < screenPosition) {
        element.classList.add('animated');
      }
    });
  };
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);

  // Form submission (No form with id 'munRegistrationForm' in the provided HTML, but keeping the JS for future use)
  const registrationForm = document.getElementById('munRegistrationForm');
  if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Registration submitted successfully! We will contact you with further details.');
      registrationForm.reset();
    });
  }
});
