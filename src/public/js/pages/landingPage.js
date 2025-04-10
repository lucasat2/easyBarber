import onNavigate from "../event.js";

export default function landing() {
	function createElement(tag, className, content = "") {
		const element = document.createElement(tag);
		if (className) {
			if (Array.isArray(className)) {
				element.classList.add(...className);
			} else {
				if (typeof className === "string") {
					element.classList.add(...className.split(" "));
				}
			}
		}
		if (content) {
			if (typeof content === "string") {
				element.textContent = content;
			} else if (content instanceof Node) {
				element.appendChild(content);
			}
		}
		return element;
	}

	const container = createElement("div", "landing-page");

	const style = document.createElement("style");
	style.textContent = `
    .landing-page {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      color: #1e293b;
      line-height: 1.5;
    }

    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }


    .header {
      border-bottom: 1px solid #e2e8f0;
      background-color: white;
      position: sticky;
      top: 0;
      z-index: 1000;
      padding: 0 1rem; /* Adjusted padding */
    }

    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0;
      position: relative; /* Needed for absolute positioning of mobile-nav */
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logo-text {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1e293b;
    }

    .nav {
      display: none; /* Hidden on mobile by default */
    }

    @media (min-width: 768px) {
      .nav {
        display: flex; /* Shown on desktop */
        align-items: center;
        gap: 2rem;
      }
    }

    .nav-link {
      color: #64748b;
      font-weight: 500;
      text-decoration: none;
      transition: color 0.2s;
    }

    .nav-link:hover {
      color: #cfa912;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.375rem;
      font-weight: 500;
      transition: all 0.2s;
      cursor: pointer;
    }

    .btn-outline {
      background-color: transparent;
      border: 1px solid #cfa912;
      color: #cfa912;
      padding: 0.5rem 1rem;
      text-decoration: none;
      margin-left: 1rem;
    }

    .btn-outline:hover {
      background-color: #fef3c7;
    }

    .btn-primary {
      background-color: #cfa912;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
    }

    .btn-primary:hover {
      background-color: #e7c82e;
    }

    .btn-lg {
      padding: 0.75rem 2rem;
      font-size: 1.125rem;
    }

    .mobile-menu {
      display: flex; /* Show hamburger on mobile */
      border-color: #cfa912;
    }


    @media (min-width: 768px) {
      .mobile-menu {
        display: none; /* Hide hamburger on desktop */
      }
    }

    /* Styles for the Mobile Navigation Menu */
    .mobile-nav {
      display: none; /* Hidden by default */
      position: absolute;
      top: 100%; /* Position below the header */
      left: -1rem; /* Align with header edge considering header padding */
      right: -1rem; /* Align with header edge considering header padding */
      background-color: white;
      border-top: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 999; /* Below header (1000) but above content */
      padding: 0.5rem 0; /* Add some vertical padding */
    }

    /* Style for when the mobile menu is open */
    .mobile-nav.is-open {
      display: block;
    }

    /* Styles for links within the mobile menu */
    .mobile-nav .nav-link {
      display: block; /* Make links take full width */
      padding: 0.75rem 2rem; /* Match container padding + extra */
      color: #1e293b; /* Dark text on white background */
      border-bottom: 1px solid #f1f5f9; /* Separator lines */
      text-decoration: none; /* Ensure no underline */
      font-weight: 500; /* Match desktop link weight */
      transition: background-color 0.2s, color 0.2s; /* Smooth hover */
    }
    .mobile-nav .nav-link:last-child {
        border-bottom: none; /* No border on the last item */
    }

    .mobile-nav .nav-link:hover {
      background-color: #f8fafc; /* Light background on hover */
      color: #cfa912; /* Highlight color on hover */
    }


    /* Hero Section */
    .hero {
      position: relative;
      padding: 5rem 0 7rem;
      color: white;
      text-align: center;
    }

    .hero-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #252209;
      z-index: -1;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .hero-title {
      font-size: 2.5rem;
      font-weight: 700;
      max-width: 48rem;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }

    @media (min-width: 768px) {
      .hero-title {
        font-size: 3rem;
      }
    }

    @media (min-width: 1024px) {
      .hero-title {
        font-size: 3.75rem;
      }
    }

    .hero-subtitle {
      font-size: 1.125rem;
      color: #e2e8f0;
      max-width: 36rem;
      margin-bottom: 2rem;
    }

    @media (min-width: 768px) {
      .hero-subtitle {
        font-size: 1.25rem;
      }
    }


    .section {
      padding: 4rem 0;
      scroll-margin-top: 80px;
    }

    @media (min-width: 768px) {
      .section {
        padding: 6rem 0;
      }
    }

    .section-bg-light {
      background-color: #f8fafc;
    }

    .section-bg-dark {
      background-color: #7a6e09;
      color: white;
    }

    .section-bg-darker {
      background-color: #252209;
      color: white;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #1e293b;
    }
    .section-bg-dark .section-title, .section-bg-darker .section-title {
        color: white;
    }


    @media (min-width: 768px) {
      .section-title {
        font-size: 2.5rem;
      }
    }

    .section-divider {
      width: 5rem;
      height: 0.25rem;
      background-color: #cfa912;
      margin: 0 auto;
    }
    .section-bg-dark .section-divider, .section-bg-darker .section-divider {
        background-color: white;
    }


    .text-center {
      text-align: center;
    }

    .text-white {
      color: white;
    }

    .text-gray {
      color: #94a3b8;
    }

    .max-w-3xl {
      max-width: 48rem;
      margin-left: auto;
      margin-right: auto;
    }

    .mb-4 {
      margin-bottom: 1rem;
    }

    .mb-6 {
      margin-bottom: 1.5rem;
    }

    .mb-12 {
      margin-bottom: 3rem;
    }


    .grid {
      display: grid;
      gap: 2rem;
    }

    @media (min-width: 768px) {
      .grid-cols-2 {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 768px) {
      .grid-cols-3 {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .card {
      background-color: white;
      border-radius: 0.5rem;
      padding: 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      color: #1e293b;
    }

    .icon-container {
      width: 3rem;
      height: 3rem;
      background-color: #cfa912;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .icon-circle {
      width: 4rem;
      height: 4rem;
      background-color: #cfa912;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
    }


    .icon-container img, .icon-circle img {
        filter: brightness(0) invert(1);
        width: 60%;
        height: auto;
    }


    .card-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
    }


    .footer {
      padding: 2rem 0;
    }

    .footer-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    @media (min-width: 768px) {
      .footer-container {
        flex-direction: row;
        justify-content: space-between;
      }
    }

    .footer-logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
     .footer-logo .text-white {
        color: white !important;
     }


    @media (min-width: 768px) {
      .footer-logo {
        margin-bottom: 0;
      }
    }

    .footer-contact {
      text-align: center;
    }
     .footer-contact .text-white {
         color: white !important;
     }

    @media (min-width: 768px) {
      .footer-contact {
        text-align: right;
      }
    }

    .footer-divider {
      width: 100%;
      height: 1px;
      background-color: #e7c82e;
      margin: 1.5rem 0;
    }

    .footer-copyright {
      text-align: center;
      font-size: 0.875rem;
      color: #94a3b8;
    }


    html {
      scroll-behavior: smooth;
    }


    .btn img {
        vertical-align: middle;
        height: 1em;
        width: auto;
    }

    .mobile-menu img {
        /* Adjust filter if needed for mobile menu icon color */
        /* filter: invert(69%) sepia(43%) saturate(1041%) hue-rotate(358deg) brightness(86%) contrast(84%); */
    }
    .logo img {
         display: block;
         width: 2.5rem; height: 2.5rem;
    }
    .footer-logo img {
         display: block;
         width: 2.5rem; height: 2.5rem;
    }
    `;

	container.appendChild(style);

	const header = createElement("header", "header");
	const headerContainer = createElement("div", "container header-container");

	const logo = createElement("div", "logo");
	const logoIcon = createElement("img");
	logoIcon.src = "/assets/logo.png";
	logoIcon.alt = "EasyBarber Logo Icon";
	logo.appendChild(logoIcon);
	logo.appendChild(createElement("span", "logo-text", "EasyBarber"));

	const nav = createElement("nav", "nav");
	const navLinksInfo = [
		{text: "Início", href: "#"},
		{text: "Sobre", href: "#sobre"},
		{text: "Objetivos", href: "#objetivos"}
	];

	navLinksInfo.forEach(linkInfo => {
		const a = createElement("a", "nav-link", linkInfo.text);
		a.href = linkInfo.href;
		nav.appendChild(a);
	});

	const loginLinkDesktop = createElement("a", "btn btn-outline", "Entrar");
	loginLinkDesktop.href = "/login";
	loginLinkDesktop.addEventListener("click", function (e) {
		e.preventDefault();
		const event = onNavigate("/login");
		document.dispatchEvent(event);
	});
	nav.appendChild(loginLinkDesktop);

	const mobileNav = createElement("nav", "mobile-nav");

	navLinksInfo.forEach(linkInfo => {
		const a = createElement("a", "nav-link", linkInfo.text);
		a.href = linkInfo.href;

		a.addEventListener("click", () => {
			mobileNav.classList.remove("is-open");
		});
		mobileNav.appendChild(a);
	});

	const loginLinkMobile = createElement("a", "btn btn-outline", "Entrar");
	loginLinkMobile.href = "/login";
	loginLinkMobile.addEventListener("click", function (e) {
		e.preventDefault();
		mobileNav.classList.remove("is-open");
		const event = onNavigate("/login");
		document.dispatchEvent(event);
	});
	mobileNav.appendChild(loginLinkMobile);

	const mobileMenu = createElement("button", "btn btn-outline mobile-menu");
	const menuIcon = createElement("img");
	menuIcon.src = "/assets/landingPage/menu.svg";
	menuIcon.alt = "Menu";
	menuIcon.style.width = "24px";
	menuIcon.style.height = "24px";
	mobileMenu.appendChild(menuIcon);

	mobileMenu.addEventListener("click", e => {
		e.preventDefault();
		mobileNav.classList.toggle("is-open");
	});

	headerContainer.appendChild(logo);
	headerContainer.appendChild(nav);
	headerContainer.appendChild(mobileMenu);
	headerContainer.appendChild(mobileNav);

	header.appendChild(headerContainer);
	container.appendChild(header);

	const hero = createElement("section", "hero");
	const heroBg = createElement("div", "hero-bg");
	const heroContainer = createElement("div", "container hero-content");
	const heroTitle = createElement(
		"h1",
		"hero-title",
		"O jeito fácil de gerenciar sua barbearia"
	);
	const heroSubtitle = createElement(
		"p",
		"hero-subtitle",
		"Controle de agendamentos, funcionários e serviços em um só lugar!"
	);
	const heroBtn = createElement("button", "btn btn-primary btn-lg");
	heroBtn.textContent = "Comece Agora";
	const arrowIcon = createElement("img");
	arrowIcon.src = "/assets/externalSchedulingPage/arrow.svg";
	arrowIcon.alt = "";
	heroBtn.appendChild(arrowIcon);
	heroBtn.addEventListener("click", e => {
		e.preventDefault();
		const event = onNavigate("/signup");
		document.dispatchEvent(event);
	});
	heroContainer.appendChild(heroTitle);
	heroContainer.appendChild(heroSubtitle);
	heroContainer.appendChild(heroBtn);
	hero.appendChild(heroBg);
	hero.appendChild(heroContainer);
	container.appendChild(hero);

	const sobreSection = createElement("section", "section section-bg-light");
	sobreSection.id = "sobre";
	const sobreContainer = createElement("div", "container");
	const sobreHeader = createElement("div", "section-header");
	const sobreTitle = createElement("h2", "section-title", "Sobre o EasyBarber");
	const sobreDivider = createElement("div", "section-divider");
	sobreHeader.appendChild(sobreTitle);
	sobreHeader.appendChild(sobreDivider);
	const sobreText = createElement("div", "max-w-3xl text-center mb-12");
	const sobreDesc = createElement(
		"p",
		"mb-6",
		"O EasyBarber é um sistema de gestão online para barbearias que facilita o gerenciamento de horários, permitindo o controle da disponibilidade dos funcionários e dos serviços prestados. A plataforma organiza a agenda e otimiza os processos do estabelecimento, proporcionando uma gestão eficiente e prática."
	);
	const sobreModulos = createElement(
		"p",
		"",
		"O sistema é dividido em dois módulos:"
	);
	sobreModulos.style.fontWeight = "500";
	sobreText.appendChild(sobreDesc);
	sobreText.appendChild(sobreModulos);
	const modulesGrid = createElement("div", "grid grid-cols-2");
	modulesGrid.style.maxWidth = "64rem";
	modulesGrid.style.margin = "0 auto";

	const adminCard = createElement("div", "card");
	const adminIconContainer = createElement("div", "icon-container");
	const usersIcon = createElement("img");
	usersIcon.src = "/assets/landingPage/person.svg";
	usersIcon.alt = "WebAdmin Icon";
	adminIconContainer.appendChild(usersIcon);
	const adminTitle = createElement("h3", "card-title", "Módulo WebAdmin");
	const adminDesc = createElement(
		"p",
		"",
		"Onde o administrador da barbearia pode gerenciar todo o estabelecimento. Este módulo permite o controle dos profissionais, a criação e gestão de cronogramas de funcionários, além de adicionar, editar ou remover serviços e profissionais. A página oferece uma interface prática e intuitiva, focada na organização eficiente do ambiente de trabalho."
	);
	adminCard.appendChild(adminIconContainer);
	adminCard.appendChild(adminTitle);
	adminCard.appendChild(adminDesc);

	const clientCard = createElement("div", "card");
	const clientIconContainer = createElement("div", "icon-container");
	const calendarIcon = createElement("img");
	calendarIcon.src = "/assets/landingPage/calendar.svg";
	calendarIcon.alt = "Client Module Icon";
	clientIconContainer.appendChild(calendarIcon);
	const clientTitle = createElement("h3", "card-title", "Módulo Cliente");
	const clientDesc = createElement(
		"p",
		"",
		"Possibilita ao cliente realizar seus próprios agendamentos de maneira simples e rápida. A página foi projetada para proporcionar uma experiência fácil e acessível, permitindo que os clientes escolham o serviço desejado, o profissional e o horário de sua preferência."
	);
	clientCard.appendChild(clientIconContainer);
	clientCard.appendChild(clientTitle);
	clientCard.appendChild(clientDesc);

	modulesGrid.appendChild(adminCard);
	modulesGrid.appendChild(clientCard);
	sobreContainer.appendChild(sobreHeader);
	sobreContainer.appendChild(sobreText);
	sobreContainer.appendChild(modulesGrid);
	sobreSection.appendChild(sobreContainer);
	container.appendChild(sobreSection);

	const objetivosSection = createElement("section", "section");
	objetivosSection.id = "objetivos";
	const objetivosContainer = createElement("div", "container");
	const objetivosHeader = createElement("div", "section-header");
	const objetivosTitle = createElement("h2", "section-title", "Objetivos");
	const objetivosDivider = createElement("div", "section-divider");
	objetivosHeader.appendChild(objetivosTitle);
	objetivosHeader.appendChild(objetivosDivider);
	const objetivosGrid = createElement("div", "grid grid-cols-3");

	const obj1Card = createElement("div", "card text-center");
	const obj1IconContainer = createElement("div", "icon-circle");
	const clockIcon = createElement("img");
	clockIcon.src = "/assets/landingPage/clock.svg";
	clockIcon.alt = "Optimize Time Icon";
	obj1IconContainer.appendChild(clockIcon);
	const obj1Title = createElement("h3", "card-title", "Otimizar seu Tempo");
	const obj1Desc = createElement(
		"p",
		"",
		"Organize sua agenda e estimule mais agendamentos através do nosso site."
	);
	obj1Card.appendChild(obj1IconContainer);
	obj1Card.appendChild(obj1Title);
	obj1Card.appendChild(obj1Desc);

	const obj2Card = createElement("div", "card text-center");
	const obj2IconContainer = createElement("div", "icon-circle");
	const awardIcon = createElement("img");
	awardIcon.src = "/assets/landingPage/award.svg";
	awardIcon.alt = "Customer Loyalty Icon";
	obj2IconContainer.appendChild(awardIcon);
	const obj2Title = createElement("h3", "card-title", "Fidelizar seu Cliente");
	const obj2Desc = createElement(
		"p",
		"",
		"Fidelize através do Agendamento On-line de qualquer lugar."
	);
	obj2Card.appendChild(obj2IconContainer);
	obj2Card.appendChild(obj2Title);
	obj2Card.appendChild(obj2Desc);

	const obj3Card = createElement("div", "card text-center");
	const obj3IconContainer = createElement("div", "icon-circle");
	const chartIcon = createElement("img");
	chartIcon.src = "/assets/landingPage/chart.svg";
	chartIcon.alt = "Increase Revenue Icon";
	obj3IconContainer.appendChild(chartIcon);
	const obj3Title = createElement(
		"h3",
		"card-title",
		"Aumentar seu Faturamento"
	);
	const obj3Desc = createElement(
		"p",
		"",
		"Aumente seu movimento e tenha um maior faturamento em sua barbearia."
	);
	obj3Card.appendChild(obj3IconContainer);
	obj3Card.appendChild(obj3Title);
	obj3Card.appendChild(obj3Desc);

	objetivosGrid.appendChild(obj1Card);
	objetivosGrid.appendChild(obj2Card);
	objetivosGrid.appendChild(obj3Card);
	objetivosContainer.appendChild(objetivosHeader);
	objetivosContainer.appendChild(objetivosGrid);
	objetivosSection.appendChild(objetivosContainer);
	container.appendChild(objetivosSection);

	const ctaSection = createElement(
		"section",
		"section section-bg-dark text-center"
	);
	const ctaContainer = createElement("div", "container");
	const ctaTitle = createElement(
		"h2",
		"mb-6 section-title",
		"Pronto para transformar sua barbearia?"
	);

	const ctaBtn = createElement(
		"button",
		"btn btn-primary btn-lg",
		"Comece Agora"
	);

	ctaBtn.addEventListener("click", e => {
		e.preventDefault();
		const event = onNavigate("/signup");
		document.dispatchEvent(event);
	});
	ctaContainer.appendChild(ctaTitle);
	ctaContainer.appendChild(ctaBtn);
	ctaSection.appendChild(ctaContainer);
	container.appendChild(ctaSection);

	const footer = createElement("footer", "footer section-bg-darker");
	const footerContainer = createElement("div", "container footer-container");
	const footerLogo = createElement("div", "footer-logo");
	const footerLogoIcon = createElement("img");
	footerLogoIcon.src = "/assets/logo-white.png";
	footerLogoIcon.alt = "EasyBarber Logo Icon";

	footerLogo.appendChild(footerLogoIcon);
	footerLogo.appendChild(createElement("span", "text-white", "EasyBarber"));
	const footerContact = createElement("div", "footer-contact");
	footerContact.appendChild(createElement("p", "text-gray", "Contato"));
	footerContact.appendChild(
		createElement(
			"p",
			"text-white",
			"Telefone: (11) 1234-5678 | Email: contato@easybarber.com"
		)
	);
	footerContainer.appendChild(footerLogo);
	footerContainer.appendChild(footerContact);
	const footerBottom = createElement("div", "container");
	const footerDivider = createElement("div", "footer-divider");
	const footerCopyright = createElement(
		"p",
		"footer-copyright",
		`© ${new Date().getFullYear()} EasyBarber. Todos os direitos reservados.`
	);
	footerBottom.appendChild(footerDivider);
	footerBottom.appendChild(footerCopyright);
	footer.appendChild(footerContainer);
	footer.appendChild(footerBottom);
	container.appendChild(footer);

	return container;
}
