import navigateTo from "./NavigateTo.js";
import ScheduleAppointment from "./ScheduleAppointment.js";
import {MessageNotification} from "../MessageNotification.js";
import NotFound from "./NotFound.js";
import NothingHere from "./NothingHere.js";

export default function ServicesPage() {
	const container = document.createElement("div");

	const urlParams = new URLSearchParams(window.location.search);
	const idCompany = urlParams.get("idCompany");

	if (!idCompany) {
		MessageNotification("ID da empresa não encontrado na URL.", "#ff6347");
		NotFound();
		return;
	}

	buildContent(container, idCompany);

	return container;
}

async function fetchCompanyServices(idCompany) {
	try {
		const apiUrl = "/api/customer/company/services";

		const res = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({idCompany})
		});

		if (!res.ok) {
			const errData = await res.json();
			throw new Error(errData.error || "Erro ao buscar os serviços.");
		}

		const data = await res.json();

		if (!data.result) {
			throw new Error("Serviços não encontrados.");
		}

		return data.result;
	} catch (error) {
		MessageNotification(error.message, "#ff6347");
		throw error;
	}
}

function buildContent(container, idCompany) {
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
			services.forEach(service => {
				const div = document.createElement("div");
				div.style.cursor = "pointer";
				div.style.width = "400px";
				div.style.height = "270px";
				div.style.borderRadius = "10px";
				div.style.overflow = "hidden";
				div.style.position = "relative";
				div.style.display = "flex";
				div.style.flexDirection = "column";
				div.style.justifyContent = "end";
				div.style.padding = "1.3rem 1rem";

				const arrow = document.createElement("div");
				arrow.style.height = "35px";
				arrow.style.width = "35px";
				arrow.style.position = "absolute";
				arrow.style.right = "1.4rem";
				arrow.style.bottom = "1rem";
				arrow.style.zIndex = "2";
				arrow.style.transition = "all 0.3s";
				arrow.style.backgroundImage =
					"url('../../../../../assets/externalSchedulingPage/arrow.svg')";
				arrow.style.backgroundPosition = "center";
				arrow.style.backgroundRepeat = "no-repeat";
				arrow.style.backgroundSize = "contain";
				arrow.style.opacity = "0";
				div.appendChild(arrow);

				const bgEffect = document.createElement("div");
				bgEffect.style.position = "absolute";
				bgEffect.style.inset = "0";
				bgEffect.style.borderRadius = "10px";
				bgEffect.style.backgroundImage =
					"url('../../../../../assets/externalSchedulingPage/serviceImage.jpeg')";
				bgEffect.style.backgroundSize = "cover";
				bgEffect.style.backgroundPosition = "center";
				bgEffect.style.backgroundRepeat = "no-repeat";
				bgEffect.style.transition = "all 0.3s ease, filter 0.3s ease";
				bgEffect.style.zIndex = "0";
				bgEffect.style.pointerEvents = "none";
				div.appendChild(bgEffect);

				const overlay = document.createElement("div");
				overlay.style.position = "absolute";
				overlay.style.inset = "0";
				overlay.style.borderRadius = "10px";
				overlay.style.background =
					"linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)";
				overlay.style.opacity = "0";
				overlay.style.transition = "all 0.3s ease-in-out";
				overlay.style.pointerEvents = "none";
				overlay.style.zIndex = "1";
				div.appendChild(overlay);

				div.addEventListener("click", () => {
					const idService = service.id;
					const url = `/client?idCompany=${idCompany}&idService=${idService}`;
					window.history.pushState({path: url}, "", url);
					navigateTo(ScheduleAppointment);
				});

				div.addEventListener("mouseover", () => {
					overlay.style.opacity = "1";
					descriptionWrapper.style.maxHeight = "9em";
					bgEffect.style.transform = "scale(1.1)";
					bgEffect.style.filter = "blur(2px)";
					arrow.style.right = "1rem";
					arrow.style.opacity = "1";
				});
				div.addEventListener("mouseout", () => {
					overlay.style.opacity = "0";
					descriptionWrapper.style.maxHeight = "4.5em";
					bgEffect.style.transform = "scale(1)";
					bgEffect.style.filter = "blur(0)";
					arrow.style.right = "1.4rem";
					arrow.style.opacity = "0";
				});

				const serviceDiv = document.createElement("div");
				serviceDiv.style.color = "white";
				serviceDiv.style.display = "flex";
				serviceDiv.style.flexDirection = "column";
				serviceDiv.style.gap = "1rem";
				serviceDiv.style.position = "relative";
				serviceDiv.style.zIndex = "2";

				const serviceContent = document.createElement("div");
				serviceContent.style.display = "flex";
				serviceContent.style.justifyContent = "space-between";
				serviceContent.style.alignItems = "end";

				const name = document.createElement("h3");
				name.innerText = service.name;

				const costWrapper = document.createElement("div");
				costWrapper.style.display = "flex";
				costWrapper.style.flexDirection = "column";
				costWrapper.style.gap = "0.3rem";

				const time = document.createElement("div");
				time.innerText = `${service.average_duration} min`;
				time.style.fontWeight = "600";

				const price = document.createElement("div");
				price.innerText = `R$ ${service.price.toString().replace(".", ",")}`;
				price.style.fontWeight = "600";

				costWrapper.appendChild(time);
				costWrapper.appendChild(price);
				serviceContent.appendChild(name);
				serviceContent.appendChild(costWrapper);

				const serviceDescription = document.createElement("div");
				serviceDescription.style.display = "flex";
				serviceDescription.style.flexDirection = "column";
				serviceDescription.style.gap = "0.5rem";

				const title = document.createElement("p");
				title.textContent = "Descrição:";

				const descriptionWrapper = document.createElement("div");
				descriptionWrapper.style.maxHeight = "4.5em";
				descriptionWrapper.style.overflow = "hidden";
				descriptionWrapper.style.transition = "max-height 0.3s ease-in-out";

				const description = document.createElement("p");
				description.textContent = service.description;
				description.style.whiteSpace = "normal";
				description.style.wordBreak = "break-word";

				descriptionWrapper.appendChild(description);
				serviceDescription.appendChild(title);
				serviceDescription.appendChild(descriptionWrapper);

				serviceDiv.appendChild(serviceContent);
				serviceDiv.appendChild(serviceDescription);
				div.appendChild(serviceDiv);

				cardsServices.appendChild(div);
			});
		})
		.catch(err => {
			console.error("Erro ao buscar os serviços:", err);
			MessageNotification(err.message, "#ff6347");
			content.appendChild(
				NothingHere(
					"Esta empresa ainda não disponibilizou seus serviços",
					"../../../../../assets/externalSchedulingPage/build.svg"
				)
			);
			return;
		});

	content.appendChild(cardsServices);
	container.appendChild(content);
}
