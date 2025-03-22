import onNavigate from "../event.js";

export default function acess() {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="container">
        <h1>Bem-vindo ao EasyBarber</h1>
        <p>Você está na página de acess.</p>
        <button id="logoutBtn">Sair</button>
    </div>
`;

  const exitButton = div.querySelector("#logoutBtn");
  exitButton.addEventListener("click", () => {
    const event = onNavigate("/");
    document.dispatchEvent(event);
  });

  return div;
}
