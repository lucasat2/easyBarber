export default function externalServiceScheduling(onConfirm, onCancel) {
  const container = document.createElement("div");
  container.classList.add("confirmationModalOverlay");

  const modal = document.createElement("div");
  modal.classList.add("confirmationModal");

  const message = document.createElement("p");
  message.classList.add("confirmationMessage");
  message.innerText = "Deseja mesmo realizar essa ação?";
  modal.appendChild(message);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("confirmationButtonContainer");

  const confirmButton = document.createElement("button");
  confirmButton.classList.add("confirmationButton", "confirmButton");
  confirmButton.innerText = "Sim";
  confirmButton.addEventListener("click", () => {
    if (onConfirm) onConfirm();
    container.remove();
  });

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("confirmationButton", "cancelButton");
  cancelButton.innerText = "Não";
  cancelButton.addEventListener("click", () => {
    if (onCancel) onCancel();
    container.remove();
  });

  buttonContainer.appendChild(confirmButton);
  buttonContainer.appendChild(cancelButton);
  modal.appendChild(buttonContainer);
  container.appendChild(modal);

  return container;
}
