import router from "./router.js";
import login from "./pages/login.js";

const currentPage = document.getElementById("root");

async function checkSession() {
  try {
    const response = await fetch("/api/login/checkLogin");
    if (!response.ok) throw new Error("Sessão inválida");
    const data = await response.json();
    return data;
  } catch (error) {
    if (window.location.pathname !== '/login' && window.location.pathname !== '/client') {
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

  window.onpopstate = function () {
    const currentPath = window.location.pathname;
    const page = objectRouter.getPage(currentPath)?.();
    currentPage.innerHTML = "";
    if (page) currentPage.appendChild(page);
  };

  const currentPath = window.location.pathname;
  const page = objectRouter.getPage(currentPath)?.();

  currentPage.innerHTML = "";
  if (page) currentPage.appendChild(page);
  else currentPage.appendChild(login());
}


async function onPageLoad() {
  const currentPath = window.location.pathname;
  if (['/', '/login', '/signup'].includes(currentPath)) {
    changePage();
  } else {
    await checkSession();
    changePage();
  }
}

window.addEventListener("load", onPageLoad);