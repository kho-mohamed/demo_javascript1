export default function init(
  conteneurHTML,
  message,
  type = "promotion",
  lienImage
) {
  if (localStorage.getItem("infolettre") != "true") {
    genereHTML(conteneurHTML, type, message, lienImage);
  }
}
function clickBoite(evenement) {
  let bouttonFermer = evenement.currentTarget;
  let boite = bouttonFermer.closest(".boite-annonce");
  supprimeBoite(boite);
}
function genereHTML(conteneurHTML, type, message, lienImage) {
  let gabarit = `<div class="boite-annonce" data-type="${type}"><div class="titre_boite"><h2>${message}</h2><span>X</span></div><img src="${lienImage}" alt="infolettre"><form class="form_boite" action="">
  <input type="email" placeholder="Veuillez saisir votre email" />
  <input type="button" value="S'abonner"/>
</form></div>`;
  conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
  let clicfermer = document.querySelector(".titre_boite>span");
  clicfermer.addEventListener("click", clickBoite);
}

function supprimeBoite(boite) {
  localStorage.setItem("infolettre", true);
  boite.remove();
}
