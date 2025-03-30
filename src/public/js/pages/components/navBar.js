import { InitialSchedulingTimelineSection } from "./InitialSchedulingTimelineSection.js";

//
//
import DailyServicesModal from "./DailyServicesModal.js";
//
//

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
  containerMain.style.border = "1px solid #F5F5F5";

  const main = document.createElement("main");
  // ao trocar o componente, tem q ser colocado aqui dentro
  main.id = "main";
  main.innerHTML = "";

  // componente do header em si
  const header = document.createElement("header");
  header.style.width = "100%";
  header.style.height = "6rem";
  header.style.background = "white";
  header.style.padding = "1rem";
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";

  // título da página
  const divTitleHeader = document.createElement("div");
  divTitleHeader.style.display = "flex";
  divTitleHeader.style.flexDirection = "column";
  divTitleHeader.style.gap = ".5rem";

  const titleHeader = document.createElement("h1");
  titleHeader.id = "titleHeader";
  titleHeader.style.fontSize = "1.5rem";

  const subTitleHeader = document.createElement("h2");
  subTitleHeader.id = "subTitleHeader";
  subTitleHeader.style.fontSize = "1rem";

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

  const image = document.createElement("img");
  image.src = "https://picsum.photos/500";
  image.style.height = "100%";
  image.style.width = "100%";
  image.style.objectFit = "cover";

  const contentUser = document.createElement("div");
  contentUser.style.display = "flex";
  contentUser.style.flexDirection = "column";
  contentUser.style.justifyContent = "space-around";

  const nameUser = document.createElement("div");
  nameUser.innerText = "Usuário";
  nameUser.style.fontWeight = "900";

  const typeUser = document.createElement("div");
  typeUser.innerText = "Comum";

  contentUser.appendChild(nameUser);
  contentUser.appendChild(typeUser);

  divImage.appendChild(image);
  divProfile.appendChild(divImage);
  divProfile.appendChild(contentUser);

  // componente da navbar em si
  const navBar = document.createElement("nav");
  navBar.style.height = "100vh";
  navBar.style.width = "256px";
  navBar.style.minWidth = "256px";
  navBar.style.background = "white";
  navBar.style.padding = "2rem";

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
  listBar.style.flexDirection = "column";
  listBar.style.justifyContent = "space-between";

  function highlightActiveButton(activeItem) {
    const titleHeader = document.getElementById("titleHeader");
    titleHeader.innerText = activeItem.id;

    const subTitleHeader = document.getElementById("subTitleHeader");
    subTitleHeader.innerText = `Vamos ver sobre - ${activeItem.id}`;

    // Remove a cor de fundo de todos os itens da lista
    const allItems = document.querySelectorAll("#navBarListUl li");
    allItems.forEach(item => {
      item.style.background = "";
    });

    // Define a cor de fundo apenas no item clicado
    activeItem.style.background = "#DEE33E";

    // arrumando main
    const main = document.getElementById("main");
    main.innerHTML = "";
    main.style.padding = "1rem";

    if (activeItem.id == "Agendamentos") {
      main.appendChild(InitialSchedulingTimelineSection());
    } else if (activeItem.id == "Clientes") {
      main.innerHTML = "Clientes";

      //
      //
      //
      // afim de teste somente
      const listObj = [
        {
          professional: "Fabiano",
          client: "João Silva",
          email: "joao.silva@email.com",
          date: "2025-04-10",
          hour: "14:00",
          description: "Desenvolvimento de site institucional",
          price: 2500,
          status: false
        },
        {
          professional: "Bruno",
          client: "Maria Oliveira",
          email: "maria.oliveira@email.com",
          date: "2025-04-12",
          hour: "09:30",
          description: "Criação de landing page para campanha de marketing",
          price: 1800,
          status: false
        },
        {
          professional: "Lucas",
          client: "Carlos Mendes",
          email: "carlos.mendes@email.com",
          date: "2025-04-15",
          hour: "11:00",
          description: "Sistema de agendamento para barbearia",
          price: 3200,
          status: false
        },
        {
          professional: "Gabriell",
          client: "Ana Souza",
          email: "ana.souza@email.com",
          date: "2025-04-18",
          hour: "16:45",
          description: "E-commerce para loja de roupas",
          price: 5400,
          status: false
        },
        {
          professional: "Vitor",
          client: "Lucas Pereira",
          email: "lucas.pereira@email.com",
          date: "2025-04-22",
          hour: "10:15",
          description: "Aplicativo mobile para controle de estoque, Aplicativo mobile para controle de estoque, Aplicativo mobile para controle de estoque, Aplicativo mobile para controle de estoque, Aplicativo mobile para controle de estoque, Aplicativo mobile para controle de estoque, Aplicativo mobile para controle de estoque, Aplicativo mobile para controle de estoque, Aplicativo mobile para controle de estoque, Aplicativo mobile para controle de estoque, ",
          price: 7200,
          status: true
        }
      ];
      main.appendChild(DailyServicesModal(listObj));
      //
      //
      //
    } else if (activeItem.id == "Equipe") {
      main.innerHTML = "Equipe";
    } else if (activeItem.id == "Serviço") {
      main.innerHTML = "Serviço";
    }
  }

  const menuItems = ["Agendamentos", "Clientes", "Equipe", "Serviço"];

  menuItems.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("cursor");
    li.innerText = item;
    li.id = item;
    li.style.width = "100%";
    li.style.height = "3.5rem";
    li.style.padding = "1rem";
    li.style.borderRadius = "10px";
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.cursor = "pointer";
    li.addEventListener("click", function () {
      highlightActiveButton(li);
    });
    listBar.appendChild(li);
  });

  const buttonSair = document.createElement("div");
  buttonSair.classList = "cursor";
  buttonSair.innerText = "Sair";
  buttonSair.id = "Sair";
  buttonSair.style.width = "100%";
  buttonSair.style.height = "3rem";
  buttonSair.style.background = "#EB4335";
  buttonSair.style.cursor = "pointer";
  buttonSair.style.borderRadius = "10px";
  buttonSair.style.display = "flex";
  buttonSair.style.justifyContent = "center";
  buttonSair.style.alignItems = "center";
  buttonSair.addEventListener("click", () => {
    fetch("/api/logout", {
      method: "POST"
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Erro: ${res.status} - ${res.statusText}`);
        }
        return res.json(); // Retorna o JSON corretamente
      })
      .then(res => {
        console.log(res);
        // Aqui você pode redirecionar ou fazer alguma outra ação após o logout
        window.location.href = "/";
      })
      .catch(error => {
        console.error("Erro ao fazer logout:", error);
      });
  });

  const componentNavBar = document.createElement("div");
  componentNavBar.style.display = "flex";
  componentNavBar.style.flexDirection = "column";
  componentNavBar.style.gap = "1rem";

  componentNavBar.appendChild(logoImage);
  componentNavBar.appendChild(listBar);

  navgation.appendChild(componentNavBar);
  navgation.appendChild(buttonSair);

  divTitleHeader.appendChild(titleHeader);
  divTitleHeader.appendChild(subTitleHeader);

  navBar.appendChild(navgation);
  header.appendChild(divTitleHeader);
  header.appendChild(divProfile);

  containerMain.appendChild(header);
  containerMain.appendChild(main);

  divContainerNav.appendChild(navBar);
  divContainerNav.appendChild(containerMain);

  setTimeout(() => {
    const liAgendamentos = document.getElementById("Agendamentos");
    if (liAgendamentos) {
      highlightActiveButton(liAgendamentos);
    }
  }, 0);

  // root.appendChild(divContainerNav);
  return divContainerNav;

  // const liAgendamentos = document.getElementById("Agendamentos");
  // highlightActiveButton(liAgendamentos);
}