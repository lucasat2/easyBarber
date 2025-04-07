export default function NotFoundCompany() {
	const root = document.getElementById("root")
	root.innerHTML = ""; // Limpa tudo
	const div = document.createElement("div");
	div.innerHTML = "ABORORA";
	root.appendChild(div);
}
