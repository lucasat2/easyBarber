export default function Header() {
	const header = document.createElement("header");
	header.style.display = "flex";
	header.style.alignItems = "center";
	header.style.flexWrap = "wrap";
	header.style.justifyContent = "end";
	header.style.gap = "1rem";
	header.style.borderBottom = "1px solid #E3E3E6";
	header.style.padding = "1rem 3rem";
	header.style.boxSizing = "border-box";
	header.style.textAlign = "center";
	header.style.height = "6rem";

	const title = document.createElement("h1");
	title.textContent = "";
	title.style.fontSize = "2rem";
	title.style.color = "#222";
	title.style.margin = "0";
	title.style.maxWidth = "100%";
	title.style.overflow = "hidden";
	title.style.textOverflow = "ellipsis";
	title.style.whiteSpace = "nowrap";
	title.style.flexGrow = "1";
	title.style.textAlign = "right";

	header.appendChild(title);

	// Retornamos os dois para poder manipular externamente
	return { header, title };
}
