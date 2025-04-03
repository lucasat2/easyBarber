import Header from "./Header.js";
import ServicesPage from "./ServicesPage.js";
import ConfirmScheduling from "./ConfirmScheduling.js";

function navigateTo(pageFunction, obj) {
	const root = document.getElementById("root");
	root.innerHTML = "";
	root.appendChild(Header(objCompany.companyName));
	root.appendChild(pageFunction(obj));
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
let objCompany = null;

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
				objCompany = {idCompany, companyName};

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
		let serviceNames = "";
		let time = "";
		let cost = "";

		let lastIdStaff = null;
		let dateDaySelected = null;
		let hourSelected = null;
		let objStaff = null;
		let objService = null;

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

				const containerContent = document.createElement("div");

				const contentServiceInformation = document.createElement("div");
				contentServiceInformation.innerHTML = fetchCompanyServices(
					idCompany
				).then(services => {
					services.forEach(service => {
						if (service.id == idService) {
							serviceNames = service.name;
							time = service.average_duration;
							cost = service.price;
						}
						objService = {
							id: service.id,
							name: service.name,
							time: service.average_duration,
							cost: service.price
						};
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

				button.addEventListener("click", () => {
					if (
						lastIdStaff == null ||
						dateDaySelected == null ||
						hourSelected == null
					) {
						document.getElementById("errorMessage").innerHTML =
							"Preencha todos os campos";
						return;
					}
					document.getElementById("errorMessage").innerHTML = "";
					const scheduler = {
						objStaff,
						dateDaySelected,
						hourSelected,
						objService,
						objCompany
					};
					navigateTo(ConfirmScheduling, scheduler);
				});

				button.addEventListener("mouseover", () => {
					button.style.background = "#ffd700";
				});

				button.addEventListener("mouseout", () => {
					button.style.background = "#DEE33E";
				});
				containerContent.style.display = "flex";
				containerContent.style.flexDirection = "column";

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
						containerContent.style.width = "100%";
					} else {
						button.style.position = "relative";
						button.style.bottom = "auto";
						button.style.left = "auto";
						button.style.transform = "none";
						confirm.style.width = "270px";
						confirm.style.borderRight = "1px solid black";
						confirm.style.minHeight = "500px";
						containerContent.style.width = "calc(100% - 300px)";
					}
				}

				let mediaQuery = window.matchMedia(`(max-width: ${maxWidth})`);

				// Configurar a mídia query corretamente
				mediaQuery.addEventListener("change", handleScreenChange);
				handleScreenChange(mediaQuery); // Aplica a configuração inicial

				confirm.appendChild(contentService);

				const errorMessage = document.createElement("div");
				errorMessage.id = "errorMessage";

				confirm.appendChild(button);
				confirm.appendChild(errorMessage);
				div.appendChild(confirm);

				const hoursToWork = document.createElement("div");
				hoursToWork.id = "hoursToWork";
				staffs.forEach(staff => {
					const div = document.createElement("div");
					div.id = staff.id;
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
					img.src = "../../../../../assets/externalSchedulingPage/person.png";
					img.style.height = "70%";
					img.style.width = "70%";
					img.style.objectFit = "cover";

					const paragraph = document.createElement("p");
					paragraph.textContent = `${staff.name} ${staff.surname}`;

					div.appendChild(img);
					div.appendChild(paragraph);

					// Evento para selecionar apenas um staff por vez
					div.addEventListener("click", async () => {
						const calendar = document.getElementById("calendar-input");
						const idStaff = staff.id;
						objStaff = {id: staff.id, name: `${staff.name} ${staff.surname}`};
						lastIdStaff = idStaff;
						const dateDay = calendar.value;

						try {
							const response = await fetch(
								"http://localhost:3000/api/customer/company/services/staff/schedule",
								{
									method: "POST",
									headers: {
										"Content-Type": "application/json"
									},
									body: JSON.stringify({idStaff: lastIdStaff, date: dateDay})
								}
							);

							hourSelected = null;
							dateDaySelected = dateDay;

							if (!response.ok) {
								hoursToWork.innerHTML = "Funcionário não trabalha esse dia";
							}

							hoursToWork.innerHTML = "";
							const data = await response.json();

							const availableTimes = data.getSchedules.availableTimes.flatMap(
								({start, end}) => {
									const slots = [];
									let startTime = new Date(`2000-01-01T${start}`);
									const endTime = new Date(`2000-01-01T${end}`);

									while (
										startTime.getTime() + time * 60000 <=
										endTime.getTime()
									) {
										const nextTime = new Date(
											startTime.getTime() + time * 60000
										);
										slots.push(
											`${startTime.toTimeString().slice(0, 5)} - ${nextTime
												.toTimeString()
												.slice(0, 5)}`
										);
										startTime = nextTime;
									}

									return slots;
								}
							);

							availableTimes.forEach(timeSlot => {
								const listItem = document.createElement("li");
								listItem.textContent = timeSlot;
								listItem.style.listStyle = "none";
								listItem.style.background = "#D9D9D9";
								listItem.style.width = "8rem";
								listItem.style.height = "3rem";
								listItem.style.display = "flex";
								listItem.style.justifyContent = "center";
								listItem.style.alignItems = "center";
								listItem.style.borderRadius = "0.5rem";
								listItem.style.cursor = "pointer";

								// Evento de clique para mudar a cor do item selecionado
								listItem.addEventListener("click", () => {
									// Resetar todos os itens para cinza
									document.querySelectorAll("#hoursToWork li").forEach(li => {
										li.style.background = "#D9D9D9";
										hourSelected = listItem.textContent.split(" - ")[0];
									});

									// Definir o item clicado como amarelo
									listItem.style.background = "#DEE33E";
								});

								hoursToWork.appendChild(listItem);
								hoursToWork.style.display = "flex";
								hoursToWork.style.gap = "1rem";
								hoursToWork.style.flexWrap = "wrap";
							});
						} catch (error) {
							const hoursToWork = document.getElementById("hoursToWork");
							hoursToWork.innerHTML = "Funcionário não trabalha esse dia";

							hourSelected = null;
							dateDaySelected = null;
							console.error("Erro no fetch:", error);
						}

						// Remove a seleção de todos os outros funcionários
						document.querySelectorAll(".selected-staff").forEach(el => {
							el.classList.remove("selected-staff");
							el.style.background = "#D9D9D9"; // Voltar para a cor padrão
						});

						// Adiciona a seleção no clicado
						div.classList.add("selected-staff");
						div.style.background = "#DEE33E"; // Muda a cor do selecionado
					});

					selectStaff.appendChild(div);
					containerContent.appendChild(selectStaff);
				});

				const dateInput = document.createElement("input");
				dateInput.type = "date";
				dateInput.id = "calendar-input";

				const now = new Date();
				const year = now.getFullYear();
				const month = String(now.getMonth() + 1).padStart(2, "0"); // Mês começa do 0, então +1
				const day = String(now.getDate()).padStart(2, "0");

				const today = `${year}-${month}-${day}`;
				dateInput.min = today;
				dateInput.value = today;
				dateInput.style.width = "fit-content";

				dateInput.addEventListener("change", async () => {
					const dataDay = dateInput.value;

					if (!lastIdStaff) {
						const hoursToWork = document.getElementById("hoursToWork");
						hoursToWork.innerHTML = "Selecione um funcionário";
						return;
					}

					try {
						const response = await fetch(
							"http://localhost:3000/api/customer/company/services/staff/schedule",
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json"
								},
								body: JSON.stringify({idStaff: lastIdStaff, date: dataDay})
							}
						);

						hourSelected = null;
						dateDaySelected = dataDay;

						if (!response.ok) {
							throw new Error("Erro ao enviar dados");
						}

						hoursToWork.innerHTML = "";
						const data = await response.json();

						const availableTimes = data.getSchedules.availableTimes.flatMap(
							({start, end}) => {
								const slots = [];
								let startTime = new Date(`2000-01-01T${start}`);
								const endTime = new Date(`2000-01-01T${end}`);

								while (
									startTime.getTime() + time * 60000 <=
									endTime.getTime()
								) {
									const nextTime = new Date(startTime.getTime() + time * 60000);
									slots.push(
										`${startTime.toTimeString().slice(0, 5)} - ${nextTime
											.toTimeString()
											.slice(0, 5)}`
									);
									startTime = nextTime;
								}

								return slots;
							}
						);

						availableTimes.forEach(timeSlot => {
							const listItem = document.createElement("li");
							listItem.textContent = timeSlot;
							listItem.style.listStyle = "none";
							listItem.style.background = "#D9D9D9";
							listItem.style.width = "8rem";
							listItem.style.height = "3rem";
							listItem.style.display = "flex";
							listItem.style.justifyContent = "center";
							listItem.style.alignItems = "center";
							listItem.style.borderRadius = "0.5rem";
							listItem.style.cursor = "pointer";

							// Evento de clique para mudar a cor do item selecionado
							listItem.addEventListener("click", () => {
								// Resetar todos os itens para cinza
								document.querySelectorAll("#hoursToWork li").forEach(li => {
									li.style.background = "#D9D9D9";
									hourSelected = listItem.textContent.split(" - ")[0];
								});

								// Definir o item clicado como amarelo
								listItem.style.background = "#DEE33E";
							});

							hoursToWork.appendChild(listItem);
							hoursToWork.style.display = "flex";
							hoursToWork.style.gap = "1rem";
							hoursToWork.style.flexWrap = "wrap";
						});
					} catch (error) {
						const hoursToWork = document.getElementById("hoursToWork");
						hoursToWork.innerHTML = "Funcionário não trabalha esse dia";

						hourSelected = null;
						dateDaySelected = null;
						console.error("Erro no fetch:", error);
					}
				});

				containerContent.appendChild(dateInput);
				containerContent.appendChild(hoursToWork);

				div.appendChild(containerContent);

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
