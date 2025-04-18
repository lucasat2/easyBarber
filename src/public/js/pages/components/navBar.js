import {InitialSchedulingTimelineSection} from "./schedulingComponent/InitialSchedulingTimelineSection.js";
import {MessageNotification} from "./MessageNotification.js";
import StaffManager from "./staffComponent/index.js";
import {ServiceDashboard} from "./serviceComponent/ServiceDashboard.js";
import {EditUserProfileModal} from "./editUserComponent/EditUserProfileModal.js";
import {generateRandomColor} from "./schedulingComponent/SchedulingTimelineEmployeesCard.js";

export default function header() {
	const root = document.getElementById("root");
	// Resetando a página
	root.style.background = "#F5F5F5";

	// Formatando as medidas
	root.style.width = "100%";

	// Começando o componente aqui

	// div que vai segurar o espaço para a NavBar
	// separando o espaço dela e o espaço que segura os outros componentes
	const divContainerNav = document.createElement("div");
	divContainerNav.style.display = "flex";

	const containerMain = document.createElement("div");
	containerMain.style.width = "100%";
	containerMain.style.border = "1px solid #E4E6EA";

	const main = document.createElement("main");
	// ao trocar o componente, tem q ser colocado aqui dentro
	main.id = "main";
	main.innerHTML = "";

	// componente do header em si
	const header = document.createElement("header");
	header.style.width = "100%";
	header.style.background = "white";
	header.style.padding = "0.8rem 2rem";
	header.style.display = "flex";
	header.style.justifyContent = "space-between";
	header.style.alignItems = "center";
	header.style.borderBottom = "1px solid #E4E6EA";

	// título da página
	const divTitleHeader = document.createElement("div");
	divTitleHeader.style.display = "flex";
	divTitleHeader.style.flexDirection = "column";
	divTitleHeader.style.gap = "0.5rem";

	const titleHeader = document.createElement("h1");
	titleHeader.id = "titleHeader";
	titleHeader.style.fontSize = "1.5rem";

	const divLinkAndProfile = document.createElement("div");
	divLinkAndProfile.style.display = "flex";
	divLinkAndProfile.style.columnGap = "20px";
	divLinkAndProfile.style.alignItems = "center";
	divLinkAndProfile.style.cursor = "pointer";

	const linkExternalPageField = document.createElement("a");
	linkExternalPageField.target = "_blank";
	linkExternalPageField.innerText = "Ir para a página de agendamento";
	linkExternalPageField.style.textDecoration = "none";
	linkExternalPageField.style.color = "#000";

	linkExternalPageField.addEventListener("mouseenter", () => {
		linkExternalPageField.style.color = "#DEE33E";
	});

	linkExternalPageField.addEventListener("mouseleave", () => {
		linkExternalPageField.style.color = "#000";
	});

	// container do perfil do usuário
	const divProfile = document.createElement("div");
	divProfile.style.maxWidth = "186px";
	divProfile.style.display = "flex";
	divProfile.style.gap = "1rem";

  const divImage = document.createElement("div");
  divImage.style.height = "48px";
  divImage.style.width = "48px";
  divImage.style.borderRadius = "50%";
  divImage.style.overflow = "hidden";
  divImage.style.display = "flex";
  divImage.style.justifyContent = "center";
  divImage.style.alignItems = "center";
  divImage.style.backgroundColor = generateRandomColor();

  const image = document.createElement("div");
  image.id = "companyTag"
  image.innerHTML = "Empresa"
  image.style.color = "white";
  image.style.fontWeight = "bold";
  image.style.fontSize = "16px";

	const contentUser = document.createElement("div");
	contentUser.style.display = "flex";
	contentUser.style.flexDirection = "column";
	contentUser.style.justifyContent = "space-around";

	const nameUser = document.createElement("div");
	nameUser.id = "username";
	nameUser.innerText = "Usuário";
	nameUser.style.fontWeight = "900";
	nameUser.style.cursor = "pointer";

	nameUser.addEventListener("mouseenter", () => {
		nameUser.style.color = "#DEE33E";
	});

	nameUser.addEventListener("mouseleave", () => {
		nameUser.style.color = "#000";
	});

	nameUser.addEventListener("click", () => {
		EditUserProfileModal();
	});

	contentUser.appendChild(nameUser);

	divImage.appendChild(image);
	divProfile.appendChild(divImage);
	divProfile.appendChild(contentUser);

	// componente da navbar em si
	const navBar = document.createElement("nav");
	navBar.style.minHeight = "100vh";
	navBar.style.width = "256px";
	navBar.style.minWidth = "256px";
	navBar.style.background = "white";
	navBar.style.padding = "1rem";

	// div da logo + lista da navbar
	const navgation = document.createElement("div");
	navgation.style.height = "100%";
	navgation.style.display = "flex";
	navgation.style.flexDirection = "column";
	navgation.style.justifyContent = "space-between";
	navgation.style.alignItems = "center";

	const logoImage = document.createElement("div");
	logoImage.style.width = "100%";

	const imageContent = document.createElement("img");
	imageContent.src = "../assets/logo-yellow.png";
	imageContent.style.width = "100%";

	logoImage.appendChild(imageContent);

	// lista da navbar
	const listBar = document.createElement("ul");
	listBar.id = "navBarListUl";
	listBar.style.listStyle = "none";
	listBar.style.display = "flex";
	listBar.style.width = "100%";
	listBar.style.gap = "0.2rem";
	listBar.style.flexDirection = "column";
	listBar.style.justifyContent = "space-between";

	async function highlightActiveButton(activeItem) {
		const titleHeader = document.getElementById("titleHeader");
		titleHeader.innerText = activeItem.id;

		// Remove a cor de fundo de todos os itens da lista
		const allItems = document.querySelectorAll("#navBarListUl li");
		allItems.forEach(item => {
			item.style.background = "";
			item.style.color = "#000";
		});

		// Define a cor de fundo apenas no item clicado
		activeItem.style.background = "#DEE33E";
		activeItem.style.color = "#fff";

		// arrumando main
		main.innerHTML = "";
		main.style.padding = "30px";
		main.style.height = "calc(100% - 6rem)";

		if (activeItem.id == "Agendamentos") {
			main.innerHTML = "";

			const section = await InitialSchedulingTimelineSection();

			main.appendChild(section);
		} else if (activeItem.id == "Equipe") {
			main.innerHTML = "";

			const section = await StaffManager();

			main.appendChild(section);
		} else if (activeItem.id == "Serviço") {
			main.innerHTML = "";

			const section = ServiceDashboard();

			main.appendChild(section);
		}
	}

	const menuItems = ["Agendamentos", "Equipe", "Serviço"];

	menuItems.forEach(item => {
		const li = document.createElement("li");
		li.style.cursor = "pointer";
		li.innerText = item;
		li.id = item;
		li.style.width = "100%";
		li.style.height = "3.5rem";
		li.style.padding = "1rem";
		li.style.borderRadius = "0.5rem";
		li.style.display = "flex";
		li.style.alignItems = "center";
		li.style.transition = "background-color 0.2s";

		// hover só se não estiver ativo
		li.addEventListener("mouseenter", () => {
			if (li.style.background !== "rgb(222, 227, 62)") {
				li.style.backgroundColor = "#f0f0f0";
			}
		});

		li.addEventListener("mouseleave", () => {
			if (li.style.background !== "rgb(222, 227, 62)") {
				li.style.backgroundColor = "";
			}
		});

		li.addEventListener("click", function () {
			highlightActiveButton(li);
		});

		listBar.appendChild(li);
	});

	const buttonLogout = document.createElement("div");
	buttonLogout.classList = "cursor";
	buttonLogout.innerText = "Sair";
	buttonLogout.id = "Sair";
	buttonLogout.style.cursor = "pointer";
	buttonLogout.style.color = "#fff";
	buttonLogout.style.width = "100%";
	buttonLogout.style.height = "3rem";
	buttonLogout.style.background = "#dc3545";
	buttonLogout.style.borderRadius = "0.5rem";
	buttonLogout.style.display = "flex";
	buttonLogout.style.justifyContent = "center";
	buttonLogout.style.alignItems = "center";

	buttonLogout.addEventListener("mouseenter", () => {
		buttonLogout.style.backgroundColor = "#c82333";
	});

	buttonLogout.addEventListener("mouseout", () => {
		buttonLogout.style.backgroundColor = "#dc3545";
	});

	buttonLogout.addEventListener("click", () => {
		fetch("/api/logout", {
			method: "POST"
		})
			.then(res => {
				if (!res.ok) {
					return res.json().then(errorData => {
						throw new Error(errorData.error || "Falha ao fazer logout");
					});
				}

				return res.json(); // Retorna o JSON corretamente
			})
			.then(res => {
				// Aqui você pode redirecionar ou fazer alguma outra ação após o logout
				window.location.href = "/login";
			})
			.catch(error => {
				MessageNotification(error.message, "#ff6347");
			});
	});

	const componentNavBar = document.createElement("div");
	componentNavBar.style.display = "flex";
	componentNavBar.style.flexDirection = "column";
	componentNavBar.style.gap = "1rem";

	componentNavBar.appendChild(logoImage);
	componentNavBar.appendChild(listBar);

	navgation.appendChild(componentNavBar);
	navgation.appendChild(buttonLogout);

	divTitleHeader.appendChild(titleHeader);

	navBar.appendChild(navgation);

	header.appendChild(divTitleHeader);
	header.appendChild(divLinkAndProfile);

	divLinkAndProfile.appendChild(linkExternalPageField);
	divLinkAndProfile.appendChild(divProfile);

	containerMain.appendChild(header);
	containerMain.appendChild(main);

	divContainerNav.appendChild(navBar);
	divContainerNav.appendChild(containerMain);

	setTimeout(() => {
		const liAppointments = document.getElementById("Agendamentos");
		if (liAppointments) {
			highlightActiveButton(liAppointments);
		}
	}, 0);

	fetch("/api/users/company")
		.then(response => {
			if (!response.ok) {
				return response.json().then(errorData => {
					throw new Error(errorData.error || "Falha Desconhecida");
				});
			}

			return response.json();
		})
		.then(data => {
			linkExternalPageField.href = data.link_client;

			nameUser.innerText = data.name;
			const firstLetter = data.name.charAt(0).toUpperCase();
			image.innerText = firstLetter;
		})
		.catch(error => {
			MessageNotification(error.message, "#ff6347");
		});

	return divContainerNav;
}
