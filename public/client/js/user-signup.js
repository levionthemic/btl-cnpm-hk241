const usernameInput = document.querySelector("input#username");
usernameInput.value = sessionStorage.getItem("username");
usernameInput.addEventListener("change", () => {
  sessionStorage.setItem("username", usernameInput.value);
});

const birthdayInput = document.querySelector("input#birthday");
birthdayInput.value = sessionStorage.getItem("birthday");
birthdayInput.addEventListener("change", () => {
  sessionStorage.setItem("birthday", birthdayInput.value);
});

const addressInput = document.querySelector("input#address");
addressInput.value = sessionStorage.getItem("address");
addressInput.addEventListener("change", () => {
  sessionStorage.setItem("address", addressInput.value);
});

const phoneInput = document.querySelector("input#phone");
phoneInput.value = sessionStorage.getItem("phoneNumber");
phoneInput.addEventListener("change", () => {
  sessionStorage.setItem("phoneNumber", phoneInput.value);
});

const passwordInput = document.querySelector("input#password");
passwordInput.value = sessionStorage.getItem("password");
passwordInput.addEventListener("change", () => {
  sessionStorage.setItem("password", passwordInput.value);
});

const confirmPasswordInput = document.querySelector("input#confirmPassword");
confirmPasswordInput.value = sessionStorage.getItem("confirmPassword");
confirmPasswordInput.addEventListener("change", () => {
  sessionStorage.setItem("confirmPassword", confirmPasswordInput.value);
}); 

window.addEventListener("beforeunload", () => {
  sessionStorage.clear();
})
