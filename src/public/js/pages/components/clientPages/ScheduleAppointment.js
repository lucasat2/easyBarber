import Header from "./Header.js";
import ServicesPage from "./ServicesPage.js";

function navigateTo(pageFunction) {
	const root = document.getElementById("root");
	root.innerHTML = "";
	root.appendChild(pageFunction());
}

function fetchStaffServices(idCompany, idService) {
	const apiUrl = "http://localhost:3000/api/customer/company/services/staff";

	return fetch(apiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({idCompany, idService}) // Envia o idCompany no corpo da requisição
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

function fetchCompanyServices(idCompany) {
	const apiUrl = "http://localhost:3000/api/customer/company/services";

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

export default function ScheduleAppointment() {
	const root = document.getElementById("root");
	root.style.width = "100%";

	const container = document.createElement("div");

	// Pegando o nome correto da empresa
	const urlParams = new URLSearchParams(window.location.search);
	const idCompany = urlParams.get("idCompany");

	if (!idCompany) {
		container.innerHTML = "ID da empresa não encontrado na URL.";
		return container; // Se o idCompany não existir, mostra a mensagem e retorna a página
	}

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
		const idService = urlParams.get("idService");

		const content = document.createElement("div");

		fetchStaffServices(idCompany, idService)
			.then(staffs => {
				const maxWidth = "800px";
				const div = document.createElement("div");
				div.style.display = "flex";
				div.style.flexWrap = "wrap";
				div.style.gap = "1rem";

				const confirm = document.createElement("div");
				confirm.style.width = "270px";
				confirm.style.minHeight = "500px";
				confirm.style.borderRight = "1px solid black";
				confirm.style.display = "flex";
				confirm.style.flexDirection = "column";
				confirm.style.justifyContent = "space-between";
				confirm.style.alignItems = "center";
				confirm.style.padding = "1.5rem";

				const contentService = document.createElement("div");
				contentService.style.display = "flex";
				contentService.style.flexDirection = "column";
				contentService.style.gap = "0.8rem";
				const chosenService = document.createElement("div");
				chosenService.style.display = "flex";
				chosenService.style.flexDirection = "column";
				chosenService.style.gap = "0.8rem";

				const imageService = document.createElement("img");
				imageService.src =
					"../../../../../assets/externalSchedulingPage/serviceImage.jpeg";
				imageService.style.width = "100%";

				const contentServiceInformation = document.createElement("div");
				contentServiceInformation.innerHTML = fetchCompanyServices(
					idCompany
				).then(services => {
					let serviceNames = "";
					let time = "";
					let cost = "";

					services.forEach(service => {
						if (service.id == idService) {
							serviceNames = service.name;
							time = service.average_duration;
							cost = service.price;
						}
					});

					contentServiceInformation.innerHTML = `
            <h3>${serviceNames.trim()}</h3>
            <p>${time} min</p>
            <p>R$ ${cost.toString().replace(".", ",")}</p>
            `;
				});

				chosenService.appendChild(imageService);
				chosenService.appendChild(contentServiceInformation);

				const back = document.createElement("div");
				back.innerText = "Alterar corte";
				back.style.background = "#DEE33E";
				back.style.padding = "10px 20px";
				back.style.fontWeight = "700";
				back.style.textAlign = "center";
				back.style.cursor = "pointer";
				back.style.position = "relative";
				back.style.borderRadius = "8px";
				back.style.width = "fit-content";

				back.addEventListener("mouseover", () => {
					back.style.background = "#ffd700";
				});

				back.addEventListener("mouseout", () => {
					back.style.background = "#DEE33E";
				});

				back.addEventListener("click", () => {
					navigateTo(ServicesPage);
				});

				contentService.appendChild(chosenService);
				contentService.appendChild(back);

				const button = document.createElement("div");
				button.innerText = "Confirmar";
				button.style.background = "#DEE33E";
				button.style.padding = "10px 20px";
				button.style.fontSize = "1.5rem";
				button.style.fontWeight = "700";
				button.style.textAlign = "center";
				button.style.cursor = "pointer";
				button.style.position = "relative";
				button.style.borderRadius = "8px";
				button.style.width = "fit-content";

				button.addEventListener("mouseover", () => {
					button.style.background = "#ffd700";
				});

				button.addEventListener("mouseout", () => {
					button.style.background = "#DEE33E";
				});

				const selectStaff = document.createElement("div");
				selectStaff.style.display = "flex";
				selectStaff.style.justifyContent = "center";
				selectStaff.style.alignItems = "center";
				selectStaff.style.flexWrap = "wrap";
				selectStaff.style.gap = "1rem";
				selectStaff.style.padding = "1.5rem";

				function handleScreenChange(e) {
					if (e.matches) {
						button.style.position = "fixed";
						button.style.bottom = "20px";
						button.style.left = "50%";
						button.style.transform = "translateX(-50%)";
						confirm.style.width = "100%";
						confirm.style.border = "none";
						confirm.style.minHeight = "auto";
						selectStaff.style.width = "100%";
					} else {
						button.style.position = "relative";
						button.style.bottom = "auto";
						button.style.left = "auto";
						button.style.transform = "none";
						confirm.style.width = "270px";
						confirm.style.borderRight = "1px solid black";
						confirm.style.minHeight = "500px";
						selectStaff.style.width = "calc(100% - 300px)";
					}
				}

				let mediaQuery = window.matchMedia(`(max-width: ${maxWidth})`);

				// Configurar a mídia query corretamente
				mediaQuery.addEventListener("change", handleScreenChange);
				handleScreenChange(mediaQuery); // Aplica a configuração inicial

				confirm.appendChild(contentService);
				confirm.appendChild(button);
				div.appendChild(confirm);

				staffs.forEach(staff => {
					const div = document.createElement("div");
					div.style.width = "200px";
					div.style.height = "150px";
					div.style.background = "#D9D9D9";
					div.style.borderRadius = "1.3rem";
					div.style.border = "1px solid #000";
					div.style.display = "flex";
					div.style.cursor = "pointer";
					div.style.flexDirection = "column";
					div.style.justifyContent = "space-between";
					div.style.alignItems = "center";
					div.style.padding = "0.5rem";
					div.style.fontWeight = "700";

					const img = document.createElement("img");
					img.src =
						"../../../../../assets/externalSchedulingPage/person.png";
					img.style.height = "70%";
					img.style.width = "70%";
          img.style.objectFit = "cover"

					const paragraph = document.createElement("p");
					paragraph.textContent = `${staff.name} ${staff.surname}`;

					div.appendChild(img);
					div.appendChild(paragraph);

					selectStaff.appendChild(div);
				});
				div.appendChild(selectStaff);

				content.appendChild(div);
			})
			.catch(error => {
				console.log("Erro ao buscar os serviços:", error);
				location.reload();
			});

		container.appendChild(content);
	}

	return container;
}
