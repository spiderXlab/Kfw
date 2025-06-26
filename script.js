window.addEventListener('load', () => {
    initSlider();
    initContactForm();
    initVisitorCounter();
  });

  // ========================
  // 🔁 IMAGE SLIDER SECTION
  // ========================
  function initSlider() {
    const slider = document.getElementById('aboutSlider');
    const slides = slider.querySelectorAll('.photo');
    const dotsContainer = document.getElementById('dotsContainer');
    let currentIndex = 0;
    let interval;

    function goToSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      currentIndex = index;
      updateDots(index);
    }

    function createDots() {
      slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.textContent = index === 0 ? '●' : '○';
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
    }

    function updateDots(index) {
      const dots = dotsContainer.querySelectorAll('span');
      dots.forEach((dot, i) => {
        dot.textContent = i === index ? '●' : '○';
        dot.classList.toggle('active-dot', i === index);
      });
    }

    function startAutoSlide() {
      interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
      }, 5000);
    }

    // Swipe handling
    let startX = 0;
    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
      } else if (endX - startX > 50) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(currentIndex);
      }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
      } else if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(currentIndex);
      }
    });

    // Initialize
    slides[0].classList.add('active');
    createDots();
    updateDots(0);
    startAutoSlide();
  }

  // ========================
  // 📩 CONTACT FORM + OTP
  // ========================
  function initContactForm() {
    const form = document.getElementById("contact-form");
    const thankYou = document.getElementById("thank-you");
    const sendOTPBtn = document.getElementById("send-otp");
    const otpField = document.getElementById("otp");
    const submitBtn = document.getElementById("submit-btn");
    let generatedOTP = "";

    sendOTPBtn.addEventListener("click", function () {
      const mobile = document.getElementById("mobile").value;
      if (!/^\d{10}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
      }

      generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      alert("Your OTP is: " + generatedOTP); // Replace with SMS API in production
      otpField.style.display = "block";
      otpField.focus();
    });

    otpField.addEventListener("input", function () {
      submitBtn.style.display = otpField.value === generatedOTP ? "inline-block" : "none";
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);

      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          form.reset();
          form.style.display = "none";
          thankYou.classList.add("show");
        } else {
          alert("Something went wrong. Please try again.");
        }
      }).catch(error => {
        alert("Error: " + error);
      });
    });
  }

  // ========================
  // 👥 FAKE VISITOR COUNTER
  // ========================
  function initVisitorCounter() {
    let fakeCount = localStorage.getItem('fakeVisitorCount')
      ? parseInt(localStorage.getItem('fakeVisitorCount'))
      : 13579;

    function updateFakeVisitorCounter() {
      const increaseBy = Math.floor(Math.random() * 4) + 2; // 2 to 5
      fakeCount += increaseBy;
      localStorage.setItem('fakeVisitorCount', fakeCount);

      const countStr = String(fakeCount).padStart(6, '0');
      const digits = document.querySelectorAll('#visitorCounter .digit');
      countStr.split('').forEach((digit, i) => {
        if (digits[i]) digits[i].textContent = digit;
      });
    }

    updateFakeVisitorCounter();
    setInterval(updateFakeVisitorCounter, 120000); // every 2 minutes
  }
