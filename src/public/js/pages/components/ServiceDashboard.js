import { MessageNotification } from "./MessageNotification.js";

function ServiceDashboard() {
  const mainContainer = document.createElement("div");

  const registerStaffButton = document.createElement("button");
  mainContainer.appendChild("registerStaffButton");

  const servicesTable = document.createElement("table");
  mainContainer.appendChild("servicesTable");

  const tableHeaderRow = document.createElement("tr");
  servicesTable.appendChild(tableHeaderRow);

  const columnsNameArray = ["Tipo de serviço", "Editar", "Deletar"];

  for (let i = 0; i < columnsNameArray.length; i++) {
    const tableHeaderColumn = document.createElement("th");
    tableHeaderRow.innerText = columnsNameArray[i];
    tableHeaderRow.appendChild(tableHeaderColumn);
  }

  fetch("/api/services")
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.error || "Falha desconhecida");
        });
      }

      return response.json();
    })
    .then((data) => {
      for (let j = 0; j < data.length; j++) {
        const tableBodyRow = document.createElement("tr");
        servicesTable.appendChild(tableBodyRow);

        for (let k = 0; k < 3; k++) {
          if (k === 0) {
            const tableBodyColumn = document.createElement("td");
            tableBodyColumn.innerText = data[j].name;
            tableBodyRow.appendChild(tableBodyColumn);
          } else if (k === 1) {
            const tableBodyColumn = document.createElement("td");
            tableBodyRow.appendChild(tableBodyColumn);

            const editButton = document.createElement("div");
            tableBodyColumn.appendChild(editButton);
          } else {
            const tableBodyColumn = document.createElement("td");
            tableBodyRow.appendChild(tableBodyColumn);

            const deleteButton = document.createElement("div");
            tableBodyColumn.appendChild(deleteButton);
          }
        }
      }
    })
    .catch((error) => {
      MessageNotification(error.message, "#ff6347");
    });

  return mainContainer;
}

export { ServiceDashboard };