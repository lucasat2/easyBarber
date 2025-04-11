import onNavigate from "../event.js";
import { MessageNotification } from "./components/MessageNotification.js";

export default function login() {
  const div = document.createElement("div");

  const loginMainContainer = document.createElement("div");
  loginMainContainer.classList.add("loginPrincipalContainer");

  const leftSide = document.createElement("div");
  leftSide.classList.add("loginLeftSideStyle");

  const barberPole = document.createElement("img");
  barberPole.src = "../assets/login/barberPole.jpg";
  barberPole.alt = "Barber Pole";
  barberPole.classList.add("loginBarberPoleStyle");

  leftSide.appendChild(barberPole);

  const rightSide = document.createElement("div");
  rightSide.classList.add("loginRightSideStyle");

  const logoContainer = document.createElement("div");
  logoContainer.classList.add("loginLogoContainer");
  
  const logo = document.createElement("img");
  logo.src = "../assets/logo.png";
  logo.alt = "EasyBarber Logo";
  logo.classList.add("loginLogoStyle");
  
  logoContainer.appendChild(logo);
  
  const loginContainer = document.createElement("div");
  loginContainer.classList.add("loginSecondContainer");

  const backButton = document.createElement("button");
  backButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000">
    <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
  </svg>
  Voltar
`;
  backButton.classList.add("loginBackButton");
  loginContainer.appendChild(backButton);
  
  const title = document.createElement("h1");
  title.classList.add("loginTitleStyle");
  title.textContent = "Entre na sua conta";

  const form = document.createElement("form");
  form.classList.add("loginFormStyle");
  form.id = "loginForm";

  const inputGroupEmail = document.createElement("div");
  inputGroupEmail.classList.add("loginInputGroupStyle");

  const labelEmail = document.createElement("label");
  labelEmail.htmlFor = "email";
  labelEmail.textContent = "E-mail";
  labelEmail.classList.add("loginInputLabel");

  const inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.id = "email";
  inputEmail.placeholder = "E-mail";
  inputEmail.required = true;
  inputEmail.classList.add("loginInputStyle");

  inputGroupEmail.appendChild(labelEmail);
  inputGroupEmail.appendChild(inputEmail);

  const inputGroupPassword = document.createElement("div");
  inputGroupPassword.classList.add("loginInputGroupStyle");

  const labelPassword = document.createElement("label");
  labelPassword.htmlFor = "password";
  labelPassword.textContent = "Senha";
  labelPassword.classList.add("loginInputLabel");

  const inputPassword = document.createElement("input");
  inputPassword.type = "password";
  inputPassword.id = "password";
  inputPassword.placeholder = "Senha";
  inputPassword.required = true;
  inputPassword.classList.add("loginInputStyle");

  inputGroupPassword.appendChild(labelPassword);
  inputGroupPassword.appendChild(inputPassword);

  const loginButton = document.createElement("button");
  loginButton.type = "submit";
  loginButton.classList.add("loginLoginButton");
  loginButton.textContent = "Entrar";
  loginButton.id = "goToDashboard";

  const registerLink = document.createElement("div");
  registerLink.classList.add("loginRegisterLink");

  const registerText = document.createTextNode("Não tem uma conta? ");
  const linkSignUp = document.createElement("a");
  linkSignUp.href = "#";
  linkSignUp.id = "goToSignUp";
  linkSignUp.textContent = "Cadastre-se";

  registerLink.appendChild(registerText);
  registerLink.appendChild(linkSignUp);

  form.appendChild(inputGroupEmail);
  form.appendChild(inputGroupPassword);
  form.appendChild(loginButton);
  form.appendChild(registerLink);

  loginContainer.appendChild(title);
  loginContainer.appendChild(form);

  rightSide.appendChild(logoContainer);
  rightSide.appendChild(loginContainer);

  loginMainContainer.appendChild(leftSide);
  loginMainContainer.appendChild(rightSide);

  div.appendChild(loginMainContainer);

  const sendForm = div.querySelector("#loginForm");
  sendForm.addEventListener("submit", async (e) => {
    try {
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha não identificada");
      }

      const event = onNavigate("/dashboard");
      document.dispatchEvent(event);
    } catch (error) {
      MessageNotification(error.message, "#ff6347");
    }
  });

  div.querySelector("#goToSignUp").addEventListener("click", (e) => {
    e.preventDefault();
    const event = onNavigate("/signup");
    document.dispatchEvent(event);
  });

  backButton.addEventListener("click", (e) => {
    e.preventDefault();
    const event = onNavigate("/");
    document.dispatchEvent(event);
  });

  return div;
}
