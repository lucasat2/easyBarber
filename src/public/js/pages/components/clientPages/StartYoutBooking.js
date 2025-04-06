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
		content.style.paddingTop = "30px";
		content.style.flexWrap = "nowrap";
		content.style.padding = "3rem";
		content.style.gap = "2rem";
		content.style.minHeight = "70vh";

		const textSection = document.createElement("div");
		textSection.style.display = "flex";
		textSection.style.flexDirection = "column";
		textSection.style.alignItems = "center";
		textSection.style.gap = "3rem";

		const h1 = document.createElement("h1");
		h1.textContent = "Procurando por uma barbearia diferenciada?";
		h1.style.fontSize = "3rem";
		h1.style.textAlign = "center";
		h1.style.color = "#17171B";

		const subTilte = document.createElement("p");
		subTilte.innerText =
			"Descubra uma nova experiência em cuidados masculinos. Aqui, estilo e atendimento andam juntos para valorizar ainda mais a sua identidade.";
		subTilte.style.fontSize = "1.3rem";
		subTilte.style.textAlign = "center";
		subTilte.style.maxWidth = "70%";

		const heading = document.createElement("div")
		heading.style.display = "flex";
		heading.style.flexDirection = "column";
		heading.style.alignItems = "center";
		heading.style.gap = "1.5rem";
		heading.appendChild(h1)
		heading.appendChild(subTilte)

		const list = document.createElement("ul");
		list.style.listStyle = "none";
		list.style.display = "flex";
		list.style.flexWrap = "wrap";
		list.style.justifyContent = "center";
		list.style.alignItems = "start";
		list.style.gap = "1.3rem";

		const items = [
			"Profissionais excelêntes",
			"Estilo sob medida",
			"Agende em poucos cliques"
		];

		items.forEach((text, index) => {
			const containerListItem = document.createElement("div");
			containerListItem.style.display = "flex";
			containerListItem.style.flexDirection = "column";
			containerListItem.style.justifyContent = "center";
			containerListItem.style.alignItems = "center";
			containerListItem.style.gap = "0.3rem";

			const imgContainer = document.createElement("div");
			imgContainer.style.width = "50px";
			imgContainer.style.height = "50px";
			imgContainer.style.background = "#E3E3E4";
			imgContainer.style.borderRadius = "100%";
			imgContainer.style.display = "flex";
			imgContainer.style.alignItems = "center";
			imgContainer.style.justifyContent = "center";

			const imgContent = document.createElement("img");
			imgContent.style.width = "50%";
			if (index == 0) {
				imgContent.src = "../assets/externalSchedulingPage/verified.svg";
			}
			if (index == 1) {
				imgContent.src = "../assets/externalSchedulingPage/content_cut.svg";
			}
			if (index == 2) {
				imgContent.src = "../assets/externalSchedulingPage/event.svg";
			}

			const listItem = document.createElement("li");
			listItem.textContent = text;
			listItem.style.fontSize = "0.9rem";
			listItem.style.margin = "10px 0";
			listItem.style.display = "flex";
			listItem.style.alignItems = "center";
			listItem.style.maxWidth = "100px";
			listItem.style.textAlign = "center";
			listItem.style.color = "#66666F";

			imgContainer.appendChild(imgContent);
			containerListItem.appendChild(imgContainer);
			containerListItem.appendChild(listItem);
			list.appendChild(containerListItem);
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

		function applyResponsiveLayout() {
			const isMobile = window.matchMedia("(max-width: 1200px)").matches;

			if (isMobile) {
				content.style.flexWrap = "wrap";
			} else {
				content.style.flexWrap = "nowrap";
			}
		}

		applyResponsiveLayout();
		window.addEventListener("resize", applyResponsiveLayout);

		container.appendChild(content);
	}

	return container;
}
