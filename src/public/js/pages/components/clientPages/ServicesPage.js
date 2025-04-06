import Header from "./Header.js";
import ScheduleAppointment from "./ScheduleAppointment.js";

function navigateTo(pageFunction) {
	const root = document.getElementById("root");
	root.innerHTML = "";
	root.appendChild(pageFunction());
}

function fetchCompanyServices(idCompany) {
	const apiUrl = "/api/customer/company/services";

	return fetch(apiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({idCompany}) // Envia o idCompany no corpo da requisição
	})
		.then(response => response.json())
		.then(data => {
			if (data.result) {
				return data.result; // Retorna os dados se a resposta for bem-sucedida
			} else {
				throw new Error("Serviços não encontrados."); // Caso a resposta não contenha os dados esperados
			}
		})
		.catch(error => {
			console.error("Erro ao buscar os serviços da empresa:", error.message);
			throw error; // Lança o erro para que o chamador possa tratá-lo
		});
}

export default function ServicesPage() {
	const root = document.getElementById("root");
	root.style.width = "100%";

	root.innerHTML = "";

	const container = document.createElement("div");

	// Pegando o nome correto da empresa
	const urlParams = new URLSearchParams(window.location.search);
	const idCompany = urlParams.get("idCompany");

	if (!idCompany) {
		container.innerHTML = "ID da empresa não encontrado na URL.";
		return container; // Se o idCompany não existir, mostra a mensagem e retorna a página
	}

	// Configurar a URL da API
	const apiUrl = "/api/customer/company";

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
			if (data.result) {
				// Se a empresa for encontrada, atualiza o título
				const companyName = data.result;
				const header = Header(companyName);
				container.appendChild(header);
				buildContent(container); // Chama a função que monta o conteúdo da página
			} else {
				container.innerHTML = "Empresa não encontrada."; // Se a empresa não for encontrada
			}
		})
		.catch(error => {
			console.error("Erro ao buscar o nome da empresa:", error.message);
			container.innerHTML = "Erro ao buscar o nome da empresa."; // Caso ocorra um erro na requisição
		});

	function buildContent(container) {
		const content = document.createElement("div");
		content.style.padding = "3rem";
		content.style.display = "flex";
		content.style.flexWrap = "wrap";
		content.style.justifyContent = "center";
		content.style.gap = "2rem";

		const h2 = document.createElement("h2");
		h2.innerText = "Nossos serviços";
		h2.style.fontSize = "1.8rem";

		content.appendChild(h2);

		const cardsServices = document.createElement("div");
		cardsServices.style.width = "100%";
		cardsServices.style.display = "flex";
		cardsServices.style.flexWrap = "wrap";
		cardsServices.style.justifyContent = "center";
		cardsServices.style.gap = "2rem";

		fetchCompanyServices(idCompany)
			.then(services => {
				services.forEach(e => {
					const div = document.createElement("div");
					div.style.cursor = "pointer";
					div.style.width = "400px";
					div.style.height = "270px";
					div.style.borderRadius = "10px";
					div.style.backgroundImage =
						"url('../../../../../assets/externalSchedulingPage/serviceImage.jpeg')";
					div.style.backgroundSize = "cover";
					div.style.overflow = "hidden";
					div.style.backgroundPosition = "center";
					div.style.backgroundRepeat = "no-repeat";
					div.style.display = "flex";
					div.style.flexDirection = "column";
					div.style.justifyContent = "end";
					div.style.padding = "1.3rem 1rem";

					div.addEventListener("click", () => {
						const idCompany = new URLSearchParams(window.location.search).get(
							"idCompany"
						);
						const idService = e.id;

						const url = `/client?idCompany=${idCompany}&idService=${idService}`;
						window.history.pushState({path: url}, "", url);
						navigateTo(ScheduleAppointment);
					});

					const serviceDiv = document.createElement("div");
					serviceDiv.style.color = "white";
					serviceDiv.style.display = "flex";
					serviceDiv.style.flexDirection = "column";
					serviceDiv.style.gap = "1rem";

					const serviceContent = document.createElement("div");
					serviceContent.style.display = "flex";
					serviceContent.style.justifyContent = "space-between";
					serviceContent.style.alignItems = "end";

					const serviceContentName = document.createElement("h3");
					serviceContentName.innerText = e.name;

					const serviceContentCost = document.createElement("div");
					serviceContentCost.style.display = "flex";
					serviceContentCost.style.flexDirection = "column";
					serviceContentCost.style.gap = "0.3rem";

					const serviceContentCostTime = document.createElement("div");
					serviceContentCostTime.innerHTML = `${e.average_duration} min`;
					serviceContentCostTime.style.fontWeight = 600;

					const serviceContentCostMonetary = document.createElement("div");
					serviceContentCostMonetary.innerHTML = `R$ ${e.price
						.toString()
						.replace(".", ",")}`;
					serviceContentCostMonetary.style.fontWeight = 600;

					serviceContentCost.appendChild(serviceContentCostTime);
					serviceContentCost.appendChild(serviceContentCostMonetary);

					serviceContent.appendChild(serviceContentName);
					serviceContent.appendChild(serviceContentCost);

					const serviceDescription = document.createElement("div");
					serviceDescription.style.display = "flex";
					serviceDescription.style.flexDirection = "column";
					serviceDescription.style.gap = "0.5rem";

					const title = document.createElement("p");
					title.textContent = "Descrição:";

					// Container da descrição (em vez de aplicar tudo no <p>)
					const descriptionWrapper = document.createElement("div");
					descriptionWrapper.style.maxHeight = "4.5em"; // ~3 linhas
					descriptionWrapper.style.overflow = "hidden";
					descriptionWrapper.style.transition = "max-height 0.3s ease-in-out";

					// Description em si
					const description = document.createElement("p");
					description.textContent = e.description;
					description.style.whiteSpace = "normal";
					description.style.wordBreak = "break-word";

					// Adiciona descrição no wrapper
					descriptionWrapper.appendChild(description);

					// Cria o overlay
					const overlay = document.createElement("div");
					overlay.style.position = "absolute";
					overlay.style.inset = "0"; // top: 0, right: 0, bottom: 0, left: 0
					overlay.style.borderRadius = "10px";
					overlay.style.background =
						"linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)";
					overlay.style.opacity = "0";
					overlay.style.transition = "opacity 0.3s ease-in-out";
					overlay.style.pointerEvents = "none";
					overlay.style.zIndex = "0";
					
					// Aplica position: relative no container principal
					div.style.position = "relative";

					// Adiciona o overlay no cartão
					div.appendChild(overlay);

					// Hover para mostrar o gradiente escuro
					div.addEventListener("mouseover", () => {
						overlay.style.opacity = "1";
						descriptionWrapper.style.maxHeight = "9em";
					});

					div.addEventListener("mouseout", () => {
						overlay.style.opacity = "0";
						descriptionWrapper.style.maxHeight = "4.5em";
					});

					serviceDescription.appendChild(title);
					serviceDescription.appendChild(descriptionWrapper);

					serviceDiv.style.position = "relative";
					serviceDiv.style.zIndex = "1";

					serviceDiv.appendChild(serviceContent);
					serviceDiv.appendChild(serviceDescription);

					div.appendChild(serviceDiv);
					cardsServices.appendChild(div);
					content.appendChild(cardsServices);
				});
			})
			.catch(error => {
				console.log("Erro ao buscar os serviços:", error);
				location.reload();
			});

		container.appendChild(content);
	}

	return container;
}
