import login from "./pages/login.js";
import signup from "./pages/signUp.js";
import dashboard from "./pages/components/navBar.js";
import client from "./pages/components/clientPages/StratYoutBooking.js";

function router() {
  const routes = {
    "/": login,
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
