import router from "./router.js";
import login from "./pages/login.js";

const currentPage = document.getElementById("root");

function changePage() {
	const objectRouter = router();

	document.addEventListener("onstatechange", function (event) {
		const pathPage = event.detail.path;

		const page = objectRouter.getPage(pathPage)?.();

		history.pushState({}, "", pathPage);

		currentPage.innerHTML = "";

		currentPage.appendChild(page);
	});
	currentPage.appendChild(objectRouter.getPage("/")?.());
}

async function onPageLoad() {
	if (window.location.pathname === "/") {
		changePage();
		return;
	} else if (window.location.pathname === "/signup") {
		changePage();
		return;
	}

	// Verifica a autenticação antes de rotear
	const authResponse = await fetch("/api/me");
	if (authResponse.status === 200) {
		// Autenticado, roteia para o dashboard
		changePage();
	} else {
		// Não autenticado, roteia para a página inicial
		currentPage.innerHTML = "";

		currentPage.appendChild(login());

		history.pushState(null, null, "/");
		router();
	}
}

window.addEventListener("load", onPageLoad);
export {onPageLoad};
