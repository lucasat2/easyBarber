const form = document.querySelector("form");
const email = document.getElementById("email");
const senha = document.getElementById("senha");

form.addEventListener("submit", async e => {
	e.preventDefault();

	const email = document.getElementById("email").value;
	const senha = document.getElementById("senha").value;

	const response = await fetch("http://localhost:3000/api/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email: email,
			password: senha
		})
	});

	const data = await response.json();

	if (response.ok) {
		console.log("Login bem-sucedido:", data);
		window.location.href = "html/acesso.html";
	} else {
		console.error("Erro no login:", data);
		alert("Email ou senha incorretos!");
	}
});
