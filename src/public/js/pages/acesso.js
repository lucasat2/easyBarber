import onNavigate from "../event.js";

export default function acesso() {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="container">
        <h1>Bem-vindo ao EasyBarber</h1>
        <p>Você está na página de acesso.</p>
        <button id="logoutBtn">Sair</button>
    </div>
`;

    const exitButton = div.querySelector("#logoutBtn");
    exitButton.addEventListener("click", () => {
        const event = onNavigate("/login");
        window.dispatchEvent(event);
    });

    return div;
}
