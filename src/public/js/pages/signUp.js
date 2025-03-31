import onNavigate from "../event.js";

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
    { id: "name", placeholder: "Nome da Empresa", type: "text" },
    { id: "cnpj", placeholder: "CNPJ", type: "text" },
    { id: "phoneNumber", placeholder: "Telefone", type: "text" },
    { id: "state", placeholder: "Estado", type: "text" },
    { id: "city", placeholder: "Cidade", type: "text" },
    { id: "street", placeholder: "Endereço", type: "text" },
    { id: "number", placeholder: "Número", type: "text" },
    { id: "postalCode", placeholder: "CEP", type: "text" },
    { id: "email", placeholder: "Email", type: "email" },
    { id: "password", placeholder: "Senha", type: "password" }
  ];

  const inputContainer = document.createElement("div");
  inputContainer.classList.add("signupInputContainer");
  
  inputFields.forEach((field, index) => {
    const input = document.createElement("input");
    input.type = field.type;
    input.id = field.id;
    input.placeholder = field.placeholder;
    input.required = true;
    input.classList.add("signupInputStyle");
    
    if (index % 2 === 0) {
      const row = document.createElement("div");
      row.classList.add("signupInputRow");
      row.appendChild(input);
      inputContainer.appendChild(row);
    } else {
      const lastRow = inputContainer.lastChild;
      lastRow.appendChild(input);
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
  const textoLogin = document.createTextNode("Já tem uma conta? ");
  const linkLogin = document.createElement("a");
  linkLogin.href = "#";
  linkLogin.id = "goToLogin";
  linkLogin.textContent = "Faça o login aqui.";
  loginLink.appendChild(textoLogin);
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

  const sendForm = div.querySelector("#signUpForm");
  sendForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {};
    inputFields.forEach(field => {
      formData[field.id] = div.querySelector(#${field.id}).value;
    });
    console.log(formData)
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Registration successful:", data);
      alert("Registration successful!");
    } else {
      console.error("Registration error:", data);
      alert("Error creating account. Please try again.");
    }
  });

  div.querySelector("#goToLogin").addEventListener("click", (e) => {
    e.preventDefault();
    const event = onNavigate("/");
    document.dispatchEvent(event);
  });

  return div;
}