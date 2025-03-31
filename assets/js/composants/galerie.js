//les variables:
const galerieHTML = document.querySelector(".galerie");
const btnNaviation = galerieHTML.querySelectorAll("[data-switch]");
const imageHtml = galerieHTML.querySelectorAll("[data-image]");
let imageActive = 0;
let compteurClic = 0;
let interval;

//les fonctions:
export default function init() {
  // ajouter les ecouteurs d'événements
  btnNaviation.forEach(function (btn) {
    btn.addEventListener("click", navigationGalerie);
  });
  imageHtml.forEach(function (image) {
    image.addEventListener("click", agrandirImage);
  });
  afficherImage(imageActive);

  // on lance le défilement automatique avec une interval de 4 secondes.
  interval = setInterval(defilementImage, 4000);
}

//fonction de navigation entre les images:
function navigationGalerie(evenement) {
  // on extrait la direction de l'attribut data-switch:
  let direction = Number(evenement.currentTarget.dataset.switch);
  // on incrémente l'index de l'image
  imageActive = imageActive + direction;

  // si on arrive à la fin de la liste on revient au début:
  if (imageActive > imageHtml.length - 1) {
    imageActive = 0;
  }
  // si la direction part en arrière de la première image on reste au début:
  imageActive = Math.max(imageActive, 0);

  // on affiche l'image active:
  afficherImage(imageActive);

  // On arrête l'interval de défilement automatique:
  clearInterval(interval);
  // et on le redémarre:
  interval = setInterval(defilementImage, 4000);
}

// fonction pour cacher les images:
function cacherImage() {
  imageHtml.forEach(function (image) {
    image.classList.add("invisible");
  });
}

// fonction pour afficher une image:
function afficherImage(index) {
  // on cache toutes les images:
  cacherImage();
  // on affiche l'image active:
  imageHtml[index].classList.remove("invisible");
  imageHtml[index].animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 1000,
    delay: 100,
  });
}

function defilementImage() {
  imageActive++;
  // si on arrive à la fin de la liste on revient au début:
  if (imageActive > imageHtml.length - 1) {
    imageActive = 0;
  }
  afficherImage(imageActive);
}

//fonction pour agrandir l'image:
function agrandirImage(evenement) {
  // on récupère l'image cliquée:
  let image = evenement.currentTarget;
  // on ajoute ou on retire la classe agrandi selon si l'image est déjà agrandi ou non:
  if (compteurClic % 2 === 0) {
    image.classList.add("agrandi");
  } else {
    image.classList.remove("agrandi");
  }
  // on incrémente le compteur de clic:
  compteurClic++;
}
