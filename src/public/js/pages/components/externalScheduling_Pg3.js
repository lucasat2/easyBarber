

// Dados da aplicação
const appData = {
  barbers: [
    { id: 1, name: "Wanessa Camargo", image: "/placeholder.svg?height=80&width=80" },
    { id: 2, name: "Wanessa Camargo", image: "/placeholder.svg?height=80&width=80" },
    { id: 3, name: "Wanessa Camargo", image: "/placeholder.svg?height=80&width=80" },
    { id: 4, name: "Wanessa Camargo", image: "/placeholder.svg?height=80&width=80" },
  ],
  serviceInfo: {
    name: "Corte básico",
    duration: "30 min",
    price: "R$ 35",
  },
  currentMonth: "Março, 2025",
  weekDays: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
  // Dias do mês de março de 2025
  daysInMonth: [
    { day: 28, month: "prev" },
    { day: 29, month: "prev" },
    { day: 30, month: "prev" },
    { day: 31, month: "prev" },
    { day: 1, month: "current" },
    { day: 2, month: "current" },
    { day: 3, month: "current", highlight: true },
    { day: 4, month: "current" },
    { day: 5, month: "current" },
    { day: 6, month: "current" },
    { day: 7, month: "current", highlight: true },
    { day: 8, month: "current" },
    { day: 9, month: "current" },
    { day: 10, month: "current", highlight: true },
    { day: 11, month: "current" },
    { day: 12, month: "current" },
    { day: 13, month: "current" },
    { day: 14, month: "current" },
    { day: 15, month: "current" },
    { day: 16, month: "current" },
    { day: 17, month: "current", highlight: true },
    { day: 18, month: "current" },
    { day: 19, month: "current" },
    { day: 20, month: "current" },
    { day: 21, month: "current" },
    { day: 22, month: "current" },
    { day: 23, month: "current" },
    { day: 24, month: "current", highlight: true },
    { day: 25, month: "current" },
    { day: 26, month: "current" },
    { day: 27, month: "current" },
    { day: 28, month: "current" },
    { day: 29, month: "current" },
    { day: 30, month: "current" },
    { day: 31, month: "current", highlight: true },
    { day: 1, month: "next" },
    { day: 2, month: "next" },
    { day: 3, month: "next" },
    { day: 4, month: "next" },
    { day: 5, month: "next" },
    { day: 6, month: "next" },
    { day: 7, month: "next" },
  ],
  timeSlots: [
    ["08h00", "08h15", "08h30", "08h45"],
    ["07h00", "07h15", "07h30", "07h45"],
    ["09h00", "09h15", "09h30", "09h45"],
    ["10h00", "10h15", "10h30", "10h45"],
    ["11h00", "11h15", "11h30", "11h45"],
    ["12h00", "12h15", "12h30", "12h45"],
  ],
}

// Estado da aplicação
const appState = {
  selectedBarber: 0,
  selectedDate: 3,
  selectedTime: "07h30",
}

// Componente Header
const createHeader = () => {
  const header = document.createElement("div")
  header.className = "externalSchedule_Pg3-header"

  header.innerHTML = `
    <div class="externalSchedule_Pg3-logo">
      <img src="/placeholder.svg?height=60&width=30" alt="Barbershop Logo" />
      <div class="externalSchedule_Pg3-barbershop-name">
        <h1>Barbearia Urbana</h1>
      </div>
    </div>
  `

  return header
}

// Componente ServiceInfo
const createServiceInfo = (serviceInfo) => {
  const serviceInfoElement = document.createElement("div")
  serviceInfoElement.className = "externalSchedule_Pg3-service-info"

  serviceInfoElement.innerHTML = `
    <div class="externalSchedule_Pg3-service-image">
      <img src="/placeholder.svg?height=100&width=180" alt="Corte de cabelo" />
    </div>
    <div class="externalSchedule_Pg3-service-details">
      <h2>${serviceInfo.name}</h2>
      <div class="externalSchedule_Pg3-service-meta">
        <span class="externalSchedule_Pg3-duration">
          <i class="externalSchedule_Pg3-clock-icon"></i> ${serviceInfo.duration}
        </span>
        <span class="externalSchedule_Pg3-price">
          <i class="externalSchedule_Pg3-price-icon"></i> ${serviceInfo.price}
        </span>
      </div>
    </div>
    <button class="externalSchedule_Pg3-alter-service-btn">Alterar corte</button>
  `

  // Adiciona evento ao botão
  serviceInfoElement.querySelector(".externalSchedule_Pg3-alter-service-btn").addEventListener("click", () => {
    console.log("Alterar corte clicado")
  })

  return serviceInfoElement
}

// Componente BarberSelector
const createBarberSelector = (barbers) => {
  const barberSelector = document.createElement("div");
  barberSelector.className = "externalSchedule_Pg3-barber-selector";

  // Botão anterior
  const prevButton = document.createElement("button");
  prevButton.className = "externalSchedule_Pg3-nav-button externalSchedule_Pg3-prev";
  prevButton.textContent = "<";

  // Container de barbeiros
  const barbersContainer = document.createElement("div");
  barbersContainer.className = "externalSchedule_Pg3-barbers-container";

  // Botão próximo
  const nextButton = document.createElement("button");
  nextButton.className = "externalSchedule_Pg3-nav-button externalSchedule_Pg3-next";
  nextButton.textContent = ">";

  // Adiciona os eventos de clique às setas
  prevButton.addEventListener("click", () => {
    console.log("Seta anterior clicada");
    // Implementar lógica de navegação para o anterior
  });

  nextButton.addEventListener("click", () => {
    console.log("Seta próxima clicada");
    // Implementar lógica de navegação para o próximo
  });

  // Renderiza os barbeiros
  const renderBarbers = () => {
    barbersContainer.innerHTML = "";

    barbers.forEach((barber, index) => {
      const barberCard = document.createElement("div");
      barberCard.className = `externalSchedule_Pg3-barber-card ${
        index === appState.selectedBarber ? "externalSchedule_Pg3-selected" : ""
      }`;
      barberCard.innerHTML = `
        <img src="${barber.image}" alt="${barber.name}" />
        <p>${barber.name}</p>
      `;

      barberCard.addEventListener("click", () => {
        appState.selectedBarber = index;
        renderBarbers();
      });

      barbersContainer.appendChild(barberCard);
    });
  };

  renderBarbers();

  // Adiciona os elementos ao seletor
  barberSelector.appendChild(prevButton);
  barberSelector.appendChild(barbersContainer);
  barberSelector.appendChild(nextButton);

  return barberSelector;
}

// Componente Calendar
const createCalendar = (currentMonth, weekDays, daysInMonth) => {
  const calendar = document.createElement("div")
  calendar.className = "externalSchedule_Pg3-calendar"

  // Cabeçalho do calendário
  const calendarHeader = document.createElement("div")
  calendarHeader.className = "externalSchedule_Pg3-calendar-header"

  const prevMonthButton = document.createElement("button")
  prevMonthButton.className = "externalSchedule_Pg3-month-nav externalSchedule_Pg3-prev"
  prevMonthButton.textContent = "<"

  const monthTitle = document.createElement("h3")
  monthTitle.textContent = currentMonth

  const nextMonthButton = document.createElement("button")
  nextMonthButton.className = "externalSchedule_Pg3-month-nav externalSchedule_Pg3-next"
  nextMonthButton.textContent = ">"

  calendarHeader.appendChild(prevMonthButton)
  calendarHeader.appendChild(monthTitle)
  calendarHeader.appendChild(nextMonthButton)

  // Dias da semana
  const weekdaysElement = document.createElement("div")
  weekdaysElement.className = "externalSchedule_Pg3-weekdays"

  weekDays.forEach((day) => {
    const weekday = document.createElement("div")
    weekday.className = "externalSchedule_Pg3-weekday"
    weekday.textContent = day
    weekdaysElement.appendChild(weekday)
  })

  // Grade de dias
  const daysGrid = document.createElement("div")
  daysGrid.className = "externalSchedule_Pg3-days-grid"

  const renderDays = () => {
    daysGrid.innerHTML = ""

    daysInMonth.forEach((dayInfo, index) => {
      const dayElement = document.createElement("div")
      dayElement.className = `externalSchedule_Pg3-day externalSchedule_Pg3-${dayInfo.month} ${dayInfo.highlight ? "externalSchedule_Pg3-highlight" : ""} ${appState.selectedDate === dayInfo.day && dayInfo.month === "current" ? "externalSchedule_Pg3-selected" : ""}`
      dayElement.textContent = dayInfo.day

      if (dayInfo.month === "current") {
        dayElement.addEventListener("click", () => {
          appState.selectedDate = dayInfo.day
          renderDays()
        })
      }

      daysGrid.appendChild(dayElement)
    })
  }

  // Adiciona eventos aos botões de navegação
  prevMonthButton.addEventListener("click", () => {
    console.log("Mês anterior")
    // Implementar lógica para mudar para o mês anterior
  })

  nextMonthButton.addEventListener("click", () => {
    console.log("Próximo mês")
    // Implementar lógica para mudar para o próximo mês
  })

  // Renderiza os dias inicialmente
  renderDays()

  // Monta o calendário
  calendar.appendChild(calendarHeader)
  calendar.appendChild(weekdaysElement)
  calendar.appendChild(daysGrid)

  return calendar
}

// Componente TimeSlots
const createTimeSlots = (timeSlots) => {
  const timeSlotsElement = document.createElement("div")
  timeSlotsElement.className = "externalSchedule_Pg3-time-slots"

  const renderTimeSlots = () => {
    timeSlotsElement.innerHTML = ""

    timeSlots.forEach((row, rowIndex) => {
      const timeRow = document.createElement("div")
      timeRow.className = "externalSchedule_Pg3-time-row"

      row.forEach((time) => {
        const timeSlot = document.createElement("button")
        timeSlot.className = `externalSchedule_Pg3-time-slot ${appState.selectedTime === time ? "externalSchedule_Pg3-selected" : ""}`
        timeSlot.textContent = time

        timeSlot.addEventListener("click", () => {
          appState.selectedTime = time
          renderTimeSlots()
        })

        timeRow.appendChild(timeSlot)
      })

      timeSlotsElement.appendChild(timeRow)
    })
  }

  // Renderiza os slots de tempo inicialmente
  renderTimeSlots()

  return timeSlotsElement
}

// Componente ConfirmButton
const createConfirmButton = () => {
  const confirmButton = document.createElement("button")
  confirmButton.className = "externalSchedule_Pg3-confirm-button"
  confirmButton.textContent = "Confirmar"

  confirmButton.addEventListener("click", () => {
    console.log("Agendamento confirmado!")
    console.log(`Barbeiro: ${appData.barbers[appState.selectedBarber].name}`)
    console.log(`Data: ${appState.selectedDate} de Março de 2025`)
    console.log(`Horário: ${appState.selectedTime}`)
  })

  return confirmButton
}

// Componente TopHeader
const createTopHeader = () => {
  const topHeader = document.createElement("div");
  topHeader.className = "externalSchedule_Pg3__header";

  const logo = document.createElement("div");
  logo.className = "externalSchedule_Pg3__logo";

  topHeader.appendChild(logo);

  return topHeader;
};

// Função principal para inicializar a página
export const initSchedulePage = () => {
  // Cria o container principal
  const container = document.createElement("div");
  container.className = "externalSchedule_Pg3-container";

  // Adiciona o TopHeader ao container principal
  container.appendChild(createTopHeader());

  // Cria o conteúdo
  const content = document.createElement("div");
  content.className = "externalSchedule_Pg3-content";
  content.style.marginTop = "80px"; // Adiciona margem para descer o conteúdo abaixo do header

  // Painel esquerdo
  const leftPanel = document.createElement("div");
  leftPanel.className = "externalSchedule_Pg3-left-panel";

  // Painel direito
  const rightPanel = document.createElement("div");
  rightPanel.className = "externalSchedule_Pg3-right-panel";

  // Adiciona os componentes ao painel esquerdo
  leftPanel.appendChild(createHeader());
  leftPanel.appendChild(createServiceInfo(appData.serviceInfo));
  leftPanel.appendChild(createConfirmButton());

  // Adiciona os componentes ao painel direito
  rightPanel.appendChild(createBarberSelector(appData.barbers));
  rightPanel.appendChild(createCalendar(appData.currentMonth, appData.weekDays, appData.daysInMonth));
  rightPanel.appendChild(createTimeSlots(appData.timeSlots));

  // Monta a estrutura da página
  content.appendChild(leftPanel);
  content.appendChild(rightPanel);
  container.appendChild(content);

  // Adiciona ao DOM
  document.body.appendChild(container);
};

