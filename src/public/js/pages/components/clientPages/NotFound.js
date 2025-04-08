export default function NotFoundCompany() {
	const root = document.getElementById("root");
	root.innerHTML = "";
	root.style.width = "100%";
	root.style.minHeight = "100vh";
	root.style.height = "100%";
	root.style.display = "flex";
	root.style.justifyContent = "center";
	root.style.alignItems = "center";

	const div = document.createElement("div");
	div.style.display = "flex";
	div.style.flexDirection = "column";
	div.style.alignItems = "center";
	div.style.gap = "1rem";

	const imgContainer = document.createElement("div");
	imgContainer.style.width = "250px";
	imgContainer.style.height = "250px";

	const imageService = document.createElement("img");
	imageService.style.width = "100%";
	imageService.src = "../../../../../assets/externalSchedulingPage/404.svg";

	const textContainer = document.createElement("div");

	const textContainerTitle = document.createElement("h1");
	textContainerTitle.textContent = "404";
	textContainerTitle.style.color = "#868686";
	textContainerTitle.style.textAlign = "center";
	textContainerTitle.style.fontSize = "5rem";

	const textContainerSubtitle = document.createElement("p");
	textContainerSubtitle.textContent =
		"Houve um erro durante o processo. Sentimos muito por isso e vamos resolver o mais breve possível.";
	textContainerSubtitle.style.color = "#868686";
	textContainerSubtitle.style.textAlign = "center";
	textContainerSubtitle.style.fontSize = "1.2rem";
	textContainerSubtitle.style.maxWidth = "500px";

	textContainer.appendChild(textContainerTitle);
	textContainer.appendChild(textContainerSubtitle);

	imgContainer.appendChild(imageService);

	div.appendChild(imgContainer);
	div.appendChild(textContainer);
	root.appendChild(div);
}
