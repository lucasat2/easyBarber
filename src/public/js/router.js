import login from "./pages/login.js";
import signUp from "./pages/signUp.js";
import acess from "./pages/acess.js";

function router() {
  const routes = {
    "/": login,
    "/signUp": signUp,
    "/acess": acess,

    getPage: function (path) {
      return routes[path];
    },
  };
  return routes;
}
export default router;
