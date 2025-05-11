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
  alert("Your OTP is: " + generatedOTP); // Replace with real SMS API

  otpField.style.display = "block";
  otpField.focus();
});

otpField.addEventListener("input", function () {
  if (otpField.value === generatedOTP) {
    submitBtn.style.display = "inline-block";
  } else {
    submitBtn.style.display = "none";
  }
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




