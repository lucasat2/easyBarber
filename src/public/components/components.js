import login from "./login.js";
import signUp from "./signUp.js";
import acesso from "./acesso.js";

const app = document.getElementById("app");
const link = document.createElement("link");
link.id = "dynamic-css";
link.rel = "stylesheet";
document.head.appendChild(link);

const pathname = window.location.pathname.replace("/", "");

if (pathname === "login" || pathname === "") {
    app.appendChild(login);
    link.href = "./css/login.css";
} else if (pathname === "signUp") {
    app.appendChild(signUp);
    link.href = "./css/signUp.css";
} else if (pathname === "acesso") {
    app.appendChild(acesso);
    link.href = "./css/acesso.css";
} else {
    app.innerHTML = "<h1>Página não encontrada</h1>";
}


window.addEventListener("popstate", () => {
    location.reload(); 
});
