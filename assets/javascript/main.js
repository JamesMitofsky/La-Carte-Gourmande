main();

function main() {
  listenForCardsHover();
  createMapLink();
  listenForDialog();
  listenForCardDetails();
  getAppHeight();
  listenToPOIs();
  detectCardOpenSwipe();
}

function detectCardOpenSwipe() {
  // get elements with card class
  let cards = document.getElementsByClassName("card");

  // loop through all cards
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    var mc = new Hammer(card, { touchAction: "pan-x" });

    //enable all directions
    mc.get("swipe").set({
      direction: Hammer.DIRECTION_ALL,
      threshold: 1,
      velocity: 0.1,
    });

    // listen to events...
    mc.on("swipeup", function () {
      // open card details
      openCloseCard(card);
    });

    mc.on("swipedown", function () {
      // open card details
      openCloseCard(card);
    });
  }
}

//
function scrollToCard(cardDistanceToLeft) {
  // get carousel element by class
  let carousel = document.getElementsByClassName("carousel")[0];

  // current scroll position of the carousel itself
  let carouselPosition = carousel.scrollLeft;

  // get new position by setting the current scroll position to match the exact distance from the left of the incoming card
  let newPos = carouselPosition + cardDistanceToLeft;

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
      // get element with class "card"
      let card = readMore.parentElement;
      // open card details
      openCloseCard(card);
    });
  }
}

function openCloseCard(card) {
  // get readmore element
  let readMore = card.getElementsByClassName("read-more")[0];

  // get child element of readmore
  let readMoreChild = readMore.firstElementChild;

  if (!card.classList.contains("selected-card")) {
    flipMethod(card, "enter");
    // update text content of button
    readMoreChild.textContent = "Revoir la Carte 🧑‍🍳";
  } else {
    flipMethod(card, "leave");
    readMoreChild.textContent = "Allez-y 🍽";
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
  let mapURLParams = buildMapURL();

  // get all elements with read-more class
  let cards = document.getElementsByClassName("card");
  // create loop of all elements
  for (let i = 0; i < cards.length; i++) {
    // build the right URL for the user's device
    let card = cards[i];
    let restaurantName = card.getAttribute("data-restaurant-name");
    let placeID = card.getAttribute("data-place-id");
    if (placeID == "") placeID = restaurantName;

    // get button element to set link address
    let mapBtn = card.getElementsByClassName("map-btn")[0];

    mapBtn.href =
      mapURLParams.base + restaurantName + mapURLParams.placeIDParam + placeID;
  }
}

function buildMapURL() {
  let base = "https://www.google.com/maps/search/?api=1&query=";
  let placeIDParam = "&query_place_id=";
  return { base, placeIDParam };
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

function cardSelectionState(card, direction) {
  if (direction == "enter") {
    card.classList.add("selected-card");
  } else {
    card.classList.remove("selected-card");
  }
}

function flipMethod(elm, movementDirection) {
  // First: get the current bounds
  const first = elm.getBoundingClientRect();

  // execute the script that causes layout change
  cardSelectionState(elm, movementDirection);

  // Last: get the final bounds
  const last = elm.getBoundingClientRect();

  // Invert: determine the delta between the
  // first and last bounds to invert the element
  const deltaX = first.left - last.left;
  const deltaY = first.top - last.top;
  const deltaW = first.width / last.width;
  const deltaH = first.height / last.height;

  // Play: animate the final element from its first bounds
  // to its last bounds (which is no transform)

  elm.animate(
    [
      {
        transformOrigin: "top left",
        transform: `
    translate(${deltaX}px, ${deltaY}px)
    scale(${deltaW}, ${deltaH})
  `,
      },
      {
        transformOrigin: "top left",
        transform: "none",
      },
    ],
    {
      duration: 300,
      easing: "ease-in-out",
      fill: "both",
    }
  );
}
