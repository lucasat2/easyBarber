
import { InitialSchedulingTimelineSection } from "./InitialSchedulingTimelineSection.js"
import DailyServicesModal from "./DailyServicesModal.js"
import ServiceDetailsModal from "./ServiceDetailsModal.js"


export default function header() {
  const root = document.getElementById("root")
  root.style.background = "#F5F5F5"
  root.style.width = "100%"

 
  const divContainerNav = document.createElement("div")
  divContainerNav.style.display = "flex"
  divContainerNav.style.height = "100vh"
  divContainerNav.style.overflow = "hidden"

  
  const containerMain = document.createElement("div")
  containerMain.style.width = "100%"
  containerMain.style.display = "flex"
  containerMain.style.flexDirection = "column"
  containerMain.style.overflow = "auto"

 
  const main = document.createElement("main")
  main.id = "main"
  main.style.padding = "1.5rem"
  main.style.flex = "1"
  main.style.overflow = "auto"


  const header = document.createElement("header")
  header.style.width = "100%"
  header.style.height = "6rem"
  header.style.background = "white"
  header.style.padding = "1.5rem"
  header.style.display = "flex"
  header.style.justifyContent = "space-between"
  header.style.alignItems = "center"
  header.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)"


  const divTitleHeader = document.createElement("div")
  divTitleHeader.style.display = "flex"
  divTitleHeader.style.flexDirection = "column"
  divTitleHeader.style.gap = ".5rem"

  const titleHeader = document.createElement("h1")
  titleHeader.id = "titleHeader"
  titleHeader.style.fontSize = "1.5rem"
  titleHeader.style.fontWeight = "600"
  titleHeader.style.margin = "0"
  titleHeader.style.color = "#333"

  const subTitleHeader = document.createElement("h2")
  subTitleHeader.id = "subTitleHeader"
  subTitleHeader.style.fontSize = "1rem"
  subTitleHeader.style.fontWeight = "400"
  subTitleHeader.style.margin = "0"
  subTitleHeader.style.color = "#666"

  
  const divProfile = document.createElement("div")
  divProfile.style.display = "flex"
  divProfile.style.alignItems = "center"
  divProfile.style.gap = "1rem"

  const divImage = document.createElement("div")
  divImage.style.height = "48px"
  divImage.style.width = "48px"
  divImage.style.borderRadius = "50%"
  divImage.style.overflow = "hidden"
  divImage.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)"

  const image = document.createElement("img")
  image.src = "https://picsum.photos/500"
  image.style.height = "100%"
  image.style.width = "100%"
  image.style.objectFit = "cover"
  image.alt = "Profile picture"

  const contentUser = document.createElement("div")
  contentUser.style.display = "flex"
  contentUser.style.flexDirection = "column"
  contentUser.style.justifyContent = "space-around"

  const nameUser = document.createElement("div")
  nameUser.innerText = "Usuário"
  nameUser.style.fontWeight = "600"
  nameUser.style.color = "#333"

  const typeUser = document.createElement("div")
  typeUser.innerText = "Comum"
  typeUser.style.fontSize = "0.875rem"
  typeUser.style.color = "#666"


  const navBar = document.createElement("nav")
  navBar.style.height = "100vh"
  navBar.style.width = "256px"
  navBar.style.minWidth = "256px"
  navBar.style.background = "white"
  navBar.style.padding = "2rem 1.5rem"
  navBar.style.boxShadow = "2px 0 4px rgba(0,0,0,0.05)"
  navBar.style.display = "flex"
  navBar.style.flexDirection = "column"
  navBar.style.zIndex = "10"

  const navgation = document.createElement("div")
  navgation.style.height = "100%"
  navgation.style.display = "flex"
  navgation.style.flexDirection = "column"
  navgation.style.justifyContent = "space-between"

  const logoImage = document.createElement("div")
  logoImage.style.width = "100%"
  logoImage.style.marginBottom = "2.5rem"

  const imageContent = document.createElement("img")
  imageContent.src = "../assets/logo-yellow.png"
  imageContent.style.width = "100%"
  imageContent.style.maxHeight = "50px"
  imageContent.style.objectFit = "contain"
  imageContent.alt = "Logo"

 
  const listBar = document.createElement("ul")
  listBar.id = "navBarListUl"
  listBar.style.listStyle = "none"
  listBar.style.padding = "0"
  listBar.style.margin = "0"
  listBar.style.display = "flex"
  listBar.style.width = "100%"
  listBar.style.flexDirection = "column"
  listBar.style.gap = "0.75rem"

  function highlightActiveButton(activeItem) {
    const titleHeader = document.getElementById("titleHeader")
    titleHeader.innerText = activeItem.id

    const subTitleHeader = document.getElementById("subTitleHeader")
    subTitleHeader.innerText = `Vamos ver sobre - ${activeItem.id}`

   
    const allItems = document.querySelectorAll("#navBarListUl li")
    allItems.forEach((item) => {
      item.style.background = ""
      item.style.fontWeight = "normal"
    })

    
    activeItem.style.background = "#DEE33E"
    activeItem.style.fontWeight = "600"

    
    const main = document.getElementById("main")
    main.innerHTML = ""

    if (activeItem.id == "Agendamentos") {
      main.appendChild(InitialSchedulingTimelineSection())
    } else if (activeItem.id == "Clientes") {
      main.innerHTML = "Clientes"

      const listObj = [
        {
          professional: "Fabiano",
          client: "João Silva",
          email: "joao.silva@email.com",
          date: "2025-04-10",
          hour: "14:00",
          description: "Desenvolvimento de site institucional",
          price: 2500,
          status: false,
        },
        {
          professional: "Bruno",
          client: "Maria Oliveira",
          email: "maria.oliveira@email.com",
          date: "2025-04-12",
          hour: "09:30",
          description: "Criação de landing page para campanha de marketing",
          price: 1800,
          status: false,
        },
        {
          professional: "Lucas",
          client: "Carlos Mendes",
          email: "carlos.mendes@email.com",
          date: "2025-04-15",
          hour: "11:00",
          description: "Sistema de agendamento para barbearia",
          price: 3200,
          status: false,
        },
        {
          professional: "Gabriell",
          client: "Ana Souza",
          email: "ana.souza@email.com",
          date: "2025-04-18",
          hour: "16:45",
          description: "E-commerce para loja de roupas",
          price: 5400,
          status: false,
        },
        {
          professional: "Vitor",
          client: "Lucas Pereira",
          email: "lucas.pereira@email.com",
          date: "2025-04-22",
          hour: "10:15",
          description: "Aplicativo mobile para controle de estoque",
          price: 7200,
          status: true,
        },
      ]
      main.appendChild(DailyServicesModal(listObj))
    } else if (activeItem.id == "Equipe") {
      main.innerHTML = "Equipe"
    } else if (activeItem.id == "Serviço") {
      main.innerHTML = "Serviço"

      const serviceDetails = {
        user: "Sem cadastro",
        service: "Corte com navalha",
        time: "10h30 - 11h15",
        employee: "Bruno",
        price: "40,00",
        registrationDate: "17/03/2025 - 18h55",
        notes: "",
      }

      const modal = ServiceDetailsModal(serviceDetails)
      document.body.appendChild(modal)
    }
  }

  const menuItems = ["Agendamentos", "Clientes", "Equipe", "Serviço"]

  menuItems.forEach((item) => {
    const li = document.createElement("li")
    li.classList.add("cursor")
    li.innerText = item
    li.id = item
    li.style.width = "100%"
    li.style.padding = "1rem"
    li.style.borderRadius = "8px"
    li.style.display = "flex"
    li.style.alignItems = "center"
    li.style.cursor = "pointer"
    li.style.transition = "all 0.2s ease"
    li.style.fontSize = "1rem"

  
    li.addEventListener("mouseover", function () {
      if (this.style.background !== "rgb(222, 227, 62)") {
        this.style.background = "#f5f5f5"
      }
    })

    li.addEventListener("mouseout", function () {
      if (this.style.background !== "rgb(222, 227, 62)") {
        this.style.background = ""
      }
    })

    li.addEventListener("click", () => {
      highlightActiveButton(li)
    })

    listBar.appendChild(li)
  })

 
  const buttonSair = document.createElement("div")
  buttonSair.classList = "cursor"
  buttonSair.innerText = "Sair"
  buttonSair.id = "Sair"
  buttonSair.style.width = "100%"
  buttonSair.style.padding = "0.875rem"
  buttonSair.style.background = "#EB4335"
  buttonSair.style.cursor = "pointer"
  buttonSair.style.borderRadius = "8px"
  buttonSair.style.display = "flex"
  buttonSair.style.justifyContent = "center"
  buttonSair.style.alignItems = "center"
  buttonSair.style.color = "white"
  buttonSair.style.fontWeight = "500"
  buttonSair.style.transition = "all 0.2s ease"


  buttonSair.addEventListener("mouseover", function () {
    this.style.background = "#d63a2d"
  })

  buttonSair.addEventListener("mouseout", function () {
    this.style.background = "#EB4335"
  })

  buttonSair.addEventListener("click", () => {
    fetch("/api/logout", {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro: ${res.status} - ${res.statusText}`)
        }
        return res.json()
      })
      .then((res) => {
        console.log(res)
        window.location.href = "/"
      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error)
      })
  })

 
  const componentNavBar = document.createElement("div")
  componentNavBar.style.display = "flex"
  componentNavBar.style.flexDirection = "column"
  componentNavBar.style.gap = "1rem"
  componentNavBar.style.height = "100%"
  componentNavBar.style.justifyContent = "space-between"

  logoImage.appendChild(imageContent)
  componentNavBar.appendChild(logoImage)
  componentNavBar.appendChild(listBar)

  navgation.appendChild(componentNavBar)
  navgation.appendChild(buttonSair)

  divTitleHeader.appendChild(titleHeader)
  divTitleHeader.appendChild(subTitleHeader)

  contentUser.appendChild(nameUser)
  contentUser.appendChild(typeUser)

  divImage.appendChild(image)
  divProfile.appendChild(divImage)
  divProfile.appendChild(contentUser)

  header.appendChild(divTitleHeader)
  header.appendChild(divProfile)

  navBar.appendChild(navgation)

  containerMain.appendChild(header)
  containerMain.appendChild(main)

  divContainerNav.appendChild(navBar)
  divContainerNav.appendChild(containerMain)

 
  setTimeout(() => {
    const liAgendamentos = document.getElementById("Agendamentos")
    if (liAgendamentos) {
      highlightActiveButton(liAgendamentos)
    }
  }, 0)

  return divContainerNav
}

