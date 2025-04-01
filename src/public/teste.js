import MeuComponente from "./js/pages/components/clientPages/StratYoutBooking.js";

document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root"); // Pegando a div root
  if (root) {
    root.appendChild(MeuComponente()); // Adiciona o componente ao root
    console.log("Componente adicionado ao root!");
  } else {
    console.error("Elemento root não encontrado!");
  }
});