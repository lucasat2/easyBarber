import router from "./router.js";

const objectRouter = router();


const currentPage = document.getElementById("root");

document.addEventListener("onstatechange", function (event) {
  const pathPage = event.detail.path;

  const page = objectRouter.getPage(pathPage)?.();

  history.pushState({}, "", pathPage);

  currentPage.innerHTML = "";

  currentPage.appendChild(page);

});

currentPage.appendChild(objectRouter.getPage("/")?.());
