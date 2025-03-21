import router from "./router.js";
import onNavigate from "./event.js";

const root = document.getElementById("root");

const link = document.createElement("link");
link.id = "dynamic-css";
link.rel = "stylesheet";
document.head.appendChild(link);

function render(path) {
    console.log("Renderizando path:", path);
    const page = router.getPage(path);
    console.log(page);
    
        root.innerHTML = "";
        if (page) {
        root.appendChild(page);
    
        if (path === "/" || path === "/login") {
            link.href = "./css/login.css";
        } else if (path === "/signUp") {
            link.href = "./css/signUp.css";
        } else if (path === "/acesso") {
            link.href = "./css/acesso.css";
        } else {
            console.warn("Sem CSS definido para essa rota:", path);
            link.href = "";
        }
    
        if (window.location.pathname !== path) {
            history.pushState({}, "", path);
        }
        } else {
        root.innerHTML = "<h1>Página não encontrada</h1>";
        }
    }
    

window.addEventListener("onstatechange", (e) => {
    const path = e.detail.path;
    render(path);
});

window.addEventListener("popstate", () => {
    render(window.location.pathname);
});

render(window.location.pathname);