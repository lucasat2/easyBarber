import login from "./pages/login.js";
import signUp from "./pages/signUp.js";


function router() {
  const routes = {
    "/": login,
    "/signUp": signUp,

    getPage: function (path) {
      return routes[path];
    },
  };
  return routes;
}
export default router;
