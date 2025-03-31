import navigationInit from "./composants/navigation.js";
import boiteAnnonce from "./composants/boiteAnnonce.js";
// la liste des produits est enregistré sous forme de variables:
const listeproduits = [
  {
    id: 1,
    nom: "Poivre",
    prix: 90,
    description: "poivre origine bresil première qualité",
  },
  {
    id: 2,
    nom: "Curcuma",
    prix: 30,
    description: "curcuma origine inde première qualité",
  },
  {
    id: 3,
    nom: "Gingembre",
    prix: 60,
    description: "Gingembre origine inde première qualité",
  },
  {
    id: 4,
    nom: "Datte",
    prix: 60,
    description: "Datte de tunisie de première qualité",
  },
  {
    id: 5,
    nom: "Amande",
    prix: 80,
    description: "Amande des états-unis de première qualité",
  },
  {
    id: 6,
    nom: "Noix",
    prix: 100,
    description: "Noix des états-unis de première qualité",
  },
  {
    id: 7,
    nom: "Pistache",
    prix: 60,
    description: "Pistaches des états-unis de première qualité",
  },
  {
    id: 8,
    nom: "Figue",
    prix: 50,
    description: "Figue de première qualité",
  },
  {
    id: 9,
    nom: "fraise",
    prix: 10,
    description: "Fraise des états-unis de première qualité",
  },
];

// les variables de selections dont on aura besoin:
const filtreAlphacroi = document.querySelector("#tri-alpha-croissant");
const filtreAlphadecroi = document.querySelector("#tri-alpha-decroissant");
const filtrePrixcroi = document.querySelector("#tri-prix-croissant");
const filtrePrixdecroi = document.querySelector("#tri-prix-decroissant");
const detailProduitHTML = document.querySelector(".aside_detail");

// la variable de l'image de la boite d'annonce :
const lienImage = "/assets/img/info.jpg";

// Fonction d'initialisation
function init() {
  // activation de la fonction de navigation:
  navigationInit();

  // on affiche la boite modale avec un délai de 5secondes:
  setTimeout(function () {
    boiteAnnonce(
      document.body,
      "Bienvenue sur notre site, abonner vous pour recevoir nos offres promotionnelles",
      "promotion",
      lienImage
    );
  }, 5000);
  // activation de fonction d'affichage de la liste produits:
  affichageListeProduits(listeproduits);

  // le lancement des fonctions d'écouteur qui réagissent au clic et trie les listes selon chaque cas:
  filtreAlphacroi.addEventListener("click", clicktriealphabetique);
  filtreAlphadecroi.addEventListener("click", clictriealphabetiqueinverse);
  filtrePrixcroi.addEventListener("click", clictrieprixcroissant);
  filtrePrixdecroi.addEventListener("click", clictrieprixdecroissant);

  // on active l'animation de la grille de produit au lancement de la page.
  animationGrille();

  // on fait disparaître l'aside de détail de produit au lancement pour qu'il s'affiche qu'après un clic au produit:
  detailProduitHTML.classList.add("invisible");
}

// fonction qui génère les liens des photos à mettre dans src des images:
function genereLienImage(nomProduit) {
  let lien = `assets/img/images-produits/${nomProduit}.jpg`;
  return lien;
}

//fonction de la création du contenue html de la fiche produit:
function gabariProduit(produit) {
  const lienProduit = genereLienImage(produit.nom);
  const gabariHTML = `<div class="produit" id="${produit.id}">
              <h3>${produit.nom}</h3>
              <picture class="produit__img">
                <img
                  src="${lienProduit}"
                  alt="${produit.nom}" class="produit__img"
                />
              </picture>
              <p>${produit.description}</p>
              <button class="buy-button">Acheter</button>
            </div>`;
  return gabariHTML;
}

// affichage de la liste produit:
function affichageListeProduits(liste) {
  const grilleProduit = document.querySelector(".grille-produits");
  grilleProduit.innerHTML = "";
  // Pour vider la grille avant d'ajouter les produits
  //injection des produits du tableau:
  for (let i = 0; i < liste.length; i++) {
    let produitHTML = gabariProduit(liste[i]);
    //injection de l'HTML dans la page :
    grilleProduit.insertAdjacentHTML("beforeend", produitHTML);
    // ajout d'un écouteur d'évenement :
    const enfant = grilleProduit.lastElementChild;
    enfant.addEventListener("click", clicProduit);
  }
}

// fonction d'animation de la grille produit par produit avec un décallage entre chaque produit:
function animationGrille() {
  const blocsProduit = document.querySelectorAll(".produit");
  blocsProduit.forEach(function (blocProduit, index) {
    blocProduit.animate(
      [
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1 },
      ],
      { duration: 1500, delay: 300 * index, fill: "backwards" }
    );
  });
}

// fonction qui gére l'affichage après le clic sur un produit :
function clicProduit(evenement) {
  const baliseProduit = document.querySelectorAll(".produit");
  for (let i = 0; i < baliseProduit.length; i++) {
    baliseProduit[i].style.border = "none";
  }
  //récupération de l'élément viser par le clic:
  const produitClic = evenement.currentTarget;
  // récupération de l'ID:
  const id = produitClic.id;
  // on cherche le produit concerné :
  const Produitchoisi = trouveProduit(listeproduits, id);
  // affichage du produit dans la partie détail:
  affichagedetaille(Produitchoisi);
  // on applique aussi un style de bordure sur le produit selectionné pour le mettre en avant
  produitClic.style.border = "2px solid #FF6347";
  produitClic.style.borderRadius = "10px";
  //animation du produit après le clic.
  produitClic.animate([{ scale: 0 }, { scale: 1.05 }], {
    duration: 1000,
    delay: 300,
  });
}

// fonction qui permet de trouver chaque produit selon l'id saisie en paramettre:
function trouveProduit(produits, id) {
  //on traverse le tableau de donnée
  for (let i = 0; i < produits.length; i++) {
    const produit = produits[i];
    //on récupére l'id du produit:
    const idProduit = produit.id;
    //on le compare à l'id communiqué:
    if (idProduit == id) {
      //si la condition est vrai on retourne le tableau:
      return produit;
    }
  }
}
// fonction qui affiche un aperçue du produit selectionné dans le coté gauche :
function affichagedetaille(produit) {
  //récupéré les éléments html à remplir:
  const imageProduit = document.querySelector(".detail__img");
  const titreProduit = document.querySelector(".detail__nom");
  const descriptionProduit = document.querySelector(".detail__description");
  // commencer le remplissage:
  // création lien image produit:
  const src = genereLienImage(produit.nom);

  // injection des éléments html du produit selection:
  imageProduit.src = src;
  imageProduit.alt = produit.nom;
  titreProduit.textContent = produit.nom;
  descriptionProduit.textContent = produit.description;
  //on affiche la balise aside contenant les informations des produits: 
  detailProduitHTML.classList.remove("invisible");
}

//fonction de trie alphabetique qui reçoit la liste en paramettre:
function triealphabetique(liste) {
  //clone de la liste:
  const cloneliste = [...liste];
  //trie selon ordre alphabétique:
  cloneliste.sort(function (a, b) {
    if (a.nom < b.nom) {
      return -1;
    }
    if (a.nom > b.nom) {
      return 1;
    } else {
      return 0;
    }
  });
  //retourne la liste trié
  return cloneliste;
}

//fonction de trie alphabetique de Z à A qui reçoit la liste en paramettre:
function triealphabetiqueinverse(liste) {
  const cloneliste = [...liste];
  cloneliste.sort(function (a, b) {
    if (a.nom < b.nom) {
      return 1;
    }
    if (a.nom > b.nom) {
      return -1;
    } else {
      return 0;
    }
  });
  return cloneliste;
}

//fonction de trie par prix croissant  qui reçoit la liste en paramettre:
function trieprixcroissant(liste) {
  const cloneliste = [...liste];
  cloneliste.sort(function (a, b) {
    if (a.prix < b.prix) {
      return -1;
    }
    if (a.prix > b.prix) {
      return 1;
    } else {
      return 0;
    }
  });
  return cloneliste;
}

//fonction de trie par prix décroissant qui reçoit la liste en paramettre:
function trieprixdecroissant(liste) {
  const cloneliste = [...liste];
  cloneliste.sort(function (a, b) {
    if (a.prix < b.prix) {
      return 1;
    }
    if (a.prix > b.prix) {
      return -1;
    } else {
      return 0;
    }
  });
  return cloneliste;
}

// fonction d'affichage de la liste trié suite à l'évenement de clic sur un trie demandé:

function clicktriealphabetique() {
  const listeTrie = triealphabetique(listeproduits);
  affichageListeProduits(listeTrie);
}
function clictriealphabetiqueinverse() {
  const listeTrie = triealphabetiqueinverse(listeproduits);
  affichageListeProduits(listeTrie);
}
function clictrieprixcroissant() {
  const listeTrie = trieprixcroissant(listeproduits);
  affichageListeProduits(listeTrie);
}
function clictrieprixdecroissant() {
  const listeTrie = trieprixdecroissant(listeproduits);
  affichageListeProduits(listeTrie);
}

init(); // Lancer l'initialisation
