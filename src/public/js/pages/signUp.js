import onNavigate from "../event.js";

export default function signUp() {
  const div = document.createElement("div");
  div.innerHTML = `
      <div class="container">
        <div class="form-container">
          <div class="logo">
            <img src="../assets/logo.jpeg" alt="Logo EasyBarber" />
          </div>

          <div class="form-box">
            <h2>Faça o seu cadastro</h2>  

            <form id="signUpForm">
              <div class="input-row">
                <input type="text" id="nome" placeholder="Nome" required />
                <input type="text" id="sobrenome" placeholder="Sobrenome" required />
              </div>

              <input type="text" id="empresa" placeholder="Nome da Empresa" required />
              <input type="email" id="email" placeholder="Email" required />

              <div class="password-field">
                <input type="password" id="password" placeholder="Senha" required />
              </div>

              <button type="submit" class="cadastro-btn">Cadastre-se</button>

              <p class="login-link">
                Já tem uma conta?
                <a href="#" id="goToLogin">Entre na sua conta</a>
              </p>
            </form>
          </div>
        </div>

        <div class="image-container"></div>
      </div>
  `;

  const form = div.querySelector("#signUpForm");
  form.addEventListener("submit", async (e) => {
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
