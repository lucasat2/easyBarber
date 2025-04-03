export default function DailyServicesModal(listObj) {
	const containerModal = document.createElement("div");
	containerModal.style.zIndex = "100";
	containerModal.style.width = "100%";
	containerModal.style.height = "100vh";
	containerModal.style.position = "fixed";
	containerModal.style.top = "0";
	containerModal.style.left = "0";
	containerModal.style.background = "#000000aa";
	containerModal.style.display = "flex";
	containerModal.style.justifyContent = "center";
	containerModal.style.alignItems = "center";

	containerModal.addEventListener("click", event => {
		if (event.target === containerModal) {
			// Garante que o clique foi no fundo
			containerModal.remove(); // Remove o modal completamente
		}
	});

	const divContent = document.createElement("div");
	divContent.style.width = "90%";
	divContent.style.height = "90%";
	divContent.style.background = "white";
	divContent.style.borderRadius = "1rem";
	divContent.style.padding = "4rem";
	divContent.style.position = "relative";
	divContent.style.display = "flex";
	divContent.style.justifyContent = "center";
	divContent.style.alignItems = "center";
	divContent.style.flexWrap = "wrap";
	divContent.style.gap = "4rem";
	divContent.style.overflow = "auto";

	const closeButton = document.createElement("div");
	closeButton.style.position = "fixed";
	closeButton.style.right = "1rem";
	closeButton.style.top = "1rem";
	closeButton.style.background = "#EB4335";
	closeButton.style.borderRadius = "50%";
	closeButton.style.height = "4rem";
	closeButton.style.width = "4rem";
	closeButton.style.display = "flex";
	closeButton.style.justifyContent = "center";
	closeButton.style.alignItems = "center";
	closeButton.style.cursor = "pointer";

	closeButton.addEventListener("click", () => {
		containerModal.remove(); // Remove o modal completamente
	});

	const crossLine1 = document.createElement("div");
	crossLine1.style.height = "2rem";
	crossLine1.style.width = "1px";
	crossLine1.style.background = "black";
	crossLine1.style.transform = "rotate(45deg)";

	const crossLine2 = document.createElement("div");
	crossLine2.style.height = "2rem";
	crossLine2.style.width = "1px";
	crossLine2.style.background = "black";
	crossLine2.style.transform = "rotate(-45deg)";

	closeButton.appendChild(crossLine1);
	closeButton.appendChild(crossLine2);

	divContent.appendChild(closeButton);
	// colocar um titulo para o dia q clico ne
	// divContent.appendChild(closeButton);

	listObj.forEach(e => {
		const container = document.createElement("div");
		container.style.width = "35rem";
		container.style.minHeightheight = "15rem";
		container.style.borderRadius = "1rem";
		container.style.background = e.status ? "#EB4335" : "#DEE33E";
		container.style.padding = "1rem";
		container.style.display = "flex";
		container.style.justifyContent = "center";
		container.style.flexDirection = "column";
		container.style.gap = ".7rem";

    // so vai ter o nome do cabelereiro
    // hora de começo
    // hora de termino
    // comentário
		container.innerHTML = `
      <h3>${e.professional}</h3>
      <p>Cliente: ${e.client}</p>
      <p>Email: ${e.email}</p>
      <p>Data: ${e.date}</p>
      <p>Hora: ${e.hour}</p>
      <p>Resumo: ${e.description}</p>
      <p>Preço: ${e.price}</p>
    `;

		divContent.appendChild(container);
	});

	containerModal.appendChild(divContent);

	return containerModal;
}
