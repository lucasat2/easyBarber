export default function ServiceDetailsModal(serviceDetails) {
  // Create modal overlay
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

  // Close modal when clicking outside
  containerModal.addEventListener("click", (event) => {
    if (event.target === containerModal) {
      containerModal.remove();
    }
  });

  // Create modal content container
  const modalContent = document.createElement("div");
  modalContent.style.width = "500px"; // Reduz ainda mais a largura do modal
  modalContent.style.height = "auto"; // Ajusta a altura automaticamente
  modalContent.style.maxWidth = "80%"; // Ajusta a largura máxima para manter equilíbrio
  modalContent.style.background = "white";
  modalContent.style.borderRadius = "12px";
  modalContent.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
  modalContent.style.display = "flex";
  modalContent.style.flexDirection = "column";
  modalContent.style.position = "relative";
  modalContent.style.overflow = "hidden";
  modalContent.style.paddingBottom = "40px"; // Adiciona mais espaço na parte inferior

  // Create modal header
  const modalHeader = document.createElement("div");
  modalHeader.style.padding = "15px 0";
  modalHeader.style.borderBottom = "1px solid #e0e0e0";
  modalHeader.style.display = "flex";
  modalHeader.style.justifyContent = "center";
  modalHeader.style.position = "relative";

  // Create close button
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

  // Create title
  const title = document.createElement("h2");
  title.innerText = "Detalhes do Serviço";
  title.style.margin = "0";
  title.style.fontSize = "1.5rem";
  title.style.fontWeight = "600";
  title.style.color = "#333";

  // Create modal body with two columns
  const modalBody = document.createElement("div");
  modalBody.style.display = "flex";

  // Create left column for details
  const leftColumn = document.createElement("div");
  leftColumn.style.flex = "1";
  leftColumn.style.display = "flex";
  leftColumn.style.flexDirection = "column";
  leftColumn.style.alignItems = "flex-start"; // Alinha os itens à esquerda
  leftColumn.style.textAlign = "left"; // Garante que o texto fique alinhado à esquerda
  leftColumn.style.paddingRight = "0"; // Remove o espaçamento à direita
  leftColumn.style.paddingLeft = "15px"; // Adiciona espaçamento interno à esquerda

  // Create right column for buttons
  const rightColumn = document.createElement("div");
  rightColumn.style.width = "200px"; // Ajusta a largura da coluna de botões
  rightColumn.style.display = "flex";
  rightColumn.style.flexDirection = "column";
  rightColumn.style.gap = "15px";
  rightColumn.style.padding = "15px";

  // Define fields
  const fields = [
    { label: "Usuário", value: serviceDetails.user || "Sem cadastro", icon: true },
    { label: "Serviço", value: serviceDetails.service },
    { label: "Horário", value: serviceDetails.time },
    { label: "Funcionário", value: serviceDetails.employee },
    { label: "Valor", value: `R$ ${serviceDetails.price}` },
    { label: "Data de cadastro", value: serviceDetails.registrationDate },
  ];

  // Create fields
  fields.forEach((field) => {
    const row = document.createElement("div");
    row.className = "serviceDetailsModalField";
    row.style.display = "flex";
    row.style.justifyContent = "flex-start"; // Alinha os campos à esquerda
    row.style.textAlign = "left"; // Garante alinhamento do texto à esquerda
    row.style.gap = "8px"; // Adiciona um pequeno espaçamento entre o rótulo e o valor
    row.style.marginBottom = "2px"; // Reduz o espaçamento vertical entre os campos

    const label = document.createElement("span");
    label.innerText = `${field.label}:`;
    label.style.fontWeight = "bold";
    label.style.color = "#333";
    label.style.width = "auto"; // Remove largura fixa para permitir flexibilidade

    const value = document.createElement("span");
    value.innerText = field.value;
    value.style.color = "#555";

    if (field.icon) {
      const iconContainer = document.createElement("div");
      iconContainer.style.width = "28px"; // Fundo quadrado
      iconContainer.style.height = "28px";
      iconContainer.style.backgroundColor = "#DEE33E"; // Cor do fundo
      iconContainer.style.display = "flex";
      iconContainer.style.justifyContent = "center";
      iconContainer.style.alignItems = "center";
      iconContainer.style.marginLeft = "80px"; // Empurra o ícone ainda mais para a direita

      const icon = document.createElement("img");
      icon.src = "/user-plus.png"; // Caminho para o ícone PNG na raiz
      icon.style.width = "16px"; // Ajusta o tamanho do ícone
      icon.style.height = "16px";

      iconContainer.appendChild(icon);

      // Adiciona o ícone logo após o valor do campo "Usuário"
      if (field.label === "Usuário") {
        value.style.display = "flex"; // Garante que o texto e o ícone fiquem na mesma linha
        value.style.alignItems = "center"; // Alinha verticalmente
        value.appendChild(iconContainer);
      }
    }

    row.appendChild(label);
    row.appendChild(value);
    leftColumn.appendChild(row);
  });

  // Add textarea for "Observações"
  const textareaRow = document.createElement("div");
  textareaRow.style.display = "flex";
  textareaRow.style.alignItems = "center"; // Alinha verticalmente o rótulo e a textarea
  textareaRow.style.justifyContent = "flex-start"; // Alinha o campo de observações à esquerda
  textareaRow.style.textAlign = "left"; // Garante alinhamento do texto à esquerda
  textareaRow.style.marginTop = "0"; // Remove completamente o espaçamento superior para aproximar "Observações" de "Data de cadastro"
  textareaRow.style.paddingLeft = "0"; // Remove o espaçamento extra à esquerda

  const textareaLabel = document.createElement("span");
  textareaLabel.innerText = "Observações:";
  textareaLabel.style.fontWeight = "bold";
  textareaLabel.style.color = "#333";
  textareaLabel.style.width = "100px"; // Reduz a largura do rótulo
  textareaLabel.style.textAlign = "left"; // Alinha o rótulo "Observações" à esquerda
  textareaLabel.style.marginRight = "8px"; // Adiciona espaçamento entre o rótulo e a textarea
  textareaLabel.style.marginBottom = "0"; // Remove qualquer margem inferior do rótulo

  const textarea = document.createElement("textarea");
  textarea.value = serviceDetails.notes || "Cliente preferencial";
  textarea.style.width = "180px"; // Reduz ainda mais a largura da textarea
  textarea.style.minHeight = "30px"; // Define altura menor
  textarea.style.resize = "vertical";
  textarea.style.padding = "8px";
  textarea.style.border = "1px solid #ccc";
  textarea.style.borderRadius = "4px";
  textarea.style.fontFamily = "inherit";

  textareaRow.appendChild(textareaLabel);
  textareaRow.appendChild(textarea);
  leftColumn.appendChild(textareaRow);

  // Create buttons
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

  // Assemble the modal
  modalHeader.appendChild(title);
  modalHeader.appendChild(closeButton);

  modalBody.appendChild(leftColumn);
  modalBody.appendChild(rightColumn);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);

  containerModal.appendChild(modalContent);

  return containerModal;
}