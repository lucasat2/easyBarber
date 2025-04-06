import { AppointmentCard } from "./AppointmentCard.js";
import { BlockedCard } from "./BlockedCard.js";
import { FinishedCard } from "./FinishedCard.js";

function DailyAppointmentsModal(date, appointmentsData) {
  const containerModal = document.createElement("div");
  containerModal.id = "dailyAppointmentsModal";
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
  modalContent.style.rowGap = "10px";
  modalContent.style.position = "relative";
  modalContent.style.overflow = "hidden";
  modalContent.style.paddingBottom = "40px";
  containerModal.appendChild(modalContent);

  const modalHeader = document.createElement("div");
  modalHeader.style.padding = "20px 0";
  modalHeader.style.position = "relative";
  modalContent.appendChild(modalHeader);

  const modalBody = document.createElement("div");
  modalBody.style.display = "flex";
  modalBody.style.flexDirection = "column";
  modalBody.style.rowGap = "10px";
  modalBody.style.justifyContent = "center";
  modalBody.style.alignItems = "center";
  modalContent.appendChild(modalBody);

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
  modalHeader.appendChild(closeButton);

  let isValid = false;

  let appointmentsCount = 0;

  if (appointmentsData.length !== 0) {
    appointmentsData.forEach((appointmentData) => {
      appointmentsCount++;

      if (appointmentData.status === "BLOQUEADO") {
        modalContent.style.width = "fit-content";
        modalContent.style.padding = "0px 20px 30px 20px";

        modalBody.style.justifyContent = "flex-start";
        modalBody.style.alignItems = "stretch";
        modalBody.style.maxHeight = "550px";
        modalBody.style.minWidth = "1000px";

        closeButton.style.right = "-8px";

        modalBody.style.overflowY = "auto";

        const appointmentCard = BlockedCard(date, appointmentData);
        modalBody.appendChild(appointmentCard);

        isValid = true;
      } else if (appointmentData.status === "AGENDADO") {
        modalContent.style.width = "fit-content";
        modalContent.style.padding = "0px 20px 30px 20px";

        modalBody.style.justifyContent = "flex-start";
        modalBody.style.alignItems = "stretch";
        modalBody.style.maxHeight = "550px";
        modalBody.style.minWidth = "1000px";

        closeButton.style.right = "-8px";

        modalBody.style.overflowY = "auto";

        const appointmentCard = AppointmentCard(date, appointmentData);
        modalBody.appendChild(appointmentCard);

        isValid = true;
      } else if (appointmentData.status === "CONCLUÍDO") {
        modalContent.style.width = "fit-content";
        modalContent.style.padding = "0px 20px 30px 20px";

        modalBody.style.justifyContent = "flex-start";
        modalBody.style.alignItems = "stretch";
        modalBody.style.maxHeight = "550px";
        modalBody.style.minWidth = "1000px";

        closeButton.style.right = "-8px";

        modalBody.style.overflowY = "auto";

        const appointmentCard = FinishedCard(date, appointmentData);
        modalBody.appendChild(appointmentCard);

        isValid = true;
      }

      if (isValid === false && appointmentsCount === appointmentsData.length) {
        const modalImage = document.createElement("div");
        modalImage.style.backgroundImage = `url("../../../assets/schedulingTimelinePage/initialSchedullingTimelineIcon.svg")`;
        modalImage.style.width = "100px";
        modalImage.style.height = "100px";
        modalImage.style.backgroundRepeat = "no-repeat";
        modalImage.style.backgroundPosition = "center";
        modalImage.style.backgroundSize = "cover";
        modalBody.appendChild(modalImage);

        const modalText = document.createElement("div");
        modalText.innerText = "SEM AGENDAMENTOS";
        modalText.style.color = "#9fa324";
        modalBody.style.fontSize = "25px";
        modalBody.appendChild(modalText);

        return containerModal;
      }
    });

    return containerModal;
  }

  const modalImage = document.createElement("div");
  modalImage.style.backgroundImage = `url("../../../assets/schedulingTimelinePage/initialSchedullingTimelineIcon.svg")`;
  modalImage.style.width = "100px";
  modalImage.style.height = "100px";
  modalImage.style.backgroundRepeat = "no-repeat";
  modalImage.style.backgroundPosition = "center";
  modalImage.style.backgroundSize = "cover";
  modalBody.appendChild(modalImage);

  const modalText = document.createElement("div");
  modalText.innerText = "SEM AGENDAMENTOS";
  modalText.style.color = "#9fa324";
  modalBody.style.fontSize = "25px";
  modalBody.appendChild(modalText);

  return containerModal;
}

export { DailyAppointmentsModal };

// const test = [
//   {
//     id: "11111111-1111-1111-1111-111111111111",
//     client: "João Silva",
//     staff: "Carlos Mendes",
//     service: "Corte Masculino",
//     date_hour_begin: "2025-04-10T10:00:00",
//     date_hour_end: "2025-04-10T11:00:00",
//     status: "BLOQUEADO",
//     observation: "Horário reservado para manutenção",
//     created_at: "2025-04-01T08:00:00",
//     updated_at: "2025-04-01T08:00:00",
//   },
//   {
//     id: "55555555-5555-5555-5555-555555555555",
//     client: "Roberto Oliveira",
//     staff: "Fernanda Souza",
//     service: "Barba Completa",
//     date_hour_begin: "2025-04-12T14:00:00",
//     date_hour_end: "2025-04-12T15:00:00",
//     status: "BLOQUEADO",
//     observation: "Funcionário indisponível nesse horário",
//     created_at: "2025-04-01T08:30:00",
//     updated_at: "2025-04-01T08:30:00",
//   },
//   {
//     id: "99999999-9999-9999-9999-999999999999",
//     client: "Carlos Pereira",
//     staff: "Ana Martins",
//     service: "Corte + Barba",
//     date_hour_begin: "2025-04-15T09:00:00",
//     date_hour_end: "2025-04-15T10:00:00",
//     status: "CONCLUÍDO",
//     observation: "Cliente pediu estilo degradê",
//     created_at: "2025-04-01T09:00:00",
//     updated_at: "2025-04-01T09:00:00",
//   },
//   {
//     id: "13131313-1313-1313-1313-131313131313",
//     client: "Lucas Almeida",
//     staff: "Ricardo Lima",
//     service: "Hidratação Capilar",
//     date_hour_begin: "2025-04-18T16:00:00",
//     date_hour_end: "2025-04-18T17:00:00",
//     status: "CANCELADO",
//     observation: "Cancelado pelo cliente",
//     created_at: "2025-04-01T09:30:00",
//     updated_at: "2025-04-01T09:30:00",
//   },
//   {
//     id: "17171717-1717-1717-1717-171717171717",
//     client: "Fernando Souza",
//     staff: "Beatriz Rocha",
//     service: "Corte Infantil",
//     date_hour_begin: "2025-04-20T11:00:00",
//     date_hour_end: "2025-04-20T12:00:00",
//     status: "AGENDADO",
//     observation: "Aguardando confirmação do funcionário",
//     created_at: "2025-04-01T10:00:00",
//     updated_at: "2025-04-01T10:00:00",
//   },
// ];

// document.body.appendChild(DailyAppointmentsModal(test));

// document.body.appendChild(DailyAppointmentsModal([]));