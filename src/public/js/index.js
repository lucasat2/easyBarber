import router from "./router.js";
import login from "./pages/login.js";

const currentPage = document.getElementById("root");

async function checkSession() {
  try {
    
    const response = await fetch('/api/login/checkLogin');
    if (!response.ok) throw new Error('Sessão inválida');
    const data = await response.json();
    console.log("Sessão ativa:", data.user);
    return data;

  } catch (error) {
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }
}

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
  await checkSession();
  changePage();
}

window.addEventListener("load", onPageLoad);