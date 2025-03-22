import router from "./router.js";
import onNavigate from "./event.js";

const objectRouter = router();

const link = document.getElementById("dynamic-css");

const actualPage = document.getElementById("root");

document.addEventListener("onstatechange", function (event) {
  const pathPage = event.detail.path;

  const page = objectRouter.getPage(pathPage)?.();

  history.pushState({}, "", pathPage);

  actualPage.innerHTML = "";

  actualPage.appendChild(page);

  if (pathPage === "/") {
    link.href = "./css/login.css";
  } else if (pathPage === "/signUp") {
    link.href = "./css/signUp.css";
  } else if (pathPage === "/acess") {
    link.href = "./css/acess.css";
  } else {
    console.warn("Sem CSS definido para essa rota:", pathPage);
    link.href = "";
  }
});

actualPage.appendChild(objectRouter.getPage("/")?.());
link.href = "./css/login.css";
