main();

function main() {
  // All unique names used for the restaurants
  let arrayOfNames = ["keys-and-co", "test-for-proof"];

  // convert names into meaningful HTML/CSS usable IDs
  // let nameIDs = getIDs(arrayOfNames);
  // addListeners(nameIDs);

  hideLoadingScreen();
}

function getIDs(arrayOfNames) {
  let nameIDs = [];
  arrayOfNames.forEach((name) => {
    nameIDs.push(buildNameIDs(name));
  });
  return nameIDs;
}

function buildNameIDs(name) {
  let mapID = name.concat("-map");
  let cardID = name.concat("-card");

  return { name, mapID, cardID };
}

function addListeners(nameIDs) {
  // add click listener to each object in array
  nameIDs.forEach((nameID) => {
    document.getElementById(`${nameID.mapID}`).addEventListener("click", () => {
      alert("running programmatically");
    });
  });
}

function hideElement(el) {
  // add class .hidden to el
  el.classList.add("hidden");
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
      }, "4000");
    },
    false
  );
}
