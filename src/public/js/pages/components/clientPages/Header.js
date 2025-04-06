// Header.js
export default function Header(companyName) {
	const header = document.createElement("header");
	header.style.display = "flex";
	header.style.alignItems = "center";
	header.style.flexWrap = "wrap";
	header.style.justifyContent = "space-between";
	header.style.gap = "1rem";
	header.style.background = "#ddd";
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
	title.textContent = companyName;
	title.style.fontSize = "2rem";
	title.style.wordBreak = "break-word";
	title.style.color = "#222";
	title.style.margin = "0";

	header.appendChild(logo);
	header.appendChild(title);

	return header;
}
