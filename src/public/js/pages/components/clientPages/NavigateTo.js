export default function navigateTo(pageFunction, data = null) {
	const page = document.getElementById("page");
	page.style.height = "100%"
	if (!page) {
		console.error("Elemento #page não encontrado");
		return;
	}
	page.innerHTML = "";
	const content = data ? pageFunction(data) : pageFunction();

	page.appendChild(content);
}
