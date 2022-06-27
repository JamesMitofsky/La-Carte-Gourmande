main();

function main() {
  listenForCardsHover();
  createMapLink();
  listenForDialog();
  listenForCardDetails();
  getAppHeight();
  listenToPOIs();
<<<<<<< HEAD
  detectCardOpenSwipe();
}

function detectCardOpenSwipe() {
  // get elements with card class
  let cards = document.getElementsByClassName("card");

  // loop through all cards
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    var mc = new Hammer(card);

    //enable all directions
    mc.get("swipe").set({
      direction: Hammer.DIRECTION_ALL,
      threshold: 1,
      velocity: 0.1,
    });

    // listen to events...
    mc.on("swipeup", function () {
      // open card details
      console.log(card);
    });
  }
=======
>>>>>>> main
}

function scrollToCard(x) {
  // get carousel element by class
  let carousel = document.getElementsByClassName("carousel")[0];

  // scroll to x position
  let carouselPosition = carousel.scrollLeft;

  let newPos = carouselPosition + x;

  carousel.scrollTo(newPos, 0);
}

function getAppHeight() {
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", appHeight);
  appHeight();
}

function listenToPOIs() {
  // get all elements with class POI
  let pointsOfInterest = document.getElementsByClassName("POI");

  // create loop of pointsOfInterest to listen for click
  for (let i = 0; i < pointsOfInterest.length; i++) {
    // listen for click
    pointsOfInterest[i].addEventListener("click", function () {
      let poiEl = this;
      // get poi id
      let poiId = poiEl.id;

      // get all elements with class card
      let cards = document.getElementsByClassName("card");
      // check if card has id which matches poiID
      for (let j = 0; j < cards.length; j++) {
        let card = cards[j];

        // trim card-specific id ending from the string
        let cardId = card.id.slice(0, -5);

        if (cardId === poiId) {
          // if card already has active-card class, return
          if (card.classList.contains("active-card")) return;

          removeClassFromElements(cards, "active-card");

          // add class active-card to card
          card.classList.add("active-card");

          // get position of card
          let cardPosition = getElDimensions(card);
          scrollToCard(cardPosition.x - 10);

          panToPin(poiEl);
        }
      }
    });
  }
}

function listenForCardDetails() {
  // get element with class "read-more"
  let readMoreElements = document.getElementsByClassName("read-more");

  // create loop of readMoreElements to listen for click
  for (let i = 0; i < readMoreElements.length; i++) {
    let readMore = readMoreElements[i];
    readMore.addEventListener("click", function () {
<<<<<<< HEAD
      // get element with class "card"
      let card = readMore.parentElement;
      // open card details
      openCloseCard(card);
=======
      // get child element of readmore
      let readMoreChild = readMore.firstElementChild;

      // get element with class "card"
      let card = readMore.parentElement;

      if (!card.classList.contains("selected-card")) {
        // add class "active-card" to card
        card.classList.add("selected-card");

        // update text content of button
        readMoreChild.textContent = "Retour ⏎";
      } else {
        card.classList.remove("selected-card");
        readMoreChild.textContent = "Voir plus 🔍";
      }
>>>>>>> main
    });
  }
}

<<<<<<< HEAD
function openCloseCard(card) {
  // get readmore element
  let readMore = card.getElementsByClassName("read-more")[0];

  // get child element of readmore
  let readMoreChild = readMore.firstElementChild;

  if (!card.classList.contains("selected-card")) {
    // add class "active-card" to card
    card.classList.add("selected-card");
    ``;
    // update text content of button
    readMoreChild.textContent = "Retour ⏎";
  } else {
    card.classList.remove("selected-card");
    readMoreChild.textContent = "Voir plus 🔍";
=======
function openCardDetails(e) {
  // get parent element via returned event
  let el = e.target;
  let parentEl = el.parentElement;
  let parentClasses = parentEl.classList;

  // if in leaving state, prepare for active state
  if (parentClasses.contains("selected-card")) {
    // update text of button
    el.firstChild.textContent = "Voir plus 🔍";
    parentEl.classList.remove("selected-card");
  } else {
    // add selected class to this button's parent card
    parentEl.classList.add("selected-card");

    // since now in active state, prepare for departing state
    el.firstChild.textContent = "Retour ⏎";
>>>>>>> main
  }
}

function listenForDialog() {
  // get element with id "info-btn"
  let infoBtn = document.getElementById("info-btn");
  // get dialog element by tag
  let dialog = document.getElementsByTagName("dialog")[0];

  // listen for click event
  infoBtn.addEventListener("click", () => {
    // open HTML dialog
    dialog.showModal();
    // add the class active-dialog to the dialog element
    dialog.classList.add("active-dialog");
  });

  // listen for click event on dialog close button
  document.getElementById("close-dialog").addEventListener("click", () => {
    // remove class active-dialog from dialog element
    dialog.classList.remove("active-dialog");

    // delayed to match duration of CSS animation, smoothing the transition
    setTimeout(() => {
      // close dialog
      dialog.close();
    }, "500");
  });
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
