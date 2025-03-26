import onNavigate from "../event.js";

export default function login() {
  const link = document.getElementById("dynamic-css")
  link.href = "./css/login.css"
  
  const div = document.createElement("div");

  const container = document.createElement("div");
  container.classList.add("container");

  const leftSide = document.createElement("div");
  leftSide.classList.add("left-side");

  const barberPole = document.createElement("img");
  barberPole.src = "../assets/login/barberPole.jpeg";
  barberPole.alt = "Barber Pole";
  barberPole.classList.add("barber-pole");

  leftSide.appendChild(barberPole);

  const rightSide = document.createElement("div");
  rightSide.classList.add("right-side");

  const logoContainer = document.createElement("div");
  logoContainer.classList.add("logo-container");

  const logo = document.createElement("img");
  logo.src = "../assets/logo.jpeg";
  logo.alt = "EasyBarber Logo";
  logo.classList.add("logo");

  logoContainer.appendChild(logo);

  const loginContainer = document.createElement("div");
  loginContainer.classList.add("login-container");

  const titulo = document.createElement("h1");
  titulo.textContent = "Entre na sua conta";

  const form = document.createElement("form");
  form.id = "loginForm";

  const inputGroupEmail = document.createElement("div");
  inputGroupEmail.classList.add("input-group");

  const inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.id = "email";
  inputEmail.placeholder = "Email";
  inputEmail.required = true;

  inputGroupEmail.appendChild(inputEmail);

  const inputGroupSenha = document.createElement("div");
  inputGroupSenha.classList.add("input-group");

  const inputSenha = document.createElement("input");
  inputSenha.type = "password";
  inputSenha.id = "password";
  inputSenha.placeholder = "Senha";
  inputSenha.required = true;

  inputGroupSenha.appendChild(inputSenha);

  const forgotPassword = document.createElement("div");
  forgotPassword.classList.add("forgot-password");

  const linkEsqueci = document.createElement("a");
  linkEsqueci.href = "#";
  linkEsqueci.textContent = "Esqueceu sua senha?";

  forgotPassword.appendChild(linkEsqueci);

  const loginButton = document.createElement("button");
  loginButton.type = "submit";
  loginButton.classList.add("login-button");
  loginButton.textContent = "Entrar";

  const registerLink = document.createElement("div");
  registerLink.classList.add("register-link");

  const textoCadastro = document.createTextNode("Não tem uma conta? ");
  const linkCadastro = document.createElement("a");
  linkCadastro.href = "#";
  linkCadastro.id = "goToSignUp";
  linkCadastro.textContent = "Cadastre-se";

  registerLink.appendChild(textoCadastro);
  registerLink.appendChild(linkCadastro);

  form.appendChild(inputGroupEmail);
  form.appendChild(inputGroupSenha);
  form.appendChild(forgotPassword);
  form.appendChild(loginButton);
  form.appendChild(registerLink);

  loginContainer.appendChild(titulo);
  loginContainer.appendChild(form);

  rightSide.appendChild(logoContainer);
  rightSide.appendChild(loginContainer);

  container.appendChild(leftSide);
  container.appendChild(rightSide);

  div.appendChild(container);

  const sendForm = div.querySelector("#loginForm");
  sendForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = div.querySelector("#email").value;
    const password = div.querySelector("#password").value;

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Login bem-sucedido:", data);
      //Ao invés de console colocar modal
      const event = onNavigate("/");
      document.dispatchEvent(event);
    } else {
      console.error("Erro no login:", data);
      //Ao invés de console colocar modal
      alert("Email ou senha incorretos!");
    }
  });

  div.querySelector("#goToSignUp").addEventListener("click", (e) => {
    e.preventDefault();
    const event = onNavigate("/signUp");
    document.dispatchEvent(event);
  });

  return div;
}
