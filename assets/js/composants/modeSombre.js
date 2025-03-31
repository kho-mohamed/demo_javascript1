const elementHTML = document.querySelectorAll("[data-mode]");

function init() {
  elementHTML.forEach(function (element) {
    element.addEventListener("click", onClick);
  });
  affichageBoutton();
}

function onClick(evenement) {
  const boutton = evenement.currentTarget;
  if (boutton) {
    const option = boutton.dataset.mode;
    changementMode(option);
  }
}

function changementMode(option) {
  localStorage.setItem("mode", option);
  activerMode();
}
function activerMode() {
  const option = localStorage.getItem("mode") || "clair";
  document.body.dataset.theme = option;
  affichageBoutton();
}

function affichageBoutton() {
  elementHTML.forEach(function (element) {
    const optionActive = localStorage.getItem("mode") || "clair";
    const optionElement = element.dataset.mode;
    element.classList.toggle("invisible", optionElement == optionActive);
  });
}

export default init;
