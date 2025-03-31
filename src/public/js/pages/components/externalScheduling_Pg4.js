export const initSchedulePage4 = () => {
  // Cria o container principal
  const container = document.createElement("div");
  container.className = "externalSchedule_Pg4-container";

  // Header
  const header = document.createElement("div");
  header.className = "externalSchedule_Pg4__header";
  header.textContent = "Confirme as informações";

  // Painel esquerdo
  const leftPanel = document.createElement("div");
  leftPanel.className = "externalSchedule_Pg4-left-panel";

  const barberImage = document.createElement("img");
  barberImage.src = "/assets/barberImage.png"; // Updated image source
  barberImage.alt = "Barber";


  const serviceInfo = document.createElement("div");
  serviceInfo.className = "externalSchedule_Pg4-service-info";
  serviceInfo.innerHTML = `
  <h2>Corte Premium</h2> <!-- Updated service name -->
  <p>Horário: 08h00</p> <!-- Updated time -->
  <p>Dia: 10/03/2025</p> <!-- Updated date -->
  <div class="externalSchedule_Pg4-service-meta">
    <p>45 min</p> <!-- Updated duration -->
    <p>R$ 50</p> <!-- Updated price -->
  </div>
`;


  leftPanel.appendChild(barberImage);
  leftPanel.appendChild(serviceInfo);

  // Painel direito
  const rightPanel = document.createElement("div");
  rightPanel.className = "externalSchedule_Pg4-right-panel";

  const formTitle = document.createElement("h3");
  formTitle.textContent = "Insira seus dados para confirmar o agendamento";

  const nameInput = document.createElement("input");
  nameInput.className = "externalSchedule_Pg4-input";
  nameInput.placeholder = "Nome Completo";

  const phoneInput = document.createElement("input");
  phoneInput.className = "externalSchedule_Pg4-input";
  phoneInput.placeholder = "Telefone";

  const emailInput = document.createElement("input");
  emailInput.className = "externalSchedule_Pg4-input";
  emailInput.placeholder = "Email (opcional)";

  const confirmButton = document.createElement("button");
  confirmButton.className = "externalSchedule_Pg4-button confirm";
  confirmButton.textContent = "Confirmar";
  confirmButton.onclick = () => {
    alert("Agendamento confirmado!"); // Added confirmation alert
  };


  const backButton = document.createElement("button");
  backButton.className = "externalSchedule_Pg4-button back";
  backButton.textContent = "Voltar";

  rightPanel.appendChild(formTitle);
  rightPanel.appendChild(nameInput);
  rightPanel.appendChild(phoneInput);
  rightPanel.appendChild(emailInput);
  rightPanel.appendChild(confirmButton);
  rightPanel.appendChild(backButton);

  // Adiciona os painéis ao container
  container.appendChild(header);
  container.appendChild(leftPanel);
  container.appendChild(rightPanel);

  // Adiciona ao DOM
  document.body.appendChild(container);
};
