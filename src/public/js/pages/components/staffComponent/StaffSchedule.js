import { MessageNotification } from "../MessageNotification.js";

export default async function StaffShiftEditor(staffId) {
  const weekDays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const shifts = weekDays.map((dia, i) => ({
    [`weekDay${i + 1}`]: dia,
    [`firstShiftStartTime${i + 1}`]: "09:00",
    [`firstShiftEndTime${i + 1}`]: "12:00",
    [`firstShiftStatus${i + 1}`]: i === 0 ? false : true,
    [`secondShiftStartTime${i + 1}`]: "13:00",
    [`secondShiftEndTime${i + 1}`]: "18:00",
    [`secondShiftStatus${i + 1}`]: i === 0 || i === 6 ? false : true,
  }));

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

  const modal = document.createElement("div");
  Object.assign(modal.style, {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    minWidth: "500px",
    maxHeight: "85vh",
    overflowY: "auto",
    position: "relative",
  });

  const title = document.createElement("h2");
  title.textContent = "Editar Turnos de Trabalho";
  title.style.marginBottom = "1rem";
  modal.appendChild(title);

  const tabWrapper = document.createElement("div");
  tabWrapper.style.display = "flex";
  tabWrapper.style.border = "1px solid #ccc";
  tabWrapper.style.borderRadius = "6px";
  tabWrapper.style.backgroundColor = "#f0f0f0";
  tabWrapper.style.width = "fit-content";

  const tabContainer = document.createElement("div");
  tabContainer.style.display = "flex";
  tabContainer.style.gap = "0";

  const shift1Tab = document.createElement("button");
  shift1Tab.textContent = "Turno 1";

  const shift2Tab = document.createElement("button");
  shift2Tab.textContent = "Turno 2";

  [shift1Tab, shift2Tab].forEach((btn) => {
    Object.assign(btn.style, {
      padding: "0.5rem 1rem",
      cursor: "pointer",
      border: "none",
      background: "transparent",
      transition: "background-color 0.2s",
      fontWeight: "bold",
    });
  });

  tabContainer.append(shift1Tab, shift2Tab);
  tabWrapper.appendChild(tabContainer);
  modal.appendChild(tabWrapper);

  const shift1Container = document.createElement("div");
  const shift2Container = document.createElement("div");

  [shift1Container, shift2Container].forEach((container) => {
    container.style.display = "none";
    container.style.flexDirection = "column";
    container.style.gap = "0.5rem";
    modal.appendChild(container);
  });

  const toggleTab = (index) => {
    shift1Container.style.display = index === 0 ? "flex" : "none";
    shift2Container.style.display = index === 1 ? "flex" : "none";

    if (index === 0) {
      shift1Tab.style.backgroundColor = "#dee33e";
      shift2Tab.style.backgroundColor = "#f0f0f0";
    } else {
      shift2Tab.style.backgroundColor = "#dee33e";
      shift1Tab.style.backgroundColor = "#f0f0f0";
    }
  };

  toggleTab(0);
  shift1Tab.onclick = () => toggleTab(0);
  shift2Tab.onclick = () => toggleTab(1);

  function createShiftHeader() {
    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.alignItems = "center";
    header.style.justifyContent = "space-between";
    header.style.gap = "0.5rem";
    header.style.fontWeight = "bold";

    const empty = document.createElement("span");
    empty.style.width = "90px";
    const enter = document.createElement("span");
    enter.textContent = "Entrada";
    const exit = document.createElement("span");
    exit.textContent = "Saída";
    const status = document.createElement("span");
    status.textContent = "";
    status.style.width = "30px";

    header.append(empty, enter, exit, status);
    return header;
  }

  function createShiftRow(index, tipo) {
    const prefix = tipo === "first" ? "firstShift" : "secondShift";
    const startKey = `${prefix}StartTime${index + 1}`;
    const endKey = `${prefix}EndTime${index + 1}`;
    const statusKey = `${prefix}Status${index + 1}`;
    const weekDayKey = `weekDay${index + 1}`;

    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.justifyContent = "space-between";
    row.style.gap = "0.5rem";

    const label = document.createElement("span");
    label.textContent = weekDays[index];
    label.style.width = "120px";
    label.style.fontWeight = "bold";

    const inputStyle = {
      width: "fix-content",
      padding: "6px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "1rem",
      outline: "none",
      transition: "border-color 0.2s ease",
      backgroundColor: "#f9f9f9",
    };

    const inputStart = document.createElement("input");
    inputStart.type = "time";
    inputStart.value = shifts[index][startKey];
    Object.assign(inputStart.style, inputStyle);
    inputStart.onfocus = () => (inputStart.style.borderColor = "#dee33e");
    inputStart.onblur = () => (inputStart.style.borderColor = "#ccc");

    const inputEnd = document.createElement("input");
    inputEnd.type = "time";
    inputEnd.value = shifts[index][endKey];
    Object.assign(inputEnd.style, inputStyle);
    inputEnd.onfocus = () => (inputEnd.style.borderColor = "#dee33e");
    inputEnd.onblur = () => (inputEnd.style.borderColor = "#ccc");

    const toggle = document.createElement("button");
    const icon = document.createElement("img");

    const ativo = shifts[index][statusKey];
    icon.src = ativo
      ? "../../assets/staff/check.svg"
      : "../../assets/staff/close.svg";
    toggle.style.backgroundColor = ativo ? "#dee33e" : "#e74c3c";

    inputStart.disabled = !ativo;
    inputEnd.disabled = !ativo;

    icon.alt = "status";
    icon.style.padding = "5px 10px";

    toggle.appendChild(icon);
    Object.assign(toggle.style, {
      backgroundColor: ativo ? "#dee33e" : "#dc3545",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    });

    shifts[index][weekDayKey] = weekDays[index];

    inputStart.addEventListener("input", () => {
      shifts[index][startKey] = inputStart.value;
    });
    inputEnd.addEventListener("input", () => {
      shifts[index][endKey] = inputEnd.value;
    });
    toggle.addEventListener("click", () => {
      const atual = shifts[index][statusKey];
      const novo = !atual;

      shifts[index][statusKey] = novo;
      icon.src = novo
        ? "../../assets/staff/check.svg"
        : "../../assets/staff/close.svg";
      toggle.style.backgroundColor = novo ? "#dee33e" : "#e74c3c";

      inputStart.disabled = !novo;
      inputEnd.disabled = !novo;
    });

    row.append(label, inputStart, inputEnd, toggle);
    return row;
  }

  // Headers
  shift1Container.appendChild(createShiftHeader());
  shift2Container.appendChild(createShiftHeader());

  for (let i = 0; i < weekDays.length; i++) {
    shift1Container.appendChild(createShiftRow(i, "first"));
    shift2Container.appendChild(createShiftRow(i, "second"));
  }

  const btnContainer = document.createElement("div");
  btnContainer.style.display = "flex";
  btnContainer.style.gap = "1rem";

  const cancel = document.createElement("button");
  cancel.textContent = "Cancelar";
  Object.assign(cancel.style, {
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

  cancel.addEventListener("mouseenter", () => {
    cancel.style.backgroundColor = "#c82333";
  });

  cancel.addEventListener("mouseout", () => {
    cancel.style.backgroundColor = "#dc3545";
  });

  cancel.onclick = () => div.remove();

  const save = document.createElement("button");
  save.textContent = "Salvar";
  Object.assign(save.style, {
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

  save.addEventListener("mouseenter", () => {
    save.style.backgroundColor = "#c1c638";
  });

  save.addEventListener("mouseout", () => {
    save.style.backgroundColor = "#dee33e";
  });

  save.onclick = async () => {
    const payload = { staffId };
    shifts.forEach((shift) => Object.assign(payload, shift));

    try {
      const res = await fetch("/api/staff/associateShifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Falha Desconhecida");
      }

      const responseData = await res.json();

      MessageNotification(responseData.message, "#28a745");
    } catch (e) {
      MessageNotification(e.message, "#ff6347");
    } finally {
      div.remove();
    }
  };

  btnContainer.append(save, cancel);
  modal.appendChild(btnContainer);

  div.onclick = (e) => {
    if (e.target === div) div.remove();
  };

  div.appendChild(modal);
  return div;
}