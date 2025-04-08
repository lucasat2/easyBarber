import ServicesPage from "./ServicesPage.js";
import ConfirmScheduling from "./ConfirmScheduling.js";
import {MessageNotification} from "../MessageNotification.js";
import navigateTo from "./NavigateTo.js";
import NotFound from "./NotFound.js";

function formatDateToBR(dateStr) {
	const container = document.createElement("div");
	container.style.width = "100%";
	container.style.border = "1px solid #c2c2c2";
	container.style.padding = "1rem";
	container.style.background = "#fbfbfe";
	container.style.borderRadius = "0.5rem";

	const title = document.createElement("p");
	title.textContent = "Data selecionada";
	title.style.fontWeight = "600";
	title.style.marginBottom = "0.2rem";

	let formattedDate;
	let dayOfWeek;

	if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
		const [year, month, day] = dateStr.split("-");
		const date = new Date(`${year}-${month}-${day}T00:00:00`);
		formattedDate = `${day}/${month}/${year}`;
		dayOfWeek = date.toLocaleDateString("pt-BR", {weekday: "long"});
	} else {
		const date = new Date(dateStr);
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();
		formattedDate = `${day}/${month}/${year}`;
		dayOfWeek = date.toLocaleDateString("pt-BR", {weekday: "long"});
	}

	const dateWrapper = document.createElement("div");
	dateWrapper.style.display = "flex";
	dateWrapper.style.alignItems = "center";
	dateWrapper.style.gap = "0.5rem";

	const dateEl = document.createElement("p");
	dateEl.textContent = `${dayOfWeek} - ${formattedDate}`;
	dateEl.style.fontSize = "1rem";
	dateEl.style.color = "#222";
	dateEl.style.margin = "0";
	dateEl.style.textTransform = "capitalize"; // Deixa "terça-feira" com a primeira letra maiúscula

	const dateIcon = document.createElement("img");
	dateIcon.src = "../assets/externalSchedulingPage/calendar.svg";
	dateIcon.alt = "Ícone de calendário";
	dateIcon.style.width = "25px";
	dateIcon.style.height = "25px";

	dateWrapper.appendChild(dateIcon);
	dateWrapper.appendChild(dateEl);
	container.appendChild(title);
	container.appendChild(dateWrapper);

	return container;
}

