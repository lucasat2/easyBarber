import Header from "./Header.js";
import StartYourBooking from "./StartYourBooking.js";
import NotFound from "./NotFound.js";
import {MessageNotification} from "../MessageNotification.js";
import Footer from "./Footer.js";

export default function Main() {
	const root = document.getElementById("root");
	root.innerHTML = "";
	root.style.display = "flex";
	root.style.flexDirection = "column";
	root.style.minHeight = "100vh";
	root.style.margin = "0";

	try {
		const urlParams = new URLSearchParams(window.location.search);
		const idCompany = urlParams.get("idCompany");

		if (!idCompany) {
			throw new Error("ID da empresa não informado");
		}

		const container = document.createElement("div");
		container.style.display = "flex";
		container.style.flexDirection = "column";
		container.style.flexGrow = "1";
		container.style.minHeight = "100%";

		const {header, title} = Header();
		container.appendChild(header);

		const page = document.createElement("div");
		page.id = "page";
		page.style.flex = "1";
		page.style.minHeight = "calc(100vh - 6rem - 6rem)";

		const start = StartYourBooking();
		page.appendChild(start);

		container.appendChild(page);

		root.appendChild(container);

		// Agora sim, fetch do nome da empresa aqui
		fetch("/api/customer/company", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({idCompany})
		})
			.then(async res => {
				if (!res.ok) {
					const errorData = await res.json();
					throw new Error(errorData.error || "Erro ao buscar empresa");
				}
				return res.json();
			})
			.then(data => {
				if (!data.result) {
					throw new Error("Nome da empresa não disponível");
				}
				const objResult = data.result;
				title.textContent = objResult.name;

				const footer = Footer(objResult.email, objResult.phone);

				container.appendChild(footer);
			})
			.catch(err => {
				MessageNotification(err.message, "#ff6347");
				NotFound();
			});

		return container;
	} catch (err) {
		MessageNotification(err.message, "#ff6347");
		NotFound();
	}
}
