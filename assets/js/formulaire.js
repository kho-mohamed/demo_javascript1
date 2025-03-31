import navigationInit from './composants/navigation.js';

//liste des variables requise:
let sectionActif = 0;

//les éléments html selectioné:
const formulaireHTML = document.querySelector("form");
const sectionHtml = formulaireHTML.querySelectorAll("[data-page]");
const resumeHtml = formulaireHTML.querySelector(".resume_fiche");
const champsHtml = formulaireHTML.querySelectorAll("[name]");
const bouttonAvance = formulaireHTML.querySelector('[data-direction="1"]');
const bouttonRetour = formulaireHTML.querySelector("[data-direction= '-1']");
const submitForm = formulaireHTML.querySelector('input[type="submit"]');
const champMagasin = formulaireHTML.querySelector('[name="magasin"]');

// Fonction d'initation:
function init() {
  navigationInit();
  // on valide le formulaire au chargement de la page:
  validerFormulaire();
  // on ajoute les écouteurs d'évenement:
  champsHtml.forEach((champHtml) => {
    champHtml.addEventListener("change", onChangeChamp);
    if (champHtml.name == "livraison_en_magasin") {
      activeChampMagasin(champHtml);
    }
  });

  bouttonAvance.addEventListener("click", onClickNav);
  bouttonRetour.addEventListener("click", onClickNav);
  formulaireHTML.addEventListener("submit", envoieFormulaire);
  submitForm.addEventListener("click", envoieFormulaire);

  // on affiche la première section au démarrage:
  afficherSection(sectionActif);
}

// fonction qui arrête l'évenement par défaut du formulaire et l'envoie si il est valide:
function envoieFormulaire(evenement) {
  evenement.preventDefault();

  if (validerFormulaire()) {
    formulaireHTML.submit();
  } else {
    // on désactive le boutton si le formulaire n'est pas valide:
    submitForm.disable = "true";
  }
}

// fonction de validation du formulaire:
function validerFormulaire() {
  // on check si le formulaire est valide:
  const formValide = formulaireHTML.checkValidity();
  if (formValide == false) {
    // si il est pas valide on le désactive:
    submitForm.disabled = "true";
    submitForm.classList.add("inactif");
  } else {
    // si il est valide on l'active
    submitForm.removeAttribute("disabled");
    submitForm.classList.remove("inactif");
  }
  return formValide;
}

// fonction qui active les magasins quand la checkbox est activé :
function activeChampMagasin(champHtml) {
  // vérification si il est checké:
  const estCheck = champHtml.checked;
  if (estCheck) {
    champMagasin.required = "true";
    champMagasin.removeAttribute("disabled");
  } else {
    champMagasin.disabled = "true";
    champMagasin.removeAttribute("required");
    champMagasin.value = "";
  }
}

// fonction qui cache la section choisie:
function cacherSection() {
  sectionHtml.forEach(function (sectionHtml) {
    sectionHtml.classList.add("invisible");
  });
}

// fonction qui affiche la section choisie selon l'index reçu en paramettre:
function afficherSection(indexSection) {
  cacherSection();
  sectionHtml[indexSection].classList.remove("invisible");
  afficherBouttonNav();
}

// fonction qui cache ou affiche les bouttons selon notre position dans le formulaire:
function afficherBouttonNav() {
  // au début du formulaire on désactive Retour:
  bouttonRetour.classList.toggle("invisible", sectionActif <= 0);
  // à la fin du formulaire on désactive Avancer:
  bouttonAvance.classList.toggle(
    "inactif",
    sectionActif >= sectionHtml.length - 1
  );
  // le boutton submit n'est activé qu'à la dernière section:
  submitForm.classList.toggle(
    "invisible",
    sectionActif != sectionHtml.length - 1
  );
}

// fonction qui affiche la section au click sur les bouttons de navigations Reculer et Avancer:
function onClickNav(evenement) {
  const declencheur = evenement.currentTarget;
  const direction = Number(declencheur.dataset.direction);
  sectionActif += direction;
  sectionActif = Math.min(sectionActif, sectionHtml.length - 1);
  sectionActif = Math.max(sectionActif, 0);
  afficherSection(sectionActif);
}

//fonction qui gére le comportement des champs au changement:
function onChangeChamp(evenement) {
  const champHtml = evenement.currentTarget;
  const nomchamp = champHtml.name;
  const valeurChamp = champHtml.value;
  // pour la livraison au magasin, on appel la fonction qui active la liste selon la checkbox
  if (nomchamp == "livraison_en_magasin") {
    activeChampMagasin(champHtml);
  }
  // pour le courriel on a posé un message d'erreur personalisé si l'email ne fini pas par gmail.com
  if (nomchamp == "courriel" && valeurChamp.endsWith("gmail.com") == false) {
    champHtml.setCustomValidity("Le courriel doit se terminer par @gmail.com");
  } else {
    champHtml.setCustomValidity("");
  }
  // pour les champ téléphone on veux reformatté le téléphone comme on veux l'afficher:
  if (nomchamp == "telephone") {
    champHtml.value = champHtml.value.replace(
      /\(?(\d{3})\)?\s?-?(\d{3})-?(\d{4})/,
      "($1) $2-$3"
    );
  }
  // formattage approprié pour le code postale:
  if (nomchamp == "codepostal") {
    champHtml.value = champHtml.value.replace(
      /([a-zA-Z]\d[a-zA-z])\s?(\d[a-zA-Z]\d)/,
      "$1 $2"
    );
  }
  // validation des champs et du formulaire:
  validationChamp(champHtml);
  validerFormulaire();
}

//fonction qui  valide le champ et affiche une erreur si il est pas valide
function validationChamp(champHtml) {
  const estValide = champHtml.checkValidity();
  champHtml.classList.toggle("erreur", estValide == false);
  if (estValide) {
    modifierResume(champHtml);
  }
}

// fonction qui affiche le résumé selon les données saisie par l'utilisateur:
function modifierResume(champHtml) {
  const valeurChamp = champHtml.value;
  const nomChamp = champHtml.name;
  const paragHTML = resumeHtml.querySelector(`[data-champ = ${nomChamp}]`);

  if (paragHTML) {
    if (nomChamp == "livraison_en_magasin") {
      paragHTML.textContent = champHtml.checked ? "oui" : "non";
    } else {
      paragHTML.textContent = valeurChamp;
    }
  }
}
init();
