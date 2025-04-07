import {MessageNotification} from "../MessageNotification.js";
import NotFound from "./NotFound.js";

export default function Header() {
	const header = document.createElement("header");
	header.style.display = "flex";
	header.style.alignItems = "center";
	header.style.flexWrap = "wrap";
	header.style.justifyContent = "space-between";
	header.style.gap = "1rem";
	header.style.borderBottom = "1px solid #E3E3E6";
	header.style.padding = "1rem 3rem";
	header.style.boxSizing = "border-box";
	header.style.textAlign = "center";

	const logo = document.createElement("img");
	logo.src =
		"../../../../../assets/externalSchedulingPage/Pngtree-barbershop.png";
	logo.alt = "Logo da Barbearia";
	logo.style.height = "5rem";
	logo.style.maxWidth = "100%";
	logo.style.flexShrink = "0";

	const title = document.createElement("h1");
	title.textContent = "";
	title.style.fontSize = "2rem";
	title.style.wordBreak = "break-word";
	title.style.color = "#222";
	title.style.margin = "0";

	header.appendChild(logo);
	header.appendChild(title);

	const urlParams = new URLSearchParams(window.location.search);
	const idCompany = urlParams.get("idCompany");

	if (!idCompany) {
		MessageNotification("ID da empresa não informado", "#ff6347");

		// Substitui conteúdo da página inteira
		const root = document.getElementById("root");
		if (root) {
			NotFound();
		}

		return header;
	}

	(async () => {
		try {
			const res = await fetch("/api/customer/company", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({idCompany})
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error || "Erro ao buscar empresa");
			}

			const data = await res.json();

			if (!data.result) {
				throw new Error("Nome da empresa não disponível");
			}

			title.textContent = data.result;
		} catch (err) {
			MessageNotification(err.message, "#ff6347");

			// Substitui conteúdo da página inteira
			const root = document.getElementById("root");
			if (root) {
				NotFound();
			}
		}
	})();

	return header;
}
