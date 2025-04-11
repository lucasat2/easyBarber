import { MessageNotification } from "../MessageNotification.js";

function EditUserProfileModal() {
  const containerModal = document.createElement("div");
  containerModal.classList.add("editUserProfileModalMainContainer");

  containerModal.addEventListener("click", (event) => {
    if (event.target === containerModal) containerModal.remove();
  });

  const modalContent = document.createElement("div");
  modalContent.classList.add("editUserProfileModalContent");
  containerModal.appendChild(modalContent);

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("editUserProfileModalHeader");
  modalContent.appendChild(modalHeader);

  const closeButton = document.createElement("div");
  closeButton.innerHTML = "&#10006;";
  closeButton.classList.add("editUserProfileModalCloseButton");
  closeButton.addEventListener("click", () => containerModal.remove());
  modalHeader.appendChild(closeButton);

  const modalBody = document.createElement("div");
  modalBody.classList.add("editUserProfileModalBody");
  modalContent.appendChild(modalBody);

  const modalTitle = document.createElement("div");
  modalTitle.innerText = "Editar";
  modalTitle.classList.add("editUserProfileModalTitle");
  modalBody.appendChild(modalTitle);

  const inputs = {};

  const row1 = document.createElement("div");
  row1.classList.add("editUserProfileModalFields");

  const label1 = document.createElement("label");
  label1.classList.add("editUserProfileModalInputWrapper");
  const p1 = document.createElement("p");
  p1.innerText = "Nome da Empresa:";
  const input1 = document.createElement("input");
  input1.placeholder = "Nome da Empresa";
  input1.classList.add("editUserProfileModalInputs");
  inputs.companyName = input1;
  label1.appendChild(p1);
  label1.appendChild(input1);
  row1.appendChild(label1);

  const label2 = document.createElement("label");
  label2.classList.add("editUserProfileModalInputWrapper");
  const p2 = document.createElement("p");
  p2.innerText = "CNPJ:";
  const input2 = document.createElement("input");
  input2.placeholder = "CNPJ";
  input2.classList.add("editUserProfileModalInputs");
  input2.id = "cnpj";
  inputs.cnpj = input2;
  label2.appendChild(p2);
  label2.appendChild(input2);
  row1.appendChild(label2);

  modalBody.appendChild(row1);

  const row2 = document.createElement("div");
  row2.classList.add("editUserProfileModalFields");

  const label3 = document.createElement("label");
  label3.classList.add("editUserProfileModalInputWrapper");
  const p3 = document.createElement("p");
  p3.innerText = "Telefone:";
  const input3 = document.createElement("input");
  input3.placeholder = "Telefone";
  input3.classList.add("editUserProfileModalInputs");
  input3.id = "phoneNumber";
  inputs.phoneNumber = input3;
  label3.appendChild(p3);
  label3.appendChild(input3);
  row2.appendChild(label3);

  const label4 = document.createElement("label");
  label4.classList.add("editUserProfileModalInputWrapper");
  const p4 = document.createElement("p");
  p4.innerText = "Estado:";
  const input4 = document.createElement("input");
  input4.placeholder = "Estado";
  input4.classList.add("editUserProfileModalInputs");
  inputs.state = input4;
  label4.appendChild(p4);
  label4.appendChild(input4);
  row2.appendChild(label4);

  modalBody.appendChild(row2);

  const row3 = document.createElement("div");
  row3.classList.add("editUserProfileModalFields");

  const label5 = document.createElement("label");
  label5.classList.add("editUserProfileModalInputWrapper");
  const p5 = document.createElement("p");
  p5.innerText = "Cidade:";
  const input5 = document.createElement("input");
  input5.placeholder = "Cidade";
  input5.classList.add("editUserProfileModalInputs");
  inputs.city = input5;
  label5.appendChild(p5);
  label5.appendChild(input5);
  row3.appendChild(label5);

  const label6 = document.createElement("label");
  label6.classList.add("editUserProfileModalInputWrapper");
  const p6 = document.createElement("p");
  p6.innerText = "Logradouro:";
  const input6 = document.createElement("input");
  input6.placeholder = "Logradouro";
  input6.classList.add("editUserProfileModalInputs");
  inputs.address = input6;
  label6.appendChild(p6);
  label6.appendChild(input6);
  row3.appendChild(label6);

  modalBody.appendChild(row3);

  const row4 = document.createElement("div");
  row4.classList.add("editUserProfileModalFields");

  const label7 = document.createElement("label");
  label7.classList.add("editUserProfileModalInputWrapper");
  const p7 = document.createElement("p");
  p7.innerText = "Número:";
  const input7 = document.createElement("input");
  input7.placeholder = "Número";
  input7.classList.add("editUserProfileModalInputs");
  inputs.number = input7;
  label7.appendChild(p7);
  label7.appendChild(input7);
  row4.appendChild(label7);

  const label8 = document.createElement("label");
  label8.classList.add("editUserProfileModalInputWrapper");
  const p8 = document.createElement("p");
  p8.innerText = "CEP:";
  const input8 = document.createElement("input");
  input8.placeholder = "CEP";
  input8.classList.add("editUserProfileModalInputs");
  input8.id = "postalCode";
  inputs.postalCode = input8;
  label8.appendChild(p8);
  label8.appendChild(input8);
  row4.appendChild(label8);

  modalBody.appendChild(row4);

  const row5 = document.createElement("div");
  row5.classList.add("editUserProfileModalFields");

  const label9 = document.createElement("label");
  label9.classList.add("editUserProfileModalInputWrapper");
  const p9 = document.createElement("p");
  p9.innerText = "E-mail:";
  const input9 = document.createElement("input");
  input9.placeholder = "E-mail";
  input9.classList.add("editUserProfileModalInputs");
  inputs.email = input9;
  label9.appendChild(p9);
  label9.appendChild(input9);
  row5.appendChild(label9);

  const label10 = document.createElement("label");
  label10.classList.add("editUserProfileModalInputWrapper");
  const p10 = document.createElement("p");
  p10.innerText = "Senha:";
  const input10 = document.createElement("input");
  input10.placeholder = "Senha";
  input10.type = "password";
  input10.classList.add("editUserProfileModalInputs");
  inputs.password = input10;
  label10.appendChild(p10);
  label10.appendChild(input10);
  row5.appendChild(label10);

  modalBody.appendChild(row5);

  function maskCNPJ(value) {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  }

  function maskPhone(value) {
    value = value.replace(/\D/g, "");

    if (value.length <= 10) {
      return value
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .slice(0, 14);
    } else {
      return value
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15);
    }
  }

  function maskPostalCode(value) {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  }

  containerModal.querySelector("#cnpj").addEventListener("input", (e) => {
    e.target.value = maskCNPJ(e.target.value);
  });

  containerModal
    .querySelector("#phoneNumber")
    .addEventListener("input", (e) => {
      e.target.value = maskPhone(e.target.value);
    });

  containerModal.querySelector("#postalCode").addEventListener("input", (e) => {
    e.target.value = maskPostalCode(e.target.value);
  });

  const saveButton = document.createElement("button");
  saveButton.innerText = "Salvar";
  saveButton.classList.add("editUserProfileModalSaveButton");
  saveButton.addEventListener("click", async () => {
    await updateUserData();
  });
  modalBody.appendChild(saveButton);

  async function updateUserData() {
    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inputs.companyName.value,
          cnpj: inputs.cnpj.value,
          phoneNumber: inputs.phoneNumber.value,
          state: inputs.state.value,
          city: inputs.city.value,
          street: inputs.address.value,
          number: inputs.number.value,
          postalCode: inputs.postalCode.value,
          email: inputs.email.value,
          password: inputs.password.value,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha Desconhecida");
      }

      const data = await response.json();
      MessageNotification(data.message, "#28a745");

      const profileUpdate = await fetch("/api/users/company");
      if (!profileUpdate.ok) {
        throw new Error("Falha ao atualizar o nome da empresa no topo");
      }

      const result = await profileUpdate.json();
      document.getElementById("username").innerText = result.name;

      containerModal.remove();
    } catch (error) {
      MessageNotification(error.message, "#ff6347");
    }
  }

  async function getInfo() {
    try {
      const response = await fetch("/api/users/company/info");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha Desconhecida");
      }

      const data = await response.json();
      inputs.companyName.value = data.name || "";
      inputs.cnpj.value = data.cnpj || "";
      inputs.phoneNumber.value = data.phoneNumber || "";
      inputs.state.value = data.state || "";
      inputs.city.value = data.city || "";
      inputs.address.value = data.street || "";
      inputs.number.value = data.number || "";
      inputs.postalCode.value = data.postalCode || "";
      inputs.email.value = data.email || "";
      inputs.password.value = "";
    } catch (error) {
      MessageNotification(error.message, "#ff6347");
    }
  }

  getInfo();
  document.body.appendChild(containerModal);
}

export { EditUserProfileModal };