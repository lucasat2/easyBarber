import { MessageNotification } from "../MessageNotification.js";

export default async function ConfirmRemoveStaffModal(staffId, onSave) {
  const div = document.createElement("div");
  Object.assign(div.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "100",
  });

  const modalContent = document.createElement("div");
  Object.assign(modalContent.style, {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
    minWidth: "300px",
  });

  const title = document.createElement("h2");
  title.textContent = "Deseja mesmo realizar essa ação?";
  modalContent.appendChild(title);

  const buttonsContainer = document.createElement("div");
  Object.assign(buttonsContainer.style, {
    display: "flex",
    gap: "1rem",
  });

  const yesButton = document.createElement("button");
  yesButton.textContent = "Sim";
  Object.assign(yesButton.style, {
    padding: "10px 0px",
    width: "150px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
    backgroundColor: "#dee33e",
    transition: "all 0.1s ease",
    color: "#fff",
  });

  yesButton.addEventListener("mouseenter", () => {
    yesButton.style.backgroundColor = "#c1c638";
  });

  yesButton.addEventListener("mouseout", () => {
    yesButton.style.backgroundColor = "#dee33e";
  });

  yesButton.addEventListener("click", async () => {
    try {
      const res = await fetch("/api/staff/remove", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ staffId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Falha Desconhecida");
      }

      const responseData = await res.json();

      MessageNotification(responseData.message, "#28a745");
      if (onSave) onSave();
    } catch (err) {
      MessageNotification(err.message, "#ff6347");
    } finally {
      div.remove();
    }
  });

  const noButton = document.createElement("button");
  noButton.textContent = "Não";
  Object.assign(noButton.style, {
    padding: "10px 0px",
    width: "150px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
    backgroundColor: "#dc3545",
    transition: "all 0.1s ease",
    color: "#fff",
  });

  noButton.addEventListener("mouseenter", () => {
    noButton.style.backgroundColor = "#c82333";
  });

  noButton.addEventListener("mouseout", () => {
    noButton.style.backgroundColor = "#dc3545";
  });

  noButton.addEventListener("click", () => {
    div.remove();
  });

  buttonsContainer.appendChild(yesButton);
  buttonsContainer.appendChild(noButton);
  modalContent.appendChild(buttonsContainer);

  div.appendChild(modalContent);

  // Fechar clicando fora do modal
  div.addEventListener("click", (e) => {
    if (e.target === div) {
      div.remove();
    }
  });

  return div;
}