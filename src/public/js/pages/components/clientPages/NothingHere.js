export default function NothingHere(message = "Algo deu errado", imgSrc = "../../../../../assets/externalSchedulingPage/person_off.svg") {
	const container = document.createElement("div");
	container.style.height = "100%";
	container.style.width = "100%";
	container.style.display = "flex";
	container.style.flexDirection = "column";
	container.style.alignItems = "center";
	container.style.justifyContent = "center";
	container.style.textAlign = "center";

	const imgWrapper = document.createElement("div");
	imgWrapper.style.width = "120px";
	imgWrapper.style.height = "120px";

	const img = document.createElement("img");
	img.src = imgSrc;
	img.style.width = "100%";
	img.style.height = "100%";
	img.style.objectFit = "contain";

	imgWrapper.appendChild(img);

	const text = document.createElement("p");
	text.textContent = message;
	text.style.fontSize = "1.25rem";
	text.style.fontWeight = "500";
	text.style.color = "#333333";

	container.appendChild(imgWrapper);
	container.appendChild(text);

	return container;
}
