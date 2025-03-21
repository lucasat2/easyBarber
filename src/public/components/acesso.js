const div = document.createElement("div");
div.innerHTML = `
    <div class="container">
        <h1>Bem-vindo ao EasyBarber</h1>
        <p>Você está na página de acesso.</p>
        <button onclick="window.location.pathname='login'">Sair</button>
    </div>
`;

export default div;
