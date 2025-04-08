import StaffInformation from "./StaffInformation.js";
import StaffShiftEditor from "./StaffSchedule.js";
import StaffServicesSelection from "./StaffServicesSelection.js";
import StaffDelete from "./StaffDelete.js";

export default async function StaffManager() {
  const mainContainer = document.createElement("div");
  mainContainer.style.display = "flex";
  mainContainer.style.flexDirection = "column";
  mainContainer.style.height = "100%";
  mainContainer.style.padding = "15px 50px";

  // Botão de cadastro
  const createButton = document.createElement("button");
  createButton.textContent = "Cadastrar um novo funcionário";
  Object.assign(createButton.style, {
    width: "fit-content",
    padding: "10px 30px",
    borderRadius: "5px",
    border: "none",
    fontSize: "16px",
    backgroundColor: "#9fa324",
    color: "#fff",
    transition: "all 0.1s ease",
    cursor: "pointer",
  });

  createButton.addEventListener("mouseenter", () => {
    createButton.style.backgroundColor = "transparent";
    createButton.style.color = "#9fa324";
    createButton.style.border = "1px solid #9fa324";
  });

  createButton.addEventListener("mouseleave", () => {
    createButton.style.backgroundColor = "#9fa324";
    createButton.style.color = "#fff";
  });

  // Evento ainda vazio
  createButton.addEventListener("click", async () => {
    const root = document.getElementById("root");
    const section = await StaffInformation({}, loadStaff);

    root.appendChild(section);
  });

  mainContainer.appendChild(createButton);

  // Lista de funcionários
  const staffList = document.createElement("div");
  staffList.style.display = "flex";
  staffList.style.flexDirection = "column";
  staffList.style.height = "100%";

  mainContainer.appendChild(staffList);

  // Função para criar um item de funcionário
  function createStaffItem({ id, name, surname }) {
    const item = document.createElement("div");
    Object.assign(item.style, {
      display: "flex",
      padding: "20px",
      marginTop: "15px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      alignItems: "center",
      flexWrap: "wrap",
    });

    const nameDiv = document.createElement("div");
    nameDiv.textContent = `${name} ${surname}`;
    nameDiv.style.fontWeight = "bold";
    nameDiv.style.flex = "1";

    const buttonGroup = document.createElement("div");
    buttonGroup.style.display = "flex";
    buttonGroup.style.gap = "0.5rem";

    ["Horários", "Serviços", "Editar", "Deletar"].forEach((label) => {
      const btn = document.createElement("button");
      btn.textContent = label;

      const isDelete = label === "Deletar";

      const isEdit = label === "Editar";

      Object.assign(btn.style, {
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        fontSize: "16px",
        color: "#fff",
        transition: "all 0.1s ease",
      });

      if (!isEdit && !isDelete) {
        btn.style.padding = "10px 0px";
        btn.style.width = "150px";
        btn.style.backgroundColor = "#DEE33E";

        btn.addEventListener("mouseenter", () => {
          btn.style.backgroundColor = "#c1c638";
        });

        btn.addEventListener("mouseout", () => {
          btn.style.backgroundColor = "#DEE33E";
        });
      }

      if (isEdit) {
        btn.style.padding = "7px 15px";
        btn.style.backgroundColor = "#A6A6A6";

        const editIcon = document.createElement("img");

        // Use the absolute path here:
        editIcon.src = "../../assets/staff/edit.svg";
        editIcon.alt = "Editar";
        editIcon.style.width = "20px";
        editIcon.style.height = "20px";
        editIcon.style.pointerEvents = "none";

        btn.textContent = "";
        btn.appendChild(editIcon);

        btn.addEventListener("mouseenter", () => {
          btn.style.backgroundColor = "#7F7F7F";
        });

        btn.addEventListener("mouseout", () => {
          btn.style.backgroundColor = "#A6A6A6";
        });
      }

      if (isDelete) {
        btn.style.padding = "7px 15px";
        btn.style.backgroundColor = "#dc3545";

        const deleteIcon = document.createElement("img");

        // Use the absolute path here:
        deleteIcon.src = "../../assets/staff/delete.svg";
        deleteIcon.alt = "Deletar";
        deleteIcon.style.width = "20px";
        deleteIcon.style.height = "20px";
        deleteIcon.style.pointerEvents = "none";

        btn.textContent = "";
        btn.appendChild(deleteIcon);

        btn.addEventListener("mouseenter", () => {
          btn.style.backgroundColor = "#c82333";
        });

        btn.addEventListener("mouseout", () => {
          btn.style.backgroundColor = "#dc3545";
        });
      }

      btn.addEventListener("click", async () => {
        switch (label) {
          case "Editar":
            try {
              const res = await fetch(`/api/staff/${id}`);

              if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Falha Desconhecida");
              }

              const data = await res.json();

              const modal = await StaffInformation(data, loadStaff);

              const root = document.getElementById("root");

              root.appendChild(modal);
            } catch (err) {
              MessageNotification(err.message, "#ff6347");
            }
            break;

          case "Horários":
            try {
              const modal = await StaffShiftEditor(id);

              const root = document.getElementById("root");

              root.appendChild(modal);
            } catch (err) {
              console.error("Erro ao carregar funcionário:", err);
              alert("Erro ao carregar os dados do funcionário.");
            }
            break;

          case "Serviços":
            try {
              const modal = await StaffServicesSelection(id);

              const root = document.getElementById("root");

              root.appendChild(modal);
            } catch (err) {
              console.error("Erro ao carregar serviço:", err);
              alert("Erro ao carregar os dados do serviço.");
            }
            break;

          case "Deletar":
            try {
              const modal = await StaffDelete(id, loadStaff);

              const root = document.getElementById("root");

              root.appendChild(modal);
            } catch (err) {
              console.error("Erro ao carregar deletar:", err);
              alert("Erro ao deletar.");
            }
            break;
        }
      });

      buttonGroup.appendChild(btn);
    });

    item.appendChild(nameDiv);
    item.appendChild(buttonGroup);

    return item;
  }

  // Carrega os funcionários
  async function loadStaff() {
    try {
      const res = await fetch("/api/staff");
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Falha Desconhecida");
      }

      const data = await res.json();
      staffList.innerHTML = "";

      if (data.response.length === 0) {
        mainContainer.style.backgroundColor = "#fff";

        const div = document.createElement("div");
        Object.assign(div.style, {
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "50px",
          color: "#9fa324",
          height: "100%",
        });

        const svg = document.createElement("img");
        svg.src = "../../assets/staff/person_cancel.svg";
        svg.style.width = "100px";
        svg.style.height = "100px";

        div.appendChild(svg);

        const message = document.createElement("p");
        message.innerHTML = "Nenhum funcionário cadastrado";

        div.appendChild(message);
        staffList.appendChild(div);
        return;
      }

      mainContainer.style.backgroundColor = "transparent";

      data.response.forEach((staff) => {
        const staffItem = createStaffItem(staff);
        staffList.appendChild(staffItem);
      });
    } catch (err) {
      console.error("Erro ao buscar funcionários", err);
      MessageNotification(err.message, "#ff6347");
    }
  }

  loadStaff();

  return mainContainer;
}