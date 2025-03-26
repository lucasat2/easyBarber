import onNavigate from "../event.js";

export default function signUp() {
  const link = document.getElementById("dynamic-css")
  link.href = "./css/signUp.css"
  
  const div = document.createElement("div");

  const container = document.createElement("div");
  container.classList.add("container");

  const formContainer = document.createElement("div");
  formContainer.classList.add("form-container");

  const logo = document.createElement("div");
  logo.classList.add("logo");

  const logoImg = document.createElement("img");
  logoImg.src = "../assets/logo.jpeg";
  logoImg.alt = "Logo EasyBarber";

  logo.appendChild(logoImg);

  const formBox = document.createElement("div");
  formBox.classList.add("form-box");

  const titulo = document.createElement("h2");
  titulo.textContent = "Faça o seu cadastro";

  const form = document.createElement("form");
  form.id = "signUpForm";

  const inputRow = document.createElement("div");
  inputRow.classList.add("input-row");

  const inputNome = document.createElement("input");
  inputNome.type = "text";
  inputNome.id = "nome";
  inputNome.placeholder = "Nome";
  inputNome.required = true;

  const inputSobrenome = document.createElement("input");
  inputSobrenome.type = "text";
  inputSobrenome.id = "sobrenome";
  inputSobrenome.placeholder = "Sobrenome";
  inputSobrenome.required = true;

  inputRow.appendChild(inputNome);
  inputRow.appendChild(inputSobrenome);

  const inputEmpresa = document.createElement("input");
  inputEmpresa.type = "text";
  inputEmpresa.id = "empresa";
  inputEmpresa.placeholder = "Nome da Empresa";
  inputEmpresa.required = true;

  const inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.id = "email";
  inputEmail.placeholder = "Email";
  inputEmail.required = true;

  const passwordField = document.createElement("div");
  passwordField.classList.add("password-field");

  const inputPassword = document.createElement("input");
  inputPassword.type = "password";
  inputPassword.id = "password";
  inputPassword.placeholder = "Senha";
  inputPassword.required = true;

  passwordField.appendChild(inputPassword);

  const btnCadastro = document.createElement("button");
  btnCadastro.type = "submit";
  btnCadastro.classList.add("cadastro-btn");
  btnCadastro.textContent = "Cadastre-se";

  const loginLink = document.createElement("p");
  loginLink.classList.add("login-link");

  const textoLogin = document.createTextNode("Já tem uma conta? ");

  const linkLogin = document.createElement("a");
  linkLogin.href = "#";
  linkLogin.id = "goToLogin";
  linkLogin.textContent = "Entre na sua conta";

  loginLink.appendChild(textoLogin);
  loginLink.appendChild(linkLogin);

  // Monta o formulário
  form.appendChild(inputRow);
  form.appendChild(inputEmpresa);
  form.appendChild(inputEmail);
  form.appendChild(passwordField);
  form.appendChild(btnCadastro);
  form.appendChild(loginLink);

  // Monta o bloco da direita
  formBox.appendChild(titulo);
  formBox.appendChild(form);

  formContainer.appendChild(logo);
  formContainer.appendChild(formBox);

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  container.appendChild(formContainer);
  container.appendChild(imageContainer);

  div.appendChild(container);

  const sendForm = div.querySelector("#signUpForm");
  sendForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = div.querySelector("#nome").value;
    const surname = div.querySelector("#sobrenome").value;
    const companyName = div.querySelector("#empresa").value;
    const email = div.querySelector("#email").value;
    const password = div.querySelector("#password").value;

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, surname, companyName, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Cadastro realizado com sucesso:", data);
      //Mudar console.log para modal
    } else {
      console.error("Erro no cadastro:", data);
      //Mudar console.log para modal
      alert("Erro ao criar conta. Tente novamente.");
    }
  });

  div.querySelector("#goToLogin").addEventListener("click", (e) => {
    e.preventDefault();
    const event = onNavigate("/");
    document.dispatchEvent(event);
  });

  return div;
}
