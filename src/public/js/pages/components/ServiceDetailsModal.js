export default function ServiceDetailsModal(serviceDetails) {
  const containerModal = document.createElement("div");
  containerModal.style.zIndex = "100";
  containerModal.style.width = "100%";
  containerModal.style.height = "100vh";
  containerModal.style.position = "fixed";
  containerModal.style.top = "0";
  containerModal.style.left = "0";
  containerModal.style.background = "rgba(0, 0, 0, 0.5)";
  containerModal.style.display = "flex";
  containerModal.style.justifyContent = "center";
  containerModal.style.alignItems = "center";

  containerModal.addEventListener("click", (event) => {
    if (event.target === containerModal) {
      containerModal.remove();
    }
  });

  const modalContent = document.createElement("div");
  modalContent.style.width = "500px";
  modalContent.style.height = "auto";
  modalContent.style.maxWidth = "80%";
  modalContent.style.background = "white";
  modalContent.style.borderRadius = "12px";
  modalContent.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
  modalContent.style.display = "flex";
  modalContent.style.flexDirection = "column";
  modalContent.style.position = "relative";
  modalContent.style.overflow = "hidden";
  modalContent.style.paddingBottom = "40px";

  const modalHeader = document.createElement("div");
  modalHeader.style.padding = "15px 0";
  modalHeader.style.borderBottom = "1px solid #e0e0e0";
  modalHeader.style.display = "flex";
  modalHeader.style.justifyContent = "center";
  modalHeader.style.position = "relative";

  const closeButton = document.createElement("div");
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.cursor = "pointer";
  closeButton.style.width = "32px";
  closeButton.style.height = "32px";
  closeButton.style.borderRadius = "50%";
  closeButton.style.background = "#EB4335";
  closeButton.style.display = "flex";
  closeButton.style.justifyContent = "center";
  closeButton.style.alignItems = "center";
  closeButton.style.color = "white";
  closeButton.style.fontSize = "18px";
  closeButton.style.fontWeight = "bold";
  closeButton.innerHTML = "&#10006;";
  closeButton.addEventListener("click", () => containerModal.remove());

  const title = document.createElement("h2");
  title.innerText = "Detalhes do Serviço";
  title.style.margin = "0";
  title.style.fontSize = "1.5rem";
  title.style.fontWeight = "600";
  title.style.color = "#333";

  const modalBody = document.createElement("div");
  modalBody.style.display = "flex";

  const leftColumn = document.createElement("div");
  leftColumn.style.flex = "1";
  leftColumn.style.display = "flex";
  leftColumn.style.flexDirection = "column";
  leftColumn.style.alignItems = "flex-start";
  leftColumn.style.textAlign = "left";
  leftColumn.style.paddingRight = "0";
  leftColumn.style.paddingLeft = "15px";

  const rightColumn = document.createElement("div");
  rightColumn.style.width = "200px";
  rightColumn.style.display = "flex";
  rightColumn.style.flexDirection = "column";
  rightColumn.style.gap = "15px";
  rightColumn.style.padding = "15px";
  rightColumn.style.flexWrap = "wrap";
  rightColumn.style.justifyContent = "center";

  const fields = [
    { label: "Usuário", value: serviceDetails.user || "Sem cadastro", icon: true },
    { label: "Serviço", value: serviceDetails.service },
    { label: "Horário", value: serviceDetails.time },
    { label: "Funcionário", value: serviceDetails.employee },
    { label: "Valor", value: `R$ ${serviceDetails.price}` },
    { label: "Data de cadastro", value: serviceDetails.registrationDate },
  ];

  fields.forEach((field) => {
    const row = document.createElement("div");
    row.className = "serviceDetailsModalField";
    row.style.display = "flex";
    row.style.justifyContent = "flex-start";
    row.style.textAlign = "left";
    row.style.gap = "8px";
    row.style.marginBottom = "2px";

    const label = document.createElement("span");
    label.innerText = `${field.label}:`;
    label.style.fontWeight = "bold";
    label.style.color = "#333";
    label.style.width = "auto";

    const value = document.createElement("span");
    value.innerText = field.value;
    value.style.color = "#555";

    row.appendChild(label);
    row.appendChild(value);
    leftColumn.appendChild(row);
  });

  const textareaRow = document.createElement("div");
  textareaRow.style.display = "flex";
  textareaRow.style.alignItems = "center";
  textareaRow.style.justifyContent = "flex-start";
  textareaRow.style.textAlign = "left";
  textareaRow.style.marginTop = "-8px";
  textareaRow.style.paddingLeft = "0";

  const textareaLabel = document.createElement("span");
  textareaLabel.innerText = "Observações:";
  textareaLabel.style.fontWeight = "bold";
  textareaLabel.style.color = "#333";
  textareaLabel.style.width = "100px";
  textareaLabel.style.textAlign = "left";
  textareaLabel.style.marginRight = "8px";
  textareaLabel.style.marginBottom = "0";
  textareaLabel.style.position = "relative";
  textareaLabel.style.top = "-12px";

  const textarea = document.createElement("textarea");
  textarea.style.width = "180px";
  textarea.style.minHeight = "30px";
  textarea.style.resize = "vertical";
  textarea.style.padding = "8px";
  textarea.style.border = "1px solid #ccc";
  textarea.style.borderRadius = "4px";
  textarea.style.fontFamily = "inherit";
  textarea.style.marginTop = "8px";

  textareaRow.appendChild(textareaLabel);
  textareaRow.appendChild(textarea);
  leftColumn.appendChild(textareaRow);

  const buttons = [
    { text: "Alterar", color: "#DEE33E", hoverColor: "#c9ce35" },
    { text: "Ausência", color: "#EB4335", hoverColor: "#d63a2d", textColor: "white" },
    { text: "Cancelado", color: "#E0E0E0", hoverColor: "#d0d0d0" },
    { text: "Realizado/Pago", color: "#4CD964", hoverColor: "#42c158", textColor: "white" },
  ];

  buttons.forEach((button) => {
    const btn = document.createElement("button");
    btn.innerText = button.text;
    btn.style.background = button.color;
    btn.style.color = button.textColor || "black";
    btn.style.border = "none";
    btn.style.borderRadius = "8px";
    btn.style.padding = "12px";
    btn.style.fontWeight = "500";
    btn.style.fontSize = "1rem";
    btn.style.cursor = "pointer";
    btn.style.transition = "background-color 0.2s ease";

    btn.addEventListener("mouseover", function () {
      this.style.background = button.hoverColor;
    });

    btn.addEventListener("mouseout", function () {
      this.style.background = button.color;
    });

    rightColumn.appendChild(btn);
  });

  modalHeader.appendChild(title);
  modalHeader.appendChild(closeButton);

  modalBody.appendChild(leftColumn);
  modalBody.appendChild(rightColumn);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);

  containerModal.appendChild(modalContent);

  return containerModal;
}
