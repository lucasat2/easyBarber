import Header from "./Header.js";
import ServicesPage from "./ServicesPage.js";
import ConfirmScheduling from "./ConfirmScheduling.js";
import {MessageNotification} from "../MessageNotification.js";

function navigateTo(pageFunction, obj) {
	const root = document.getElementById("root");
	root.innerHTML = "";
	root.style.minHeight = "100vh";
	root.appendChild(Header(objCompany.companyName));
	root.appendChild(pageFunction(obj));
}

async function fetchStaffServices(idCompany, idService) {
	const apiUrl = "/api/customer/company/services/staff";

	try {
		const res = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({idCompany, idService})
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.error || "Serviços não encontrados.");
		}

		const data = await res.json();

		if (data.result) {
			return data.result;
		} else {
			throw new Error("Serviços não encontrados.");
		}
	} catch (e) {
		MessageNotification(e.message, "#ff6347");
	}
}

async function fetchCompanyServices(idCompany) {
	const apiUrl = "/api/customer/company/services";

	try {
		const res = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({idCompany})
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.error || "Erro ao buscar os serviços.");
		}

		const data = await res.json();

		if (data.result) {
			return data.result;
		} else {
			throw new Error("Serviços não encontrados.");
		}
	} catch (e) {
		MessageNotification(e.message, "#ff6347");
		return null;
	}
}

async function updateAvailableTimes(
	idStaff,
	date,
	time,
	hoursToWork,
	setHourSelected,
	setDateDaySelected
) {
	try {
		const response = await fetch(
			"/api/customer/company/services/staff/schedule",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({idStaff, date})
			}
		);

		if (!response.ok) {
			hoursToWork.innerHTML = "Funcionário não trabalha esse dia";
			setHourSelected(null);
			setDateDaySelected(null);
			return;
		}

		hoursToWork.innerHTML = "";
		const data = await response.json();

		if (!data.getSchedules || !data.getSchedules.availableTimes) {
			hoursToWork.innerHTML = "Funcionário não trabalha esse dia";
			setHourSelected(null);
			setDateDaySelected(null);
			return;
		}

		const availableTimes = data.getSchedules.availableTimes.flatMap(
			({start, end}) => {
				const slots = [];
				let startTime = new Date(`2000-01-01T${start}`);
				const endTime = new Date(`2000-01-01T${end}`);

				while (startTime.getTime() + time * 60000 <= endTime.getTime()) {
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

		if (availableTimes.length === 0) {
			hoursToWork.innerHTML = "Funcionário indisponível";
			setHourSelected(null);
			setDateDaySelected(null);
			return;
		}

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

			listItem.addEventListener("click", () => {
				document.querySelectorAll("#hoursToWork li").forEach(li => {
					li.style.background = "#D9D9D9";
				});
				setHourSelected(listItem.textContent.split(" - ")[0]);
				listItem.style.background = "#DEE33E";
			});

			hoursToWork.appendChild(listItem);
			hoursToWork.style.display = "flex";
			hoursToWork.style.gap = "1rem";
			hoursToWork.style.flexWrap = "wrap";
			hoursToWork.style.justifyContent = "center";
			hoursToWork.style.width = "fit-content";
		});
	} catch (error) {
		hoursToWork.innerHTML = "Funcionário não trabalha esse dia";
		setHourSelected(null);
		setDateDaySelected(null);
		console.error("Erro no fetch:", error);
	}
}

let objCompany = null;

export default function ScheduleAppointment() {
	const root = document.getElementById("root");
	root.style.width = "100%";

	const container = document.createElement("div");

	const urlParams = new URLSearchParams(window.location.search);
	const idCompany = urlParams.get("idCompany");
	const idService = urlParams.get("idService");

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
				objCompany = {idCompany, companyName};

				container.appendChild(header);
				buildContent(container, idService);
			} else {
				container.innerHTML = "Empresa não encontrada.";
			}
		})
		.catch(error => {
			console.error("Erro ao buscar o nome da empresa:", error.message);
			container.innerHTML = "Erro ao buscar o nome da empresa.";
		});

	async function buildContent(container, idService) {
		const content = document.createElement("div");
		let serviceNames = "";
		let time = "";
		let cost = "";

		let lastIdStaff = null;
		let dateDaySelected = null;
		let hourSelected = null;
		let objStaff = null;
		let objService = null;

		const services = await fetchCompanyServices(idCompany);

		const selectedService = services.find(service => service.id == idService);

		if (selectedService) {
			serviceNames = selectedService.name;
			time = selectedService.average_duration;
			cost = selectedService.price;
			objService = {
				id: selectedService.id,
				name: selectedService.name,
				time: selectedService.average_duration,
				cost: selectedService.price
			};
		} else {
			console.error("Serviço não encontrado com o ID:", idService);

			container.innerHTML = "Serviço não encontrado.";
			return;
		}

		fetchStaffServices(idCompany, idService)
			.then(staffs => {
				const maxWidth = "800px";
				const div = document.createElement("div");
				div.style.display = "flex";
				div.style.flexWrap = "wrap";
				div.style.gap = "1rem";

				const confirm = document.createElement("div");
				confirm.style.width = "270px";
				confirm.style.height = "90vh";
				confirm.style.borderRight = "1px solid #E2E2E5";
				confirm.style.display = "flex";
				confirm.style.flexDirection = "column";
				confirm.style.justifyContent = "space-between";
				confirm.style.alignItems = "center";
				confirm.style.padding = "1.5rem";

				const contentService = document.createElement("div");
				contentService.style.display = "flex";
				contentService.style.flexDirection = "column";
				contentService.style.alignItems = "center";
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
				containerContent.style.display = "flex";
				containerContent.style.flexDirection = "column";
				containerContent.style.gap = "2rem";
				containerContent.style.paddingBottom = "2rem";

				const contentServiceInformation = document.createElement("div");

				const nameWrapper = document.createElement("div");
				nameWrapper.style.display = "flex";
				nameWrapper.style.gap = "0.5rem";
				nameWrapper.style.alignItems = "center";

				const nameText = document.createElement("h3");
				nameText.textContent = serviceNames.trim();

				nameWrapper.appendChild(nameText);

				const timeWrapper = document.createElement("div");
				timeWrapper.style.display = "flex";
				timeWrapper.style.gap = "0.5rem";
				timeWrapper.style.alignItems = "center";

				const timeIcon = document.createElement("img");
				timeIcon.src = "../assets/externalSchedulingPage/time.svg";
				timeIcon.alt = "Ícone tempo";
				timeIcon.style.width = "24px";

				const timeText = document.createElement("p");
				timeText.textContent = `Tempo: ${time} min`;

				timeWrapper.appendChild(timeIcon);
				timeWrapper.appendChild(timeText);

				const costWrapper = document.createElement("div");
				costWrapper.style.display = "flex";
				costWrapper.style.gap = "0.5rem";
				costWrapper.style.alignItems = "center";

				const costIcon = document.createElement("img");
				costIcon.src = "../assets/externalSchedulingPage/payments.svg";
				costIcon.alt = "Ícone custo";
				costIcon.style.width = "24px";

				const costText = document.createElement("p");
				costText.textContent = `R$ ${cost.toString().replace(".", ",")}`;

				costWrapper.appendChild(costIcon);
				costWrapper.appendChild(costText);

				contentServiceInformation.appendChild(nameWrapper);
				contentServiceInformation.appendChild(timeWrapper);
				contentServiceInformation.appendChild(costWrapper);

				chosenService.appendChild(imageService);
				chosenService.appendChild(contentServiceInformation);

				const back = document.createElement("div");
				back.innerText = "Alterar serviço";
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
					navigateTo(ServicesPage, objCompany);
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
						MessageNotification("Preencha todos os campos", "#ff6347");
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
				containerContent.style.alignItems = "center";

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
						containerContent.style.marginBottom = "6.5rem";
					} else {
						button.style.position = "relative";
						button.style.bottom = "auto";
						button.style.left = "auto";
						button.style.transform = "none";
						confirm.style.width = "270px";
						confirm.style.borderRight = "1px solid #E2E2E5";
						confirm.style.height = "80vh";
						containerContent.style.width = "calc(100% - 300px)";
					}
				}

				let mediaQuery = window.matchMedia(`(max-width: ${maxWidth})`);

				mediaQuery.addEventListener("change", handleScreenChange);
				handleScreenChange(mediaQuery);

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

					div.addEventListener("click", async () => {
						const calendar = document.getElementById("calendar-input");
						const idStaff = staff.id;
						objStaff = {id: staff.id, name: `${staff.name} ${staff.surname}`};
						lastIdStaff = idStaff;
						const dateDay = calendar.value;

						hourSelected = null;
						dateDaySelected = dateDay;

						await updateAvailableTimes(
							idStaff,
							dateDay,
							time,
							hoursToWork,
							value => (hourSelected = value),
							value => (dateDaySelected = value)
						);

						document.querySelectorAll(".selected-staff").forEach(el => {
							el.classList.remove("selected-staff");
							el.style.background = "#D9D9D9";
						});

						div.classList.add("selected-staff");
						div.style.background = "#DEE33E";
					});

					selectStaff.appendChild(div);
					containerContent.appendChild(selectStaff);
				});

				const dateInput = document.createElement("input");
				dateInput.type = "date";
				dateInput.id = "calendar-input";

				dateInput.style.padding = "8px 12px";
				dateInput.style.border = "1px solid #ccc";
				dateInput.style.borderRadius = "8px";
				dateInput.style.backgroundColor = "#f9f9f9";
				dateInput.style.fontSize = "16px";
				dateInput.style.color = "#333";
				dateInput.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
				dateInput.style.outline = "none";
				dateInput.style.transition = "border-color 0.3s, box-shadow 0.3s";
				dateInput.style.width = "fit-content";

				dateInput.addEventListener("focus", () => {
					dateInput.style.borderColor = "#5c9ded";
					dateInput.style.boxShadow = "0 0 0 3px rgba(92, 157, 237, 0.3)";
				});

				dateInput.addEventListener("blur", () => {
					dateInput.style.borderColor = "#ccc";
					dateInput.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
				});

				const now = new Date();
				const year = now.getFullYear();
				const month = String(now.getMonth() + 1).padStart(2, "0");
				const day = String(now.getDate()).padStart(2, "0");

				const today = `${year}-${month}-${day}`;
				dateInput.min = today;
				dateInput.value = today;

				dateInput.addEventListener("change", async () => {
					const dataDay = dateInput.value;

					if (!lastIdStaff) {
						const hoursToWork = document.getElementById("hoursToWork");
						hoursToWork.innerHTML = "Selecione um funcionário";
						return;
					}

					hourSelected = null;
					dateDaySelected = dataDay;

					await updateAvailableTimes(
						lastIdStaff,
						dataDay,
						time,
						hoursToWork,
						value => (hourSelected = value),
						value => (dateDaySelected = value)
					);
				});

				containerContent.appendChild(dateInput);

				const containerHoursToWork = document.createElement("div");
				containerHoursToWork.style.width = "100%";
				containerHoursToWork.style.display = "flex";
				containerHoursToWork.style.justifyContent = "center";

				containerHoursToWork.appendChild(hoursToWork);
				containerContent.appendChild(containerHoursToWork);

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
