import Header from "./Header.js";
import ServicesPage from "./ServicesPage.js";

function navigateTo(pageFunction) {
	const root = document.getElementById("root");
	root.innerHTML = "";
	root.appendChild(pageFunction());
}

export default function StratYoutBooking() {
	const root = document.getElementById("root");
	root.style.width = "100%";

	const container = document.createElement("div");

	const urlParams = new URLSearchParams(window.location.search);
	const idCompany = urlParams.get("idCompany");

	if (!idCompany) {
		container.innerHTML = "ID da empresa não encontrado na URL.";
		return container;
	}

	const apiUrl = "/api/customer/company";

	fetch(apiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({idCompany})
	})
		.then(response => response.json())
		.then(data => {
			if (data.result) {
				const companyName = data.result;
				const header = Header(companyName);
				container.appendChild(header);
				buildContent(container);
			} else {
				container.innerHTML = "Empresa não encontrada.";
			}
		})
		.catch(error => {
			console.error("Erro ao buscar o nome da empresa:", error.message);
			container.innerHTML = "Erro ao buscar o nome da empresa.";
		});

	function buildContent(container) {
		const content = document.createElement("div");
		content.style.display = "flex";
		content.style.alignItems = "center";
		content.style.justifyContent = "space-around";
		content.style.marginTop = "30px";
		content.style.flexWrap = "wrap";
		content.style.padding = "2rem";
		content.style.gap = "2rem";

		const textSection = document.createElement("div");
		textSection.style.display = "flex";
		textSection.style.flexDirection = "column";
		textSection.style.alignItems = "center";
		textSection.style.gap = "2rem";

		const heading = document.createElement("h2");
		heading.textContent = "Procurando por uma barbearia diferenciada?";
		heading.style.fontSize = "3rem";
		heading.style.textAlign = "center";

		const list = document.createElement("ul");
		list.style.listStyle = "none";

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
		button.textContent = "Agendar um serviço";
		button.style.background = "#DEE33E";
		button.style.fontSize = "1.3rem";
		button.style.fontWeight = "800";
		button.style.border = "none";
		button.style.borderRadius = "0.5rem";
		button.style.padding = "1rem 2rem";
		button.style.cursor = "pointer";
		button.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.2)";

		button.addEventListener("click", () => {
			navigateTo(ServicesPage);
		});

		button.addEventListener("mouseover", () => {
			button.style.background = "#ffd700";
		});

		button.addEventListener("mouseout", () => {
			button.style.background = "#DEE33E";
		});

		const divImage = document.createElement("div");

		const image = document.createElement("img");
		image.src =
			"../../../../../assets/externalSchedulingPage/barber-5194406_1280 1.png";
		image.alt = "Barbeiro cortando cabelo";
		image.style.borderRadius = "10px";
		image.style.width = "100%";

		divImage.appendChild(image);

		textSection.appendChild(heading);
		textSection.appendChild(list);
		textSection.appendChild(button);

		content.appendChild(textSection);
		content.appendChild(divImage);

		container.appendChild(content);
	}

	return container;
}
