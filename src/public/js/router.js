import landing from"./pages/landingPage.js";
import login from "./pages/login.js";
import signup from "./pages/signUp.js";
import dashboard from "./pages/components/navBar.js";
import client from "./pages/components/clientPages/index.js";

function router() {
  const routes = {
    "/": landing,
    "/login": login,
    "/client": client,
    "/signup": signup,
    "/dashboard": dashboard,

    getPage: function (path) {
      return routes[path];
    },
  };
  return routes;
}
export default router;
