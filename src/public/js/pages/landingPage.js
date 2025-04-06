
export default function landing() {
    
    function createElement(tag, textContent = "", className = "") {
    const element = document.createElement(tag);
    if (textContent) {
        element.textContent = textContent;
    }
    if (className) {
        className.split(" ").forEach(cls => element.classList.add(cls));
    }
    return element;
}
    const div = document.createElement("div");

    // Cabeçalho
    const loadingPageHeader = createElement("header", "", "loadingPageHeader");
    const loadingLogoDiv = createElement("div", "", "logo");

    // Separando a imagem e o título em divs distintas
    const loadingLogoImg = createElement("img", "", "logo-img");
    loadingLogoImg.src = "/assets/logo-yellow.png";
    loadingLogoImg.alt = "EasyBarber";

    loadingLogoDiv.appendChild(loadingLogoImg);


    // Nav interno (links internos da página)
    const internalNav = createElement("nav", "", "internal-nav");
    ["Home", "About", "Criadores", "Contato"].forEach((text) => {
        const navLink = createElement("a", text, "nav-link");
        navLink.href = text === "Home" ? "#" : `#${text.toLowerCase()}`;
        internalNav.appendChild(navLink);
    });

    // Nav externo (links externos da aplicação)
    const externalNav = createElement("nav", "", "external-nav");
    ["Login"].forEach((text) => {
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
    const title = createElement("h2", "O jeito fácil de gerenciar sua barbearia", "hero-title");
    const description = createElement("p", "Controle de agendamentos, funcionários e serviços em um só lugar!", "hero-description");
    const button = createElement("button", "Experimente Agora", "hero-button");
    button.onclick = () => window.location.href = "/signup";
    contentDiv.appendChild(title);
    contentDiv.appendChild(description);
    contentDiv.appendChild(button);

 // Seção Secundária com Lista de Benefícios
 const secondContenDiv = createElement('div', '', 'hero-secondary');
 const list = createElement('ul', '', 'secondary-list');
 const benefits = ['Interface dinâmica e intuitiva', 'Gerenciamento simples e eficaz', 'Site gerado específico para sua empresa'];
 benefits.forEach(benefit => {
     const listItem = createElement('li', benefit, 'benefit-item');
     list.appendChild(listItem);
 });
 secondContenDiv.appendChild(list);


    // Div para imagem
    const imageDiv = createElement("div", "", "hero-background");

    loadinMainDisplay.appendChild(imageDiv);
    loadinMainDisplay.appendChild(contentDiv);
    loadinMainDisplay.appendChild(secondContenDiv)

    div.appendChild(loadinMainDisplay);

    // Seção de Criadores com imagem
    const creatorSection = createElement("section", "", "creators");
    creatorSection.id = "criadores";
    const creatorSectionTitle = createElement("h3", "Criadores", "creator-title");
    creatorSection.appendChild(creatorSectionTitle);
    const creatorImageDiv = createElement("div", "", "creator-image");
    creatorSection.appendChild(creatorImageDiv);
    ["Bruno", "Fabiano", "Gabriell", "Lucas"].forEach((name) => {
        const creator = createElement("div", name, "creator");
        creatorSection.appendChild(creator);
    });
    div.appendChild(creatorSection);

    // Seção de Contato
    const contactSection = createElement("section", "", "contact-section");
    contactSection.id = "contato";
    const contactTitle = createElement("h3", "Contato", "contact-title");
    const contactInfo = createElement("p", "Telefone: (11) 1234-5678 | Email: contato@easybarber.com", "contact-info");
    contactSection.appendChild(contactTitle);
    contactSection.appendChild(contactInfo);
    div.appendChild(contactSection);

    return div;
}

