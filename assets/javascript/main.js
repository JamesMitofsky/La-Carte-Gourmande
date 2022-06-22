main();

function main() {
  hideLoadingScreen();
  listenForCardsHover();
  createMapLink();
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

function matchCardsWithPins(activeCard) {
  // get elements with class point-of-interest
  let pointsOfInterest = document.getElementsByClassName("POI");

  // compare cards and pointsOfInterest to find matching elements
  for (let j = 0; j < pointsOfInterest.length; j++) {
    // trim last characters from the card ID to get the pure restaurant name
    let cardId = activeCard.id.slice(0, -5);
    // Get POI ID as a property of the element
    let pointOfInterestID = pointsOfInterest[j].id;

    // return true if cardId and pointOfInterestId match
    if (cardId === pointOfInterestID) {
      moveMapToPin(pointOfInterestID);

      let activePOIs = document.getElementsByClassName("active-POI");
      removeClassFromElements(activePOIs, "active-POI");

      document.getElementById(pointOfInterestID).classList.add("active-POI");
    }
  }
}

function moveMapToPin(pointOfInterestID) {
  let poiEl = document.getElementById(pointOfInterestID);

  panToPin(poiEl);
}

function listenForCardsHover() {
  let cards = document.getElementsByClassName("card");

  // create loop of cards to listen for hover
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];

    highlightCardAndPin(card, "mouseover", cards);
    highlightCardAndPin(card, "touchstart", cards);
  }
}

function highlightCardAndPin(card, eventName, cards) {
  card.addEventListener(
    eventName,
    () => {
      // if leftmostCard already contains class "active-card"
      if (card.classList.contains("active-card")) return;

      // bounce pin related to card
      matchCardsWithPins(card);

      // remove class from all other cards before re-assiging
      removeClassFromElements(cards, "active-card");
      card.classList.add("active-card");
    },
    { passive: true }
  );
}

function removeClassFromElements(elements, className) {
  // iterate through elements
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    // remove class from element
    element.classList.remove(className);
  }
}

function elementDimensions(elementID) {
  // return object of pin dimensions
  let element = document.getElementById(elementID);
  let elementDimensions = getElDimensions(element);

  return elementDimensions;
}

function getElDimensions(el) {
  // return height and width of element
  return (dimensions = el.getBoundingClientRect());
}

function findElementLeftAndTop(el) {
  // get bounding client rect of el
  let elValues = el.getBoundingClientRect();
  // get center of rect
  let leftTopDimensions = {
    left: elValues.left,
    top: elValues.top,
  };
  return leftTopDimensions;
}

function createMapLink() {
  // is the device on apple or Google device?
  let deviceTypeURL = mapsSelector();

  // get all elements with read-more class
  let els = document.getElementsByClassName("open-map-app");
  // create loop of all elements
  for (let i = 0; i < els.length; i++) {
    // build the right URL for the user's device
    let el = els[i];
    let restaurantName = el.getAttribute("data-restaurant-name");
    let newURL = deviceTypeURL + restaurantName;
    el.setAttribute("href", newURL);
  }
}

function mapsSelector() {
  // both map options will require the name of the place added at the end of the URL
  if (iOS()) {
    return "maps://maps.google.com/maps?q=";
  } else return "https://maps.google.com/maps/search/";
}

function iOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}
