import ServicesPage from "./ServicesPage.js";
import { MessageNotification } from "../MessageNotification.js";
import navigateTo from "./NavigateTo.js";

function createInput(labelText, type, id) {
  const wrapper = document.createElement("div");
  wrapper.style.marginBottom = "15px";

  const label = document.createElement("label");
  label.textContent = labelText;
  label.setAttribute("for", id);
  label.style.display = "block";
  label.style.marginBottom = "5px";

  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.name = id;
  input.style.width = "100%";
  input.style.padding = "8px";
  input.style.border = "1px solid #ccc";
  input.style.borderRadius = "5px";
  input.style.boxSizing = "border-box";

  wrapper.appendChild(label);
  wrapper.appendChild(input);

  return wrapper;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function ConfirmScheduling(obj) {
  const div = document.createElement("div");
  div.style.width = "100%";
  div.style.maxWidth = "1200px";
  div.style.margin = "0 auto";
  div.style.padding = "20px";
  div.style.display = "flex";
  div.style.flexWrap = "wrap";
  div.style.gap = "20px";
  div.style.justifyContent = "center";

  const containerCheck = document.createElement("div");
  containerCheck.style.flex = "1";
  containerCheck.style.maxWidth = "500px";
  containerCheck.style.minWidth = "300px";
  containerCheck.style.display = "flex";
  containerCheck.style.flexDirection = "column";
  containerCheck.style.justifyContent = "space-between";

  const pStaff = document.createElement("h3");
  pStaff.innerHTML = `Profissional: ${obj.objStaff.name}`;
  pStaff.style.fontWeight = "bold";
  pStaff.style.textAlign = "center";

  const divDate = document.createElement("div");
  divDate.style.height = "49%";
  divDate.style.display = "flex";
  divDate.style.flexDirection = "column";
  divDate.style.gap = "0.5rem";
  divDate.style.border = "1px solid #ccc";
  divDate.style.borderRadius = "8px";
  divDate.style.backgroundColor = "#fbfbfe";
  divDate.style.textAlign = "start";
  divDate.style.display = "flex";
  divDate.style.flexDirection = "column";
  divDate.style.justifyContent = "center";
  divDate.style.alignItems = "center";
  divDate.style.padding = "1rem";

  const formattedDate = obj.dateDaySelected.split("-").reverse().join("/");

  const dateItem = document.createElement("div");
  dateItem.style.display = "flex";
  dateItem.style.alignItems = "center";
  dateItem.style.gap = "0.5rem";

  const dateIcon = document.createElement("img");
  dateIcon.src = "../assets/externalSchedulingPage/calendar.svg";
  dateIcon.alt = "Ícone de calendário";
  dateIcon.style.width = "24px";

  const dateText = document.createElement("p");
  dateText.textContent = `Data: ${formattedDate}`;
  dateText.style.margin = "0";

  dateItem.appendChild(dateIcon);
  dateItem.appendChild(dateText);

  const timeItem = document.createElement("div");
  timeItem.style.display = "flex";
  timeItem.style.alignItems = "center";
  timeItem.style.gap = "0.5rem";

  const timeSvg = document.createElement("img");
  timeSvg.src = "../assets/externalSchedulingPage/time.svg";
  timeSvg.alt = "Ícone de horário";
  timeSvg.style.width = "24px";

  const timeContent = document.createElement("p");
  timeContent.textContent = `Hora: ${obj.hourSelected}`;
  timeContent.style.margin = "0";

  timeItem.appendChild(timeSvg);
  timeItem.appendChild(timeContent);

  divDate.appendChild(pStaff);
  divDate.appendChild(dateItem);
  divDate.appendChild(timeItem);

  const divService = document.createElement("div");
  divService.style.border = "1px solid #ccc";
  divService.style.height = "49%";
  divService.style.gap = "0.5rem";
  divService.style.borderRadius = "8px";
  divService.style.backgroundColor = "#fbfbfe";
  divService.style.textAlign = "start";
  divService.style.display = "flex";
  divService.style.flexDirection = "column";
  divService.style.justifyContent = "center";
  divService.style.alignItems = "center";

  divService.style.padding = "1rem";

  const nameWrapper = document.createElement("div");
  nameWrapper.style.display = "flex";
  nameWrapper.style.gap = "0.5rem";

  const nameText = document.createElement("h3");
  nameText.textContent = obj.objService.name;
  nameText.style.textAlign = "center";

  nameWrapper.style.display = "flex";
  nameWrapper.style.alignItems = "center";
  nameWrapper.appendChild(nameText);

  const timeWrapper = document.createElement("div");
  timeWrapper.style.display = "flex";
  timeWrapper.style.gap = "0.5rem";

  const timeIcon = document.createElement("img");
  timeIcon.src = "../assets/externalSchedulingPage/hour.svg";
  timeIcon.alt = "Ícone tempo";
  timeIcon.style.width = "24px";

  const timeText = document.createElement("p");
  timeText.textContent = `Tempo: ${obj.objService.time} min`;

  timeWrapper.style.display = "flex";
  timeWrapper.style.alignItems = "center";
  timeWrapper.appendChild(timeIcon);
  timeWrapper.appendChild(timeText);

  const costWrapper = document.createElement("div");
  costWrapper.style.display = "flex";
  costWrapper.style.gap = "0.5rem";

  const costIcon = document.createElement("img");
  costIcon.src = "../assets/externalSchedulingPage/payments.svg";
  costIcon.alt = "Ícone custo";
  costIcon.style.width = "24px";

  const costText = document.createElement("p");
  costText.textContent = `R$ ${obj.objService.cost
    .toString()
    .replace(".", ",")}`;

  costWrapper.style.display = "flex";
  costWrapper.style.alignItems = "center";
  costWrapper.appendChild(costIcon);
  costWrapper.appendChild(costText);

  divService.appendChild(nameWrapper);
  divService.appendChild(timeWrapper);
  divService.appendChild(costWrapper);

  containerCheck.appendChild(divDate);
  containerCheck.appendChild(divService);

  const containerConfirm = document.createElement("div");
  containerConfirm.style.border = "1px solid #ccc";
  containerConfirm.style.borderRadius = "8px";
  containerConfirm.style.padding = "20px";
  containerConfirm.style.backgroundColor = "#fbfbfe";

  containerConfirm.style.flex = "1";
  containerConfirm.style.minWidth = "300px";

  const nameInput = createInput("Nome:", "text", "name");
  const emailInput = createInput("E-mail:", "email", "email");
  const phoneInput = createInput("Celular:", "tel", "phone");

  phoneInput.addEventListener("input", (e) => {
    const input = e.target;
    const selectionStart = input.selectionStart;
    const raw = input.value.replace(/\D/g, "");

    let formatted = "";

    if (raw.length <= 10) {
      formatted = raw.replace(
        /^(\d{0,2})(\d{0,4})(\d{0,4}).*/,
        (_, ddd, p1, p2) => {
          return `${ddd ? "(" + ddd : ""}${ddd && p1 ? ") " + p1 : ""}${
            p2 ? "-" + p2 : ""
          }`;
        }
      );
    } else {
      formatted = raw.replace(
        /^(\d{0,2})(\d{0,5})(\d{0,4}).*/,
        (_, ddd, p1, p2) => {
          return `${ddd ? "(" + ddd : ""}${ddd && p1 ? ") " + p1 : ""}${
            p2 ? "-" + p2 : ""
          }`;
        }
      );
    }

    const oldLength = input.value.length;
    input.value = formatted;
    const newLength = formatted.length;
    const diff = newLength - oldLength;

    input.setSelectionRange(selectionStart + diff, selectionStart + diff);
  });

  const obsWrapper = document.createElement("div");

  const obsLabel = document.createElement("label");
  obsLabel.textContent = "Observação:";
  obsLabel.setAttribute("for", "obs");
  obsLabel.style.display = "block";

  const obsInput = document.createElement("textarea");
  obsInput.id = "obs";
  obsInput.name = "obs";
  obsInput.style.width = "100%";
  obsInput.style.padding = "8px";
  obsInput.style.border = "1px solid #ccc";
  obsInput.style.borderRadius = "5px";
  obsInput.style.height = "80px";
  obsInput.style.boxSizing = "border-box";
  obsInput.style.resize = "none";

  obsWrapper.appendChild(obsLabel);
  obsWrapper.appendChild(obsInput);

  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.justifyContent = "space-between";
  buttonContainer.style.marginTop = "20px";

  const back = document.createElement("div");
  back.innerText = "Voltar";
  back.style.background = "#EB4335";
  back.style.padding = "10px 20px";
  back.style.fontWeight = "700";
  back.style.textAlign = "center";
  back.style.cursor = "pointer";
  back.style.borderRadius = "8px";
  back.style.width = "fit-content";
  back.style.color = "white";

  back.addEventListener("mouseover", () => {
    back.style.background = "#ff3725";
  });

  back.addEventListener("mouseout", () => {
    back.style.background = "#EB4335";
  });

  back.addEventListener("click", () => {
    navigateTo(ServicesPage);
  });

  const buttonConfirm = document.createElement("div");
  buttonConfirm.innerText = "Confirmar";
  buttonConfirm.style.background = "#DEE33E";
  buttonConfirm.style.padding = "10px 20px";
  buttonConfirm.style.fontWeight = "700";
  buttonConfirm.style.textAlign = "center";
  buttonConfirm.style.cursor = "pointer";
  buttonConfirm.style.borderRadius = "8px";
  buttonConfirm.style.width = "fit-content";

  buttonConfirm.addEventListener("mouseover", () => {
    buttonConfirm.style.background = "#ffd700";
  });

  buttonConfirm.addEventListener("mouseout", () => {
    buttonConfirm.style.background = "#DEE33E";
  });

  buttonConfirm.addEventListener("click", () => {
    const nameValue = nameInput.querySelector("input").value.trim();
    const emailValue = emailInput.querySelector("input").value.trim();
    const phoneValue = phoneInput.querySelector("input").value.trim();
    const obsValue = obsInput.value.trim();

    let errors = [];

    if (!nameValue) {
      errors.push("Nome");
    }
    if (!emailValue) {
      errors.push("E-mail");
    } else if (!isValidEmail(emailValue)) {
      errors.push("E-mail inválido");
    }
    if (!phoneValue) {
      errors.push("Celular");
    }

    if (errors.length > 0) {
      MessageNotification(
        `Preencha os campos corretamente: ${errors.join(", ")}.`,
        "#ff6347"
      );
    } else {
      const dataToSend = {
        idCompany: obj.objCompany.idCompany,
        idStaff: obj.objStaff.id,
        idService: obj.objService.id,
        date: obj.dateDaySelected,
        clientName: nameValue,
        clientEmail: emailValue,
        clientPhoneNumber: phoneValue,
        startTime: obj.hourSelected,
        observation: obsValue,
      };

      fetch("/api/customer/company/services/staff/schedule/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              throw new Error(errorData.error || "Falha desconhecida");
            });
          }
          return response.json();
        })
        .then((data) => {
          MessageNotification(data.message, "#28a745");
        })
        .catch((error) => {
          MessageNotification(error.message, "#ff6347");
        });
    }
  });

  containerConfirm.appendChild(nameInput);
  containerConfirm.appendChild(emailInput);
  containerConfirm.appendChild(phoneInput);
  containerConfirm.appendChild(obsWrapper);

  buttonContainer.appendChild(buttonConfirm);
  buttonContainer.appendChild(back);
  containerConfirm.appendChild(buttonContainer);

  div.appendChild(containerCheck);
  div.appendChild(containerConfirm);

  return div;
}