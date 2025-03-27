import login from "./pages/login.js";
import signUp from "./pages/signUp.js";
import dashboard from "./pages/components/navBar.js";

function router() {
	const routes = {
		"/": login,
		"/signUp": signUp,
		"/dashboard": dashboard,

		getPage: function (path) {
			return routes[path];
		}
	};
	return routes;
}
export default router;
