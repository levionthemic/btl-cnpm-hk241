const updateButton = document.querySelector(".update-button");
updateButton.addEventListener("click", () => {
  const button = updateButton.nextSibling;
  button.disabled = false;
  const inputs = document.querySelectorAll("input");
  inputs.forEach(input => {
    input.disabled = false;
  });
})