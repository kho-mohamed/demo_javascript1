import modeSombre from "./modeSombre.js";
// Création du tableau de liens:
const listePage = [
  { nom: "Accueil", lien: "index.html" },
  { nom: "A propos", lien: "apropos.html" },
  { nom: "Contact", lien: "contact.html" },
  { nom: "Formulaire achat", lien: "formulaire.html" },
];

// Fonction d'initialisation
export default function init() {
  baliseNav();
  barrenavigation(listePage);
  pageselection();
  modeSombre();
}

// Création d'une fonction qui génère un élément HTML de navigation:
function navigation(nom, lien) {
  return `<li><a href="${lien}">${nom}</a></li>`;
}

// Générer la barre de navigation :
function barrenavigation(listePage) {
  const localisationHTML = document.querySelector(".nav__liste");
  for (let i = 0; i < listePage.length; i++) {
    const nom = listePage[i].nom;
    const lien = listePage[i].lien;
    const contenueHTML = navigation(nom, lien);
    localisationHTML.insertAdjacentHTML("beforeend", contenueHTML);
  }
}

// Changement de style de la page actuelle:
function pageselection() {
  const navigation = document.querySelectorAll(".nav__liste a");
  const pageactuel = window.location.pathname;
  for (let i = 0; i < navigation.length; i++) {
    const page = "/" + navigation[i].getAttribute("href");
    if (pageactuel === page) {
      navigation[i].style.color = "blue";
      navigation[i].style.fontWeight = "bold";
    }
  }
}
// Fonction pour l'implémentation de la navigation:
function baliseNav() {
  const navHTML = document.querySelector("#nav-principale");
  const nav = `<img src="assets/img/logo.webp" alt="logo" class="logo" />
          <ul class="nav__liste"></ul>`;
  navHTML.insertAdjacentHTML("beforeend", nav);
}
