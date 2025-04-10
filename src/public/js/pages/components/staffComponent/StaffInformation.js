import { MessageNotification } from "../MessageNotification.js";

export default async function StaffInformation(data, onSave) {
  const staff = data;

  const id = staff?.id || "";
  const name = staff?.name || "";
  const surname = staff?.surname || "";
  const cpf = staff?.cpf || "";
  const email = staff?.email || "";
  const phone = staff?.phone_number || "";
  const birthdate = staff?.birthdate ? staff.birthdate.split("T")[0] : "";
  const postalCode = staff?.postal_code || "";

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

  const modalContent = document.createElement("div");
  Object.assign(modalContent.style, {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "500px",
    position: "relative",
  });

  const form = document.createElement("form");
  Object.assign(form.style, {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  });

  const inputElements = {};

  function applyMask(input, type) {
    input.addEventListener("input", () => {
      let value = input.value.replace(/\D/g, "");
      let masked = "";

      if (type === "cpf") {
        value = value.slice(0, 11);
        if (value.length <= 3) masked = value;
        else if (value.length <= 6)
          masked = `${value.slice(0, 3)}.${value.slice(3)}`;
        else if (value.length <= 9)
          masked = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(
            6
          )}`;
        else
          masked = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(
            6,
            9
          )}-${value.slice(9)}`;
      }

      if (type === "cep") {
        value = value.slice(0, 8);
        if (value.length <= 5) masked = value;
        else masked = `${value.slice(0, 5)}-${value.slice(5)}`;
      }

      if (type === "phone") {
        value = value.slice(0, 11);
        if (value.length < 3) {
          masked = value;
        } else if (value.length < 7) {
          masked = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length <= 10) {
          masked = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(
            6
          )}`;
        } else {
          masked = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(
            7
          )}`;
        }
      }

      input.value = masked;
    });
  }

  function createField(labelText, value, name, type = "text") {
    const label = document.createElement("label");
    label.style.display = "flex";
    label.style.flexDirection = "column";
    label.style.gap = "0.25rem";
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.value = value;
    input.style.padding = "0.5rem";
    input.style.border = "1px solid #ccc";
    input.style.borderRadius = "4px";

    if (name === "cpf") applyMask(input, "cpf");
    if (name === "phoneNumber") applyMask(input, "phone");
    if (name === "postalCode") applyMask(input, "cep");

    inputElements[name] = input;
    label.appendChild(input);
    form.appendChild(label);
  }

  createField("Nome", name, "name");
  createField("Sobrenome", surname, "surname");
  createField("CPF", cpf, "cpf");
  createField("Email", email, "email");
  createField("Telefone", phone, "phoneNumber");
  createField("Data de nascimento", birthdate, "birthdate", "date");
  createField("CEP", postalCode, "postalCode");

  const errorDiv = document.createElement("div");
  errorDiv.style.color = "red";
  errorDiv.style.fontSize = "0.9rem";
  errorDiv.style.marginTop = "-0.5rem";
  form.appendChild(errorDiv);

  const saveButton = document.createElement("button");
  let labelBtn = "Criar";
  if (id) {
    labelBtn = "Salvar";
  }
  saveButton.textContent = labelBtn;

  saveButton.type = "submit";
  Object.assign(saveButton.style, {
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

  saveButton.addEventListener("mouseenter", () => {
    saveButton.style.backgroundColor = "#c1c638";
  });

  saveButton.addEventListener("mouseout", () => {
    saveButton.style.backgroundColor = "#dee33e";
  });

  const buttonsContainer = document.createElement("div");
  buttonsContainer.style.display = "flex";
  buttonsContainer.style.justifyContent = "center";
  buttonsContainer.style.gap = "1rem";
  buttonsContainer.style.marginTop = "1rem";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancelar";
  Object.assign(cancelButton.style, {
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

  cancelButton.addEventListener("mouseenter", () => {
    cancelButton.style.backgroundColor = "#c82333";
  });

  cancelButton.addEventListener("mouseout", () => {
    cancelButton.style.backgroundColor = "#dc3545";
  });

  cancelButton.addEventListener("click", () => {
    div.remove();
  });

  buttonsContainer.appendChild(saveButton);
  buttonsContainer.appendChild(cancelButton);
  form.appendChild(buttonsContainer);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorDiv.innerHTML = "";

    const emptyFields = Object.entries(inputElements).filter(
      ([, input]) => !input.value.trim()
    );

    if (emptyFields.length > 0) {
      const messages = emptyFields.map(
        ([name]) => `<div>Campo "${name}" não pode estar vazio.</div>`
      );
      errorDiv.innerHTML = messages.join("");
      return;
    }

    const payload = {
      name: inputElements["name"].value.trim(),
      surname: inputElements["surname"].value.trim(),
      cpf: inputElements["cpf"].value.trim(),
      email: inputElements["email"].value.trim(),
      phoneNumber: inputElements["phoneNumber"].value.trim(),
      birthdate: inputElements["birthdate"].value,
      postalCode: inputElements["postalCode"].value.trim(),
    };

    const isUpdate = !!id;

    if (isUpdate) {
      payload.id = id;
    }

    try {
      const res = await fetch("/api/staff", {
        method: isUpdate ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Falha Desconhecida");
      }

      const responseData = await res.json();

      MessageNotification(
        responseData.message ||
          (isUpdate
            ? "Dados atualizados com sucesso!"
            : "Funcionário criado com sucesso!"),
        "#28a745"
      );

      if (onSave) onSave();
      div.remove();
    } catch (error) {
      MessageNotification(error.message, "#ff6347");
    }
  });

  modalContent.appendChild(form);

  div.addEventListener("click", (e) => {
    if (e.target === div) {
      div.remove();
    }
  });

  div.appendChild(modalContent);

  return div;
}