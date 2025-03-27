import login from "./pages/login.js";
import signup from "./pages/signUp.js";
import dashboard from "./pages/components/navBar.js";

function router() {
	const routes = {
		"/": login,
		"/signup": signup,
		"/dashboard": dashboard,

		getPage: function (path) {
			return routes[path];
		}
	};
	return routes;
}
export default router;
