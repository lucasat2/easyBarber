// Footer.js
export default function Footer(email = "", phone = "") {
	const footer = document.createElement("footer");
	footer.style.padding = "2rem 1rem";
	footer.style.borderTop = "1px solid #E3E3E6";
	footer.style.backgroundColor = "#f9f9f9";
	footer.style.display = "flex";
	footer.style.justifyContent = "center";
	footer.style.height = "6rem";

	const content = document.createElement("div");
	content.style.display = "flex";
	content.style.flexDirection = "column";
	content.style.alignItems = "center";
	content.style.gap = "0.8rem";
	content.style.maxWidth = "1000px";
	content.style.width = "100%";
	content.style.fontFamily = "Arial, sans-serif";

	const label = document.createElement("span");
	label.textContent = "Informações de Contato";
	label.style.fontWeight = "600";
	label.style.fontSize = "1rem";
	label.style.color = "#222";

	const infoWrapper = document.createElement("div");
	infoWrapper.style.display = "flex";
	infoWrapper.style.flexWrap = "wrap";
	infoWrapper.style.gap = "1.5rem";
	infoWrapper.style.justifyContent = "center";

	if (email) {
		const emailEl = document.createElement("span");
		emailEl.style.color = "#444";
		emailEl.style.fontSize = "0.95rem";

		const emailLabel = document.createElement("strong");
		emailLabel.textContent = "Email:";
		emailEl.appendChild(emailLabel);
		emailEl.append(" " + email);

		infoWrapper.appendChild(emailEl);
	}

	if (phone) {
		const phoneEl = document.createElement("span");
		phoneEl.style.color = "#444";
		phoneEl.style.fontSize = "0.95rem";

		const phoneLabel = document.createElement("strong");
		phoneLabel.textContent = "Telefone:";
		phoneEl.appendChild(phoneLabel);
		phoneEl.append(" " + phone);

		infoWrapper.appendChild(phoneEl);
	}

	content.appendChild(label);
	if (email || phone) content.appendChild(infoWrapper);
	footer.appendChild(content);

	return footer;
}
