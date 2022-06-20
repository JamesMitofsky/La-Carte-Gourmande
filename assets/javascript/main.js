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

      // trim last characters from card id
      let cardId = card.id.slice(0, -5);
      // trim last characters from pointOfInterest id
      let pointOfInterestId = pointOfInterest.id.slice(0, -4);

      // return true if cardId and pointOfInterestId match
      if (cardId === pointOfInterestId) {
        // add click event listener to card
        card.addEventListener("click", function () {
          let relativeDistance = getRelativeDistanceOfPin();
          panToPin(relativeDistance);
        });
      }
    }
  }
}

function getRelativeDistanceOfPin() {
  // return object of viewport dimensions
  let map = document.getElementsByClassName("svg-pan-zoom_viewport")[0];
  let mapDimensions = getElDimensions(map);
  // return object of pin dimensions
  let pin = document.getElementById("le-comptoir-POI");
  let pinDimensions = getElDimensions(pin);

  // compare map and pin dimensions to find relative distance of pin
  let relativeDistance = {
    x: pinDimensions.x - mapDimensions.x,
    y: pinDimensions.y - mapDimensions.y,
  };
  return relativeDistance;
}

function getXandY(el) {
  // get x and y positions of el
  let x = el.offsetLeft;
  let y = el.offsetTop;
  return { x, y };
}

function getElDimensions(el) {
  // return height and width of element
  return (dimensions = el.getBoundingClientRect());
}

function findCenterOfElement(el) {
  // get bounding client rect of el
  let rect = el.getBoundingClientRect();
  // get center of rect
  let center = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
  return center;
}
