import router from "./router.js";

const objectRouter = router();

const link = document.getElementById("dynamic-css");

const currentPage = document.getElementById("root");

document.addEventListener("onstatechange", function (event) {
  const pathPage = event.detail.path;

  const page = objectRouter.getPage(pathPage)?.();

  history.pushState({}, "", pathPage);

  currentPage.innerHTML = "";

  currentPage.appendChild(page);

  if (pathPage === "/") {
    link.href = "./css/login.css";
  } else if (pathPage === "/signUp") {
    link.href = "./css/signUp.css";
  }  else {
    console.warn("Sem CSS definido para essa rota:", pathPage);
    link.href = "";
  }
});

currentPage.appendChild(objectRouter.getPage("/")?.());
link.href = "./css/login.css";
