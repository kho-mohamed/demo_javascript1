// Importation des fichier Js nécessaire au fonctionnement de la page:
import ScrollAnimator from "./class/ScrollAnimator.js";
import navigationInit from "./composants/navigation.js";

// Variable requise:
const article = document.querySelectorAll(".contact article");

function init() {
  //lancement de la fonction qui affiche la navigation:
  navigationInit();
  // activation de la class du scrollAnimator sur les articles
  const affichageAuDefilement = new ScrollAnimator(null, article);
}

init();
