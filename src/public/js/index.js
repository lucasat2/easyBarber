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

  // Carrega a rota atual baseada na URL
  const currentPath = window.location.pathname;
  const page = objectRouter.getPage(currentPath)?.();

  currentPage.innerHTML = "";
  if (page) currentPage.appendChild(page);
  else currentPage.appendChild(login());
}

async function onPageLoad() {
  const currentPath = window.location.pathname;

  // Se for rota pública (como login ou cadastro), carrega direto
  if (["/", "/signup"].includes(currentPath)) {
    changePage();
    return;
  }

  // Verifica autenticação em rotas protegidas
  const authResponse = await fetch("/api/me");
  if (authResponse.status === 200) {
    // Autenticado → continua para a rota atual
    changePage();
  } else {
    // Não autenticado → volta para login
    currentPage.innerHTML = "";
    currentPage.appendChild(login());
    history.pushState(null, null, "/");
  }
}

window.addEventListener("load", onPageLoad);

export { onPageLoad };
