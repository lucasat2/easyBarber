import Header from "./Header.js";
import StartYourBooking from "./StartYourBooking.js";
import NotFound from "./NotFound.js";
import { MessageNotification } from "../MessageNotification.js";

export default function Main() {
	const root = document.getElementById("root");
	root.innerHTML = "";

	try {
		const container = document.createElement("div");

		const header = Header();
		container.appendChild(header);

		const page = document.createElement("div");
		page.id = "page";
		page.style.width = "100%";

		const start = StartYourBooking();
		page.appendChild(start);

		container.appendChild(page);

		return container;
	} catch (err) {
		MessageNotification(err.message, "#ff6347");
		NotFound();
	}
}
