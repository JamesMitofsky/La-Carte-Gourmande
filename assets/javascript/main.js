main();

function main() {
  hideLoadingScreen();
  cards();
}

function hideLoadingScreen() {
  // listen for DOM to render; infer that CSS loading animation begins when DOM renders
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      // wait after content is loaded for CSS animations to complete
      setTimeout(() => {
        // get element with id "loading"
        let loading = document.getElementById("loading");
        hideElement(loading);
      }, "5300");
    },
    false
  );
}
function hideElement(el) {
  // add class .hidden to el
  el.classList.add("hidden");
}

function cards() {
  // get elements with class "card"
  let cards = document.getElementsByClassName("card");
  // get elements with class point-of-interest
  let pointsOfInterest = document.getElementsByClassName("point-of-interest");

  // compare cards and pointsOfInterest to find matching elements
  for (let i = 0; i < cards.length; i++) {
    for (let j = 0; j < pointsOfInterest.length; j++) {
      // create element for current iteration of cards and pointsOfInterest
      let card = cards[i];
      let pointOfInterest = pointsOfInterest[j];

      // trim last 6 characters from card id
      let cardId = card.id.slice(0, -5);
      // trim last 6 characters from pointOfInterest id
      let pointOfInterestId = pointOfInterest.id.slice(0, -4);

      // return true if cardId and pointOfInterestId match
      if (cardId === pointOfInterestId) {
        // add click event listener to card
        card.addEventListener("click", function () {
          console.log("you clicked on " + cardId);
          // panToElement();
          // let userData = prompt(
          //   "Pass an object indicating your desired move distance. (e.g. {x: 5, y: 3 }"
          // );
          customPanBy({ x: 5, y: 10 });
        });
      }
    }
  }
}
