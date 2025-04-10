import onNavigate from "../event.js";
import { MessageNotification } from "./components/MessageNotification.js";

export default function signup() {
  const div = document.createElement("div");

  const container = document.createElement("div");
  container.classList.add("signupPrincipalContainer");

  const formContainer = document.createElement("div");
  formContainer.classList.add("signupFormContainer");

  const logo = document.createElement("div");
  logo.classList.add("signupLogoImage");

  const logoImg = document.createElement("img");
  logoImg.src = "../assets/logo.jpeg";
  logoImg.alt = "EasyBarber Logo";

  logo.appendChild(logoImg);

  const formBox = document.createElement("div");
  formBox.classList.add("signupFormBox");

  const title = document.createElement("h2");
  title.textContent = "Cadastre-se";
  title.classList.add("signupTitleStyle");

  const form = document.createElement("form");
  form.id = "signUpForm";

  const inputFields = [
    {
      id: "name",
      label: "Nome da Empresa",
      placeholder: "Nome da Empresa",
      type: "text",
    },
    { id: "cnpj", label: "CNPJ", placeholder: "CNPJ", type: "text" },
    {
      id: "phoneNumber",
      label: "Telefone",
      placeholder: "Telefone",
      type: "text",
    },
    { id: "state", label: "Estado", placeholder: "Estado", type: "text" },
    { id: "city", label: "Cidade", placeholder: "Cidade", type: "text" },
    {
      id: "street",
      label: "Logradouro",
      placeholder: "Logradouro",
      type: "text",
    },
    { id: "number", label: "Número", placeholder: "Número", type: "text" },
    { id: "postalCode", label: "CEP", placeholder: "CEP", type: "text" },
    { id: "email", label: "E-mail", placeholder: "E-mail", type: "email" },
    { id: "password", label: "Senha", placeholder: "Senha", type: "password" },
  ];

  const inputContainer = document.createElement("div");
  inputContainer.classList.add("signupInputContainer");

  inputFields.forEach((field, index) => {
    const label = document.createElement("label");
    label.htmlFor = field.id;
    label.textContent = field.label;
    label.classList.add("signupInputLabel");

    const input = document.createElement("input");
    input.type = field.type;
    input.id = field.id;
    input.placeholder = field.placeholder;
    input.required = true;
    input.classList.add("signupInputStyle");

    const fieldContainer = document.createElement("div");
    fieldContainer.classList.add("signupFieldContainer");
    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);

    if (index % 2 === 0) {
      const row = document.createElement("div");
      row.classList.add("signupInputRow");
      row.appendChild(fieldContainer);
      inputContainer.appendChild(row);
    } else {
      const lastRow = inputContainer.lastChild;
      lastRow.appendChild(fieldContainer);
    }
  });

  form.appendChild(inputContainer);

  const btnSignup = document.createElement("button");
  btnSignup.type = "submit";
  btnSignup.classList.add("signupRegisterButton");
  btnSignup.textContent = "Registrar";
  form.appendChild(btnSignup);

  const loginLink = document.createElement("p");
  loginLink.classList.add("signupLoginLink");
  const textLogin = document.createTextNode("Já tem uma conta? ");
  const linkLogin = document.createElement("a");
  linkLogin.href = "#";
  linkLogin.id = "goToLogin";
  linkLogin.textContent = "Faça o login";
  loginLink.appendChild(textLogin);
  loginLink.appendChild(linkLogin);
  form.appendChild(loginLink);

  formBox.appendChild(title);
  formBox.appendChild(form);
  formContainer.appendChild(logo);
  formContainer.appendChild(formBox);

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("signupImageContainer");

  container.appendChild(formContainer);
  container.appendChild(imageContainer);
  div.appendChild(container);

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

  div.querySelector("#cnpj").addEventListener("input", (e) => {
    e.target.value = maskCNPJ(e.target.value);
  });

  div.querySelector("#phoneNumber").addEventListener("input", (e) => {
    e.target.value = maskPhone(e.target.value);
  });

  div.querySelector("#postalCode").addEventListener("input", (e) => {
    e.target.value = maskPostalCode(e.target.value);
  });

  const sendForm = div.querySelector("#signUpForm");
  sendForm.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();

      const formData = {};
      inputFields.forEach((field) => {
        formData[field.id] = div.querySelector(`#${field.id}`).value;
      });

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha não identificada");
      }

      const data = await response.json();
      MessageNotification(data.message, "#28a745");

      setTimeout(() => {
        const event = onNavigate("/");
        document.dispatchEvent(event);
      }, 1000);
    } catch (error) {
      MessageNotification(error.message, "#ff6347");
    }
  });

  div.querySelector("#goToLogin").addEventListener("click", (e) => {
    e.preventDefault();
    const event = onNavigate("/");
    document.dispatchEvent(event);
  });

  return div;
}