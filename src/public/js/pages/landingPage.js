export default function landing() {

    function createElement(tag, textContent = '', className = '') {
        const element = document.createElement(tag);
        if (textContent) {
            element.textContent = textContent;
        }
        if (className) {
            className.split(' ').forEach(cls => element.classList.add(cls));
        }
        return element;
    }

    const div = document.createElement('div');

    // Cabeçalho
    const loadingPageHeader = createElement('header', '', 'loadingPageHeader');
    const loadingLogoDiv = createElement('div', '', 'logo');

    // Logotipo
    const loadingLogoImg = createElement('img', '', 'logo-img');
    loadingLogoImg.src = '/assets/logo-yellow.png';
    loadingLogoImg.alt = 'EasyBarber';
    loadingLogoDiv.appendChild(loadingLogoImg);

    // Nav interno (links internos da página)
    const internalNav = createElement('nav', '', 'internal-nav');
    ['Home', 'Criadores', 'Contato'].forEach((text) => {
        const navLink = createElement('a', text, 'nav-link');
        navLink.href = text === 'Home' ? '#' : `#${text.toLowerCase()}`;
        internalNav.appendChild(navLink);
    });

    // Nav externo (links externos da aplicação)
    const externalNav = createElement('nav', '', 'external-nav');
    ['Login'].forEach((text) => {
        const navLink = createElement('a', text, 'nav-link');
        navLink.href = `/${text.toLowerCase()}`;
        externalNav.appendChild(navLink);
    });

    loadingPageHeader.appendChild(loadingLogoDiv);
    loadingPageHeader.appendChild(internalNav);
    loadingPageHeader.appendChild(externalNav);
    div.appendChild(loadingPageHeader);

    // Seção About (Hero)
    const loadinMainDisplay = createElement('section', '', 'hero');
    loadinMainDisplay.id = 'about';

    // Div para título, descrição e botão
    const contentDiv = createElement('div', '', 'hero-content');
    const title = createElement('h2', 'O jeito fácil de gerenciar sua barbearia', 'hero-title');
    const description = createElement('p', 'Controle de agendamentos, funcionários e serviços em um só lugar!', 'hero-description');
    const button = createElement('button', 'Experimente Agora', 'hero-button');
    button.onclick = () => window.location.href = '/signup';
    contentDiv.appendChild(title);
    contentDiv.appendChild(description);
    contentDiv.appendChild(button);

    // Seção Secundária com Lista de Benefícios
    const secondContenDiv = createElement('div', '', 'hero-secondary');
    const list = createElement('ul', '', 'secondary-list');
    const benefits = [
        { text: 'Interface moderna e intuitiva', img: '/assets/icons/interface.png' },
        { text: 'Gestão prática e eficiente', img: '/assets/icons/management.png' },
        { text: 'Soluções personalizadas', img: '/assets/icons/custom.png' }
    ];
    benefits.forEach(benefit => {
        const listItem = createElement('li', '', 'benefit-item');
        const icon = createElement('img', '', 'benefit-icon');
        icon.src = benefit.img;
        const text = createElement('span', benefit.text);
        listItem.appendChild(icon);
        listItem.appendChild(text);
        list.appendChild(listItem);
    });
    secondContenDiv.appendChild(list);

    // Div para imagem
    const imageDiv = createElement('div', '', 'hero-background');

    loadinMainDisplay.appendChild(imageDiv);
    loadinMainDisplay.appendChild(contentDiv);
    loadinMainDisplay.appendChild(secondContenDiv);
    div.appendChild(loadinMainDisplay);

    // Seção de Criadores com título e subtítulo
    const creatorSection = createElement('section', '', 'creators');
    creatorSection.id = 'criadores';
    const creatorTitleDiv = createElement('div', '', 'creator-title-div');
    const creatorSectionTitle = createElement('h3', 'Criadores', 'creator-title');
    const creatorSubtitle = createElement('p', 'Somos um grupo de alunos da AlphaEdTech dedicados a transformar ideias em soluções digitais inovadoras. Nosso objetivo nesse desenvolvimento foi criar uma ferramenta que facilite o dia a dia das barbearias. Conheça a equipe que está por trás dessa jornada de aprendizado e inovação.', 'creator-subtitle');
    creatorTitleDiv.appendChild(creatorSectionTitle);
    creatorTitleDiv.appendChild(creatorSubtitle);
    creatorSection.appendChild(creatorTitleDiv);

    const creatorCardsDiv = createElement('div', '', 'creator-cards');
    ['Bruno', 'Fabiano', 'Gabriell', 'Lucas'].forEach((name) => {
        const creator = createElement('div', '', 'creator');
        const creatorImg = createElement('img', '', 'creator-img');
        creatorImg.src = `/assets/creators/${name.toLowerCase()}.png`;
        creatorImg.alt = name;
        creator.appendChild(creatorImg);
        creator.appendChild(createElement('span', name));
        creatorCardsDiv.appendChild(creator);
    });
    creatorSection.appendChild(creatorCardsDiv);
    div.appendChild(creatorSection);

    // Rodapé (Footer)
    const footer = createElement('footer', '', 'contato');
    const contactTitle = createElement('h3', 'Contato', 'contact-title');
    const contactInfo = createElement('p', 'Telefone: (11) 1234-5678 | Email: contato@easybarber.com', 'contact-info');
    footer.appendChild(contactTitle);
    footer.appendChild(contactInfo);
    div.appendChild(footer);

    return div;
}
