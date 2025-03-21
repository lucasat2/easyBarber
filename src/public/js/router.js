import login from "./pages/login.js";
import signUp from "./pages/signUp.js";
import acesso from "./pages/acesso.js";

const routes = {
    "/": login,
    "/login": login,
    "/signUp": signUp,
    "/acesso": acesso,

    getPage(path) {
        console.log("Buscando rota:", path);
    
        if (this[path]) {
            return this[path]();
        } 
        console.error(`Rota não encontrada: ${path}`);
        return null
    }
    
};

export default routes;