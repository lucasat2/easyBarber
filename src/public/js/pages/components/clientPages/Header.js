// Header.js
export default function Header(companyName) {
	const header = document.createElement("header");
	header.style.display = "flex";
	header.style.alignItems = "center";
	header.style.flexWrap = "wrap";
	header.style.justifyContent = "space-between";
	header.style.background = "#ddd";
	header.style.padding = "10px 20px";

	const logo = document.createElement("img");
	logo.src =
		"../../../../../assets/externalSchedulingPage/Pngtree-barbershop.png";
	logo.alt = "Logo da Barbearia";
	logo.style.height = "7rem";

	const title = document.createElement("h1");
	title.textContent = companyName;

	header.appendChild(logo);
	header.appendChild(title);

	return header;
}
