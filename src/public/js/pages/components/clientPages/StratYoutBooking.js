// clientPages/StratYoutBooking.js
export default function MeuComponente() {
	const container = document.createElement("div");
	container.style.fontFamily = "Arial, sans-serif";
	container.style.textAlign = "center";

	const header = document.createElement("header");
	header.style.display = "flex";
	header.style.alignItems = "center";
	header.style.justifyContent = "space-between";
	header.style.background = "#ddd";
	header.style.padding = "10px 20px";

	const logo = document.createElement("img");
	logo.src = "logo.png"; // Substitua pelo caminho correto
	logo.alt = "Logo da Barbearia";
	logo.style.height = "50px";

	const title = document.createElement("h1");

	// pegando o nome correto da empresa
	const urlParams = new URLSearchParams(window.location.search);
	const idCompany = urlParams.get("idCompany");

	try {
		if (idCompany) {
			// Configurar a URL da API
			const apiUrl = "http://localhost:3000/api/customer/company";

			// Fazer o POST para a API com o idCompany
			fetch(apiUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({idCompany}) // Envia o idCompany no corpo da requisição
			})
				.then(response => response.json())
				.then(data => {
					// Atualiza o título da página com o nome da empresa retornado pela API
					const companyName = data.result;
					title.textContent = companyName; // Atualiza o título na página
				})
				.catch(error => {
					throw new Error("Erro ao buscar o nome da empresa: " + error.message);
				});
		} else {
			throw new Error("idCompany não encontrado na URL");
		}
	} catch (error) {
		console.error(error.message);
	}

	title.style.fontSize = "1.5rem";

	const content = document.createElement("div");
	content.style.display = "flex";
	content.style.alignItems = "center";
	content.style.justifyContent = "space-around";
	content.style.marginTop = "30px";

	const textSection = document.createElement("div");
	textSection.style.textAlign = "left";
	textSection.style.maxWidth = "50%";

	const heading = document.createElement("h2");
	heading.textContent = "Procurando por uma barbearia diferenciada?";

	const list = document.createElement("ul");
	list.style.listStyle = "none";
	list.style.padding = "0";

	const items = [
		"Barbeiros qualificados",
		"Cortes estilizados",
		"Agendamento rápido e simples"
	];

	items.forEach(text => {
		const listItem = document.createElement("li");
		listItem.textContent = text;
		listItem.style.fontSize = "1.2rem";
		listItem.style.margin = "10px 0";
		listItem.style.display = "flex";
		listItem.style.alignItems = "center";

		const icon = document.createElement("span");
		icon.textContent = "✨";
		icon.style.marginRight = "10px";

		listItem.prepend(icon);
		list.appendChild(listItem);
	});

	const button = document.createElement("button");
	button.textContent = "Agendar um corte";
	button.style.background = "#ffea00";
	button.style.color = "#000";
	button.style.fontSize = "1.2rem";
	button.style.border = "none";
	button.style.padding = "10px 20px";
	button.style.cursor = "pointer";
	button.style.marginTop = "20px";
	button.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.2)";

	button.addEventListener("mouseover", () => {
		button.style.background = "#ffd700";
	});

	button.addEventListener("mouseout", () => {
		button.style.background = "#ffea00";
	});

	const image = document.createElement("img");
	image.src = "barber-image.jpg"; // Substitua pelo caminho correto
	image.alt = "Barbeiro cortando cabelo";
	image.style.maxWidth = "45%";
	image.style.borderRadius = "10px";

	// Montando a estrutura da página
	header.appendChild(logo);
	header.appendChild(title);

	textSection.appendChild(heading);
	textSection.appendChild(list);
	textSection.appendChild(button);

	content.appendChild(textSection);
	content.appendChild(image);

	container.appendChild(header);
	container.appendChild(content);

	return container;
}
