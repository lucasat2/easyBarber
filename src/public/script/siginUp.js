document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector("form");

	form.addEventListener("submit", async event => {
		event.preventDefault();

	
		const name = document.getElementById("nome").value;
		const surname = document.getElementById("sobrenome").value;
		const companyName = document.getElementById("empresa").value;
		const email = document.getElementById("email").value;
		const password = document.getElementById("senha").value;

		try {
			const response = await fetch("http://localhost:3000/api/users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name,
					surname,
					companyName,
					email,
					password
				})
			});

			const data = await response.json();

			console.log(data);

			if (response.ok) {
				alert("Cadastro realizado com sucesso!");
				window.location.href = "/";
			} else {
				alert("Erro no cadastro: " + data.message);
			}
		} catch (error) {
			console.error("Erro na requisição:", error);
			alert("Erro ao tentar se cadastrar.");
		}
	});
});
