export default function ServiceDetailsModal(serviceDetails) {
  const containerModal = document.createElement("div");
  containerModal.style.zIndex = "100";
  containerModal.style.width = "100%";
  containerModal.style.height = "100vh";
  containerModal.style.position = "fixed";
  containerModal.style.top = "0";
  containerModal.style.left = "0";
  containerModal.style.background = "#000000aa";
  containerModal.style.display = "flex";
  containerModal.style.justifyContent = "center";
  containerModal.style.alignItems = "center";

  containerModal.addEventListener("click", (event) => {
    if (event.target === containerModal) {
      containerModal.remove();
    }
  });

  const modalContent = document.createElement("div");
  modalContent.style.width = "600px";
  modalContent.style.background = "white";
  modalContent.style.borderRadius = "10px";
  modalContent.style.padding = "20px";
  modalContent.style.display = "flex";
  modalContent.style.flexDirection = "column";
  modalContent.style.gap = "10px";
  modalContent.style.position = "relative";

  const closeButton = document.createElement("div");
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.cursor = "pointer";
  closeButton.style.color = "red";
  closeButton.style.fontSize = "20px";
  closeButton.innerHTML = "&#10006;";
  closeButton.addEventListener("click", () => containerModal.remove());
  modalContent.appendChild(closeButton);

  const title = document.createElement("h2");
  title.innerText = "Detalhes do Serviço";
  title.style.textAlign = "center";
  modalContent.appendChild(title);

  const fields = [
    { label: "Usuário", value: serviceDetails.user || "Sem cadastro" },
    { label: "Serviço", value: serviceDetails.service },
    { label: "Horário", value: serviceDetails.time },
    { label: "Funcionário", value: serviceDetails.employee },
    { label: "Valor", value: `R$ ${serviceDetails.price}` },
    { label: "Data de cadastro", value: serviceDetails.registrationDate },
    { label: "Observações", value: serviceDetails.notes || "" },
  ];

  fields.forEach((field) => {
    const fieldContainer = document.createElement("div");
    fieldContainer.style.display = "flex";
    fieldContainer.style.justifyContent = "space-between";
    fieldContainer.style.marginBottom = "10px";

    const label = document.createElement("span");
    label.innerText = `${field.label}:`;
    label.style.fontWeight = "bold";

    const value = document.createElement("span");
    value.innerText = field.value;

    fieldContainer.appendChild(label);
    fieldContainer.appendChild(value);

    if (field.label === "Observações") {
      const textarea = document.createElement("textarea");
      textarea.value = field.value;
      textarea.style.width = "100%";
      textarea.style.height = "50px";
      textarea.style.marginTop = "5px";
      fieldContainer.appendChild(textarea);
    }

    modalContent.appendChild(fieldContainer);
  });

  const buttons = [
    { text: "Alterar", color: "#DEE33E" },
    { text: "Ausência", color: "#EB4335" },
    { text: "Cancelado", color: "#D3D3D3" },
    { text: "Realizado/Pago", color: "#32CD32" },
  ];

  buttons.forEach((button) => {
    const btn = document.createElement("button");
    btn.innerText = button.text;
    btn.style.background = button.color;
    btn.style.color = "black";
    btn.style.border = "none";
    btn.style.borderRadius = "5px";
    btn.style.padding = "10px";
    btn.style.marginTop = "10px";
    btn.style.cursor = "pointer";
    modalContent.appendChild(btn);
  });

  containerModal.appendChild(modalContent);

  return containerModal;
}
