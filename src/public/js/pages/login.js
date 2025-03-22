import onNavigate from "../event.js";

export default function login() {
  const div = document.createElement("div");
  div.innerHTML = `
      <div class="container">
        <div class="left-side">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-17%20at%2021.37.19%20%281%29-e4mZCWIVSsbAGvnf9H8KyMoHij9gWy.jpeg" alt="Barber Pole" class="barber-pole">
        </div>
        <div class="right-side">
          <div class="logo-container">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-17%20at%2021.37.18-ZNKibpAq66bklKiRQPEZfic0NYcAv2.jpeg" alt="EasyBarber Logo" class="logo">
          </div>
          <div class="login-container">
            <h1>Entre na sua conta</h1>
            <form id="loginForm">
              <div class="input-group">
                <input type="email" id="email" placeholder="Email" required>
              </div>
              <div class="input-group">
                <input type="password" id="senha" placeholder="Senha" required>
                <span class="password-toggle">
                  <i class="fas fa-eye-slash"></i>
                </span>
              </div>
              <div class="forgot-password">
                <a href="#">Esqueceu sua senha?</a>
              </div>
              <button type="submit" class="login-button">Entrar</button>
              <div class="register-link">
                Não tem uma conta? <a href="#" id="goToSignUp">Cadastre-se</a>
              </div>
            </form>
          </div>
        </div>
      </div>
  `;

  const form = div.querySelector("#loginForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = div.querySelector("#email").value;
    const password = div.querySelector("#senha").value;

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
      const event = onNavigate("/acess");
      document.dispatchEvent(event);
    } else {
      console.error("Erro no login:", data);
      alert("Email ou senha incorretos!");
    }
  });

  div.querySelector("#goToSignUp").addEventListener("click", (e) => {
    e.preventDefault();
    const event = onNavigate("/signUp");
    document.dispatchEvent(event);
  });

  const passwordToggle = div.querySelector(".password-toggle");
  const passwordInput = div.querySelector("#senha");

  passwordToggle.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordToggle.innerHTML = `<i class="fas fa-eye"></i>`;
    } else {
      passwordInput.type = "password";
      passwordToggle.innerHTML = `<i class="fas fa-eye-slash"></i>`;
    }
  });
  return div;
}
