const messageCounter = document.querySelector(".form-text");
const messageBox = document.querySelector("#message");

messageBox.addEventListener("input", () => {
  messageCounter.innerHTML = `${messageBox.value.length} / 300 characters`;
});
