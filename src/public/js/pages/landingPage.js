export default function landing() {
  function createElement(tag, textContent = "", className = "") {
    const element = document.createElement(tag);
    if (textContent) {
      element.textContent = textContent;
    }
    if (className) {
      className.split(" ").forEach((cls) => element.classList.add(cls));
    }
    return element;
  }

  const div = document.createElement("div");

  // Cabeçalho
  const loadingPageHeader = createElement("header", "", "loadingPageHeader");
  const loadingLogoDiv = createElement("div", "", "logo");

  // Logotipo
  const loadingLogoImg = createElement("img", "", "logo-img");
  loadingLogoImg.src = "/assets/logo-white.png";
  loadingLogoImg.alt = "EasyBarber";
  loadingLogoDiv.appendChild(loadingLogoImg);

  // Nav interno (links internos da página)
  const internalNav = createElement("nav", "", "internal-nav");
  ["Home","Sobre", "Objetivos"].forEach((text) => {
    const navLink = createElement("a", text, "nav-link");
    navLink.href = text === "Home" ? "#" : `#${text.toLowerCase()}`;
    internalNav.appendChild(navLink);
  });

  // Nav externo (links externos da aplicação)
  const externalNav = createElement("nav", "", "external-nav");
  ["Entrar"].forEach((text) => {
    const navLink = createElement("a", text, "nav-link");
    navLink.href = `/${text.toLowerCase()}`;
    externalNav.appendChild(navLink);
  });

  loadingPageHeader.appendChild(loadingLogoDiv);
  loadingPageHeader.appendChild(internalNav);
  loadingPageHeader.appendChild(externalNav);
  div.appendChild(loadingPageHeader);

  // Seção About (Hero)
  const loadinMainDisplay = createElement("section", "", "hero");
  loadinMainDisplay.id = "about";

  // Div para título, descrição e botão
  const contentDiv = createElement("div", "", "hero-content");
  const title = createElement(
    "h2",
    "O jeito fácil de gerenciar sua barbearia",
    "hero-title"
  );
  const description = createElement(
    "p",
    "Controle de agendamentos, funcionários e serviços em um só lugar!",
    "hero-description"
  );
  const button = createElement("button", "Comece Agora", "hero-button");
  button.onclick = () => (window.location.href = "/signup");
  contentDiv.appendChild(title);
  contentDiv.appendChild(description);
  contentDiv.appendChild(button);

  // Div para imagem
  const imageDiv = createElement("div", "", "hero-background");

  loadinMainDisplay.appendChild(imageDiv);
  loadinMainDisplay.appendChild(contentDiv);
  div.appendChild(loadinMainDisplay);

  // Seção Sobre
  const aboutSection = createElement("section", "", "about");
  aboutSection.id = "sobre"
  const aboutTitle = createElement("h2", "Sobre o EasyBarber", "about-title");
  const aboutDescriptionContainer=createElement("div", "","about-description-div" )
  const mainAboutDescription = createElement("p", `O easyBarber é um sistema de gestão online para barbearias que facilita o gerenciamento de horários, permitindo o controle da disponibilidade dos funcionários e dos serviços prestados. A plataforma organiza a agenda e otimiza os processos do estabelecimento, proporcionando uma gestão eficiente e prática. `, "main-about-description")
  const aboutDescription = createElement(
    "p",
    "O sistema é dividido em dois módulos:",
    "about-description"
  );
const aboutList = createElement("ul", "", "about-list");
[
    "<strong>Módulo WebAdmin:</strong> onde o administrador da barbearia pode gerenciar todo o estabelecimento. Este módulo permite o controle dos profissionais, a criação e gestão de cronogramas de funcionários, além de adicionar, editar ou remover serviços e profissionais. A página oferece uma interface prática e intuitiva, focada na organização eficiente do ambiente de trabalho.",
    "<strong>Módulo Cliente:</strong> possibilita ao cliente realizar seus próprios agendamentos de maneira simples e rápida. A página foi projetada para proporcionar uma experiência fácil e acessível, permitindo que os clientes escolham o serviço desejado, o profissional e o horário de sua preferência."
].forEach((about) => {
    const aboutListItem = createElement("li", "", "about-item");
    aboutListItem.innerHTML = about
    aboutList.appendChild(aboutListItem)
})
aboutDescriptionContainer.appendChild(mainAboutDescription)
aboutDescriptionContainer.appendChild(aboutDescription);
aboutDescriptionContainer.appendChild(aboutList)


  aboutSection.appendChild(aboutTitle);
  aboutSection.appendChild(aboutDescriptionContainer)
  div.appendChild(aboutSection);

  // Seção Objetivos
  const objectivesSection = createElement("section", "", "objective");
  objectivesSection.id = "objetivos"
  const objectivesTitle = createElement("h2", "Objetivos", "objective-title");
  const objectivesList = createElement("ul", "", "objectives-list");
  [
    {name:"Otimizar seu Tempo", description: "Organize sua agenda e estimule mais agendamentos através do nosso site.", img: "/assets/landingPage/calendar_month.svg"},
    {name:"Fidelizar seu Cliente", description: "Fidelize através do Agendamento On-line de qualquer lugar.",img: "/assets/landingPage/person.svg"},
    {name:"Aumentar seu Faturamento",description:"Aumente seu movimento e tenha um maior faturamento em sua barbearia.",img: "/assets/landingPage/account.svg"}
  ].forEach((objective) => {
    const card = createElement("li", "", "objective-benefit-item");

    const img = createElement("img", "", "objective-benefit-img");
    img.src = objective.img; // caminho da imagem
    img.alt = objective.name;
    
    const title = createElement("h4", objective.name, "objective-benefit-title");
    const desc = createElement("p", objective.description, "objective-benefit-description");
    
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(desc);
    objectivesList.appendChild(card);
  });
  objectivesSection.appendChild(objectivesTitle);
  objectivesSection.appendChild(objectivesList);
  div.appendChild(objectivesSection);

  // Rodapé (Footer)
  const footer = createElement("footer", "", "contato");
  const contactTitle = createElement("h3", "Contato", "contact-title");
  const contactInfo = createElement(
    "p",
    "Telefone: (11) 1234-5678 | Email: contato@easybarber.com",
    "contact-info"
  );
  footer.appendChild(contactTitle);
  footer.appendChild(contactInfo);
  div.appendChild(footer);

  return div;
}

window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 0) {
      header.style.backgroundColor = "black";
    } else {
      header.style.backgroundColor = "transparent";
    }
  });