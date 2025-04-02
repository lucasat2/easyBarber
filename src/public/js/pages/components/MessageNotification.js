function MessageNotification(message, color) {
  if (document.getElementById("notificationContainer")) {
    document.getElementById("notificationContainer").remove();
  }

  const notificationContainer = document.createElement("div");
  notificationContainer.id = "notificationContainer";

  const textNode = document.createElement("span");
  textNode.textContent = message;
  notificationContainer.appendChild(textNode);

  const closeButton = document.createElement("button");
  closeButton.textContent = "×";
  notificationContainer.appendChild(closeButton);
  closeButton.addEventListener("click", closeNotification);

  notificationContainer.style.position = "fixed";
  notificationContainer.style.bottom = "0";
  notificationContainer.style.left = "50%";
  notificationContainer.style.transform = "translateX(-50%)";
  notificationContainer.style.padding = "30px 40px";
  notificationContainer.style.backgroundColor = color;
  notificationContainer.style.borderTopLeftRadius = "10px";
  notificationContainer.style.borderTopRightRadius = "10px";
  notificationContainer.style.display = "flex";
  notificationContainer.style.justifyContent = "center";
  notificationContainer.style.alignItems = "center";
  notificationContainer.style.color = "white";
  notificationContainer.style.fontSize = "20px";
  notificationContainer.style.zIndex = "1000";

  closeButton.style.position = "absolute";
  closeButton.style.top = "7px";
  closeButton.style.right = "7px";
  closeButton.style.cursor = "pointer";
  closeButton.style.background = "transparent";
  closeButton.style.border = "none";
  closeButton.style.color = "white";
  closeButton.style.fontSize = "25px";
  closeButton.style.fontWeight = "bold";
  closeButton.style.padding = "0";
  closeButton.style.width = "25px";
  closeButton.style.height = "25px";
  closeButton.style.textAlign = "center";

  function removeNotification() {
    const notification = document.getElementById("notificationContainer");

    if (notification) {
      notification.remove();
    }
  }

  const timeoutId = setTimeout(() => {
    removeNotification();
  }, 5000);

  function closeNotification() {
    removeNotification();

    clearTimeout(timeoutId);
  }

  document.body.appendChild(notificationContainer);
}

export { MessageNotification };