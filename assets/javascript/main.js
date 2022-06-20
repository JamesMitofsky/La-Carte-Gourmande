main();

function main() {
  hideLoadingScreen();
  matchCardsWithPins();
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

function matchCardsWithPins() {
  // get elements with class "card"
  let cards = document.getElementsByClassName("card");
  // get elements with class point-of-interest
  let pointsOfInterest = document.getElementsByClassName("POI");

  // compare cards and pointsOfInterest to find matching elements
  for (let i = 0; i < cards.length; i++) {
    for (let j = 0; j < pointsOfInterest.length; j++) {
      // trim last characters from the card ID to get the pure restaurant name
      let card = cards[i];
      let cardId = card.id.slice(0, -5);
      // Get POI ID as a property of the element
      let pointOfInterestID = pointsOfInterest[j].id;

      // return true if cardId and pointOfInterestId match
      if (cardId === pointOfInterestID) {
        // add click event listener to card
        card.addEventListener("click", function () {
          let relativeDistance = getRelativeDistanceOfPin(pointOfInterestID);
          // remove the active-poi class from any previous instances
          removeActiveClass();
          document
            .getElementById(pointOfInterestID)
            .classList.add("active-POI");
          // panToPin(relativeDistance);
        });
      }
    }
  }
}

function removeActiveClass() {
  // get elements with class "active-POI"
  let activePOIs = document.getElementsByClassName("active-POI");
  // remove class "active-POI" from all elements
  for (let i = 0; i < activePOIs.length; i++) {
    activePOIs[i].classList.remove("active-POI");
  }
}

function getRelativeDistanceOfPin(pointOfInterestID) {
  // return object of viewport dimensions
  let map = document.getElementsByClassName("svg-pan-zoom_viewport")[0];
  let mapDimensions = getElDimensions(map);
  // return object of pin dimensions
  let pin = document.getElementById(pointOfInterestID);
  let pinDimensions = getElDimensions(pin);

  // compare map and pin dimensions to find relative distance of pin
  let relativeDistance = {
    x: pinDimensions.x - mapDimensions.x,
    y: pinDimensions.y - mapDimensions.y,
  };
  return relativeDistance;
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
