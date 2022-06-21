main();

function main() {
  hideLoadingScreen();
  matchCardsWithPins();
  listenForLeftmostCard();

  // onCarouselScroll(matchCardsWithPins);
  // matchCardsWithPins();
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

function matchCardsWithPins(leftmostCard) {
  // get elements with class point-of-interest
  let pointsOfInterest = document.getElementsByClassName("POI");

  // compare cards and pointsOfInterest to find matching elements
  for (let j = 0; j < pointsOfInterest.length; j++) {
    // trim last characters from the card ID to get the pure restaurant name
    let cardId = leftmostCard.card.id.slice(0, -5);
    // Get POI ID as a property of the element
    let pointOfInterestID = pointsOfInterest[j].id;

    // return true if cardId and pointOfInterestId match
    if (cardId === pointOfInterestID) {
      // use relative distance to zoom in on pin
      // let relativeDistance = getRelativeDistanceOfPin(pointOfInterestID);
      removeActiveClass();
      document.getElementById(pointOfInterestID).classList.add("active-POI");
    }
  }
}

function listenForLeftmostCard() {
  // check current position of all cards on carousel scroll
  let carousel = document.getElementsByClassName("carousel")[0];
  carousel.addEventListener("scroll", () => {
    // get card elements
    let cards = document.getElementsByClassName("card");

    // create array to hold the cards once they're turned into objects
    let cardsArray = [];

    // determine position of each card
    for (let i = 0; i < cards.length; i++) {
      let card = cards[i];
      let cardDimensions = getElDimensions(card);
      cardsArray.push({ card, cardDimensions });
    }

    // find the card which is the furthest left but still on screen
    let leftmostCard = returnLeftmostCard(cardsArray);

    // bounce pin related to card
    matchCardsWithPins(leftmostCard);

    // if leftmostCard already contains class "active-card"
    if (leftmostCard.card.classList.contains("active-card")) return;

    // if it doesn't yet have this class, remove from the previous card and add to the new card
    // remove class "active-card" from all cards
    removeClassFromElements(cardsArray, "active-card");
    leftmostCard.card.classList.add("active-card");
  });
}

function removeClassFromElements(elements, className) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].card.classList.remove(className);
  }
}

function returnLeftmostCard(arrayOfObjs) {
  let res = arrayOfObjs.reduce(function (prev, current) {
    return prev.cardDimensions.left < current.cardDimensions.left &&
      prev.cardDimensions.left > -100
      ? prev
      : current;
  });
  return res;
}

// function oldFuncForCards() {
//   // modified
//   let cards = document.getElementsByClassName("card");

//   // var to remember which card is furthest left on screen
//   let leftmostCardData;
//   // loop of cards
//   for (let i = 0; i < cards.length; i++) {
//     let card = cards[i];

//     // get bounding client rect of card to determine if it is leftmost
//     let cardDimensionLeft = getElDimensions(card).left;

//     // if first iteration of loop, assign first card as leftmostCardData
//     if (i === 0) leftmostCardData = { card: null, cardDimensionLeft };

//     //  if it's not off-screen on the left (left is greater than 0) & it's the furthest left
//     // on-screen (it's left value is smaller than any other card)
//     let notOffLeftSide = cardDimensionLeft >= 0;

//     // only enter if-statement when leftmost card is on-screen (left position greater than 0)
//     let furthestLeft;
//     if (leftmostCardData.cardDimensionLeft > 0) {
//       furthestLeft = cardDimensionLeft < leftmostCardData.cardDimensionLeft;
//     } else {
//       furthestLeft = false;
//     }

//     if (notOffLeftSide && furthestLeft) {
//       leftmostCardData = { card, cardDimensionLeft };
//     }
//   }
//   return leftmostCardData;
// }

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

function isEllipsisActive() {
  // get paragraph elements that are children of class ".card"
  let cards = document.getElementsByClassName("card");

  let allParagraphs = [];
  // create for loop with cards
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    // get paragraph elements that are children of class ".card"
    let paragraphs = card.getElementsByTagName("p");

    // convert HTML collections to an array
    let parasArray = [...paragraphs];
    allParagraphs.push(parasArray);
  }
  // flatten the now returned array
  let flattenedParagraphs = allParagraphs.flat();

  // loop through paragraphs
  for (let i = 0; i < flattenedParagraphs.length; i++) {
    // get paragraph element
    let paragraph = flattenedParagraphs[i];
    // test e.offsetWidth < e.scrollWidth;
    ellipsisActive = paragraph.offsetWidth < paragraph.scrollWidth;
    if (!ellipsisActive) continue;
    // add class "read-more" to paragraph
    paragraph.classList.add("read-more");
    console.log("detected ellipsis on", paragraph);
  }
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