function showStaffUnavailable(texto, svg) {
	const wrapper = document.createElement("div");
	wrapper.style.width = "100%";
	wrapper.style.display = "flex";
	wrapper.style.flexDirection = "column";
	wrapper.style.justifyContent = "center";
	wrapper.style.alignItems = "center";
	wrapper.style.gap = "1rem";

	const img = document.createElement("img");
	img.src = svg;
	img.alt = texto;
	img.style.width = "120px";
	img.style.height = "120px";

	const text = document.createElement("p");
	text.innerText = texto;
	text.style.fontSize = "1.25rem";
	text.style.fontWeight = "500";
	text.style.color = "#333";

	wrapper.appendChild(img);
	wrapper.appendChild(text);

	return wrapper;
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
			hoursToWork.appendChild(
				showStaffUnavailable(
					"Funcionário indispoíveis",
					"../../../../../assets/externalSchedulingPage/person_off.svg"
				)
			);
			setHourSelected(null);
			setDateDaySelected(null);
			return;
		}

		hoursToWork.innerHTML = "";

		const data = await response.json();

		if (!data.getSchedules || !data.getSchedules.availableTimes) {
			hoursToWork.appendChild(
				showStaffUnavailable(
					"Funcionário indispoíveis",
					"../../../../../assets/externalSchedulingPage/person_off.svg"
				)
			);
			setHourSelected(null);
			setDateDaySelected(null);
			return;
		}

		const now = new Date();
		const todayString = `${now.getFullYear()}-${String(
			now.getMonth() + 1
		).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

		let availableTimes = data.getSchedules.availableTimes.flatMap(
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

		if (date === todayString) {
			availableTimes = availableTimes.filter(timeSlot => {
				const [startTimeStr] = timeSlot.split(" - ");
				const [hours, minutes] = startTimeStr.split(":").map(Number);

				const slotTime = new Date(
					now.getFullYear(),
					now.getMonth(),
					now.getDate(),
					hours,
					minutes
				);

				return slotTime >= now;
			});
		}

		if (availableTimes.length === 0) {
			hoursToWork.appendChild(
				showStaffUnavailable(
					"Funcionário indispoíveis",
					"../../../../../assets/externalSchedulingPage/person_off.svg"
				)
			);
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
				const btn = document.getElementById("btnConfirm");
				if (btn) {
					btn.style.display = "block";
					btn.scrollIntoView({behavior: "smooth", block: "center"});
				}
			});

			hoursToWork.appendChild(listItem);
			hoursToWork.style.display = "flex";
			hoursToWork.style.gap = "1rem";
			hoursToWork.style.flexWrap = "wrap";
			hoursToWork.style.justifyContent = "center";
			hoursToWork.style.width = "100%";
		});
	} catch (error) {
		hoursToWork.appendChild(
			showStaffUnavailable(
				"Funcionário indispoíveis",
				"../../../../../assets/externalSchedulingPage/person_off.svg"
			)
		);
		setHourSelected(null);
		setDateDaySelected(null);
		console.error("Erro no fetch:", error);
	}
}

let objCompany = null;

export default function ScheduleAppointment() {
	const mainDiv = document.createElement("div");

	const urlParams = new URLSearchParams(window.location.search);
	const idCompany = urlParams.get("idCompany");
	const idService = urlParams.get("idService");

	if (!idCompany) {
		throw new Error("ID da empresa não informado");
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
				objCompany = {idCompany, companyName};
				buildContent(mainDiv, idService);
			} else {
				throw new Error("Empresa não encontrada.");
			}
		})
		.catch(error => {
			MessageNotification(error.message, "#ff6347");
			mainDiv.innerHTML = "Erro ao buscar o nome da empresa.";
		});

	async function buildContent(mainDiv, idService) {
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
			mainDiv.innerHTML = "Serviço não encontrado.";
			MessageNotification("Serviço não encontrado", "#ff6347");
			return;
		}

		fetchStaffServices(idCompany, idService)
			.then(staffs => {
				const maxWidth = "800px";

				mainDiv.style.display = "flex";
				mainDiv.style.flexWrap = "wrap";
				mainDiv.style.gap = "1rem";
				mainDiv.style.minHeight = "calc(100vh - 6rem - 6rem)";

				const confirm = document.createElement("div");
				confirm.style.width = "320px";
				confirm.style.display = "flex";
				confirm.style.flexDirection = "column";
				confirm.style.padding = "1.5rem";
				confirm.style.gap = "2rem";
				confirm.style.alignItems = "center";

				const contentService = document.createElement("div");
				contentService.style.width = "100%";
				contentService.style.display = "flex";
				contentService.style.flexDirection = "column";
				contentService.style.alignItems = "center";
				contentService.style.gap = "1rem";

				const chosenService = document.createElement("div");
				chosenService.style.width = "100%";
				chosenService.style.display = "flex";
				chosenService.style.flexDirection = "column";
				chosenService.style.gap = "1rem";

				const imageService = document.createElement("img");
				imageService.src =
					"../../../../../assets/externalSchedulingPage/serviceImage.jpeg";
				imageService.style.width = "100%";

				const containerContent = document.createElement("div");
				containerContent.style.display = "flex";
				containerContent.style.flexDirection = "column";
				containerContent.style.gap = "2rem";
				containerContent.style.padding = "2rem";

				const contentServiceInformation = document.createElement("div");
				contentServiceInformation.style.background = "#fbfbfe"

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

				const divData = document.createElement("div");

				contentServiceInformation.appendChild(nameWrapper);
				contentServiceInformation.appendChild(timeWrapper);
				contentServiceInformation.appendChild(costWrapper);

				contentServiceInformation.style.border = "1px solid #c2c2c2";
				contentServiceInformation.style.padding = "1rem";
				contentServiceInformation.style.borderRadius = "0.5rem";

				chosenService.appendChild(imageService);
				chosenService.appendChild(contentServiceInformation);
				chosenService.appendChild(divData);

				const back = document.createElement("div");
				back.innerText = "Alterar serviço";
				back.style.background = "#d9d9d9";
				back.style.padding = "10px 20px";
				back.style.fontWeight = "700";
				back.style.textAlign = "center";
				back.style.cursor = "pointer";
				back.style.position = "relative";
				back.style.borderRadius = "8px";
				back.style.width = "fit-content";

				back.addEventListener("mouseover", () => {
					back.style.background = "#c0c0c0";
				});

				back.addEventListener("mouseout", () => {
					back.style.background = "#d9d9d9";
				});

				back.addEventListener("click", () => {
					navigateTo(ServicesPage, objCompany);
				});

				contentService.appendChild(chosenService);
				contentService.appendChild(back);

				const button = document.createElement("div");
				button.innerText = "Confirmar";
				button.id = "btnConfirm";
				button.style.display = "none";
				button.style.background = "#DEE33E";
				button.style.padding = "1rem 1.4rem";
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
				selectStaff.style.padding = "0 1.5rem";

				function handleScreenChange(e) {
					if (e.matches) {
						confirm.style.width = "100%";
						confirm.style.border = "none";
						confirm.style.minHeight = "auto";
						containerContent.style.width = "100%";
					} else {
						confirm.style.width = "320px";
						containerContent.style.width = "calc(100% - 336px)";
					}
				}

				let mediaQuery = window.matchMedia(`(max-width: ${maxWidth})`);

				mediaQuery.addEventListener("change", handleScreenChange);
				handleScreenChange(mediaQuery);

				confirm.appendChild(contentService);

				confirm.appendChild(button);
				mainDiv.appendChild(confirm);

				const hoursToWork = document.createElement("div");
				hoursToWork.id = "hoursToWork";
				hoursToWork.style.width = "100%";
				hoursToWork.appendChild(
					showStaffUnavailable(
						"Selecione um funcionário",
						"../../../../../assets/externalSchedulingPage/select_staff.svg"
					)
				);

				staffs.forEach(staff => {
					const div = document.createElement("div");
					div.style.borderRadius = "0.5rem";
					div.style.overflow = "hidden";
					div.style.width = "310px";
					div.style.height = "110px";
					div.style.display = "flex";
					div.style.justifyContent = "center";
					div.style.alignItems = "center";

					const cardDiv = document.createElement("div");
					cardDiv.id = staff.id;
					cardDiv.style.width = "300px";
					cardDiv.style.height = "100px";
					cardDiv.style.borderRadius = "0.5rem";
					cardDiv.style.cursor = "pointer";
					cardDiv.style.border = "1px solid #c2c2c2";
					cardDiv.style.background = "#fbfbfe";
					cardDiv.style.display = "flex";
					cardDiv.style.flexDirection = "column";
					cardDiv.style.justifyContent = "center";
					cardDiv.style.alignItems = "center";
					cardDiv.style.fontWeight = "700";
					cardDiv.style.position = "relative";
					cardDiv.style.overflow = "hidden";

					const divHeader = document.createElement("div");
					divHeader.style.position = "absolute";
					divHeader.style.bottom = "0";
					divHeader.style.width = "50%";
					divHeader.style.height = "0.4rem";
					divHeader.style.background = "#e0e0e0";
					divHeader.style.borderRadius = "0.5rem 0.5rem 0 0";
					divHeader.style.overflow = "hidden";
					divHeader.style.transition = "all 0.3s";
					divHeader.style.display = "flex";
					divHeader.style.justifyContent = "end";

					const cfm = document.createElement("div");
					cfm.style.width = "100%";
					cfm.style.height = "25px";
					cfm.style.position = "absolute";
					cfm.style.display = "none";
					cfm.style.justifyContent = "end";
					cfm.style.alignItems = "center";
					cfm.style.gap = "0.5rem";
					cfm.style.padding = "0.5rem";

					for (let i = 0; i < 1; i++) {
						const dot = document.createElement("div");
						dot.style.width = "15px";
						dot.style.height = "15px";
						dot.style.borderRadius = "50%";

						dot.style.backgroundColor = "#fbfbfe";
						cfm.appendChild(dot);
					}
					divHeader.appendChild(cfm);

					const paragraph = document.createElement("p");
					paragraph.textContent = `${staff.name} ${staff.surname}`;
					paragraph.style.fontSize = "1rem";
					paragraph.style.transition = "all 0.3s";
					paragraph.style.whiteSpace = "nowrap";
					paragraph.style.textOverflow = "ellipsis";
					paragraph.style.overflow = "hidden";
					paragraph.style.width = "100%";
					paragraph.style.textAlign = "center";
					paragraph.style.zIndex = "2";

					cardDiv.appendChild(divHeader);
					cardDiv.appendChild(paragraph);
					div.appendChild(cardDiv);

					div.addEventListener("click", async () => {
						const calendar = document.getElementById("calendar-input");
						const idStaff = staff.id;
						objStaff = {
							id: staff.id,
							name: `${staff.name} ${staff.surname}`
						};
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
							const headerDiv = el.querySelector(":scope > div");
							headerDiv.style.height = "0.4rem";
							headerDiv.style.width = "50%";

							const cfmDiv = headerDiv.querySelector("div");
							cfmDiv.style.display = "none";
						});

						cardDiv.classList.add("selected-staff");
						divHeader.style.width = "100%";
						divHeader.style.height = "100%";
						cfm.style.display = "flex";
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
				divData.innerHTML = "";
				divData.appendChild(formatDateToBR(today));

				dateInput.addEventListener("change", async () => {
					const dataDay = dateInput.value;
					divData.innerHTML = "";
					divData.appendChild(formatDateToBR(dataDay));

					if (!lastIdStaff) {
						const hoursToWork = document.getElementById("hoursToWork");
						hoursToWork.innerHTML = "";
						hoursToWork.appendChild(
							showStaffUnavailable(
								"Selecione um funcionário",
								"../../../../../assets/externalSchedulingPage/select_staff.svg"
							)
						);
						hoursToWork.style.width = "100%";
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
				containerHoursToWork.style.height = "100%";

				containerHoursToWork.appendChild(hoursToWork);
				containerContent.appendChild(containerHoursToWork);

				mainDiv.appendChild(containerContent);
			})
			.catch(error => {
				console.error("Erro ao buscar os serviços:", error);
				MessageNotification(error.message, "#ff6347");
				NotFound();
			});
	}

	return mainDiv;
}
