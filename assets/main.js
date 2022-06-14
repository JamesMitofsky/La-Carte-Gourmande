main();

function main() {
  console.log("main function running");
  let svg = document.getElementById("green-space");
  let testDiv = document.getElementById("test-div");

  addListener(testDiv);
  addListener(svg);
}

function listenerCallback(evt) {
  alert(`You hit the listener callback for ${evt.currentTarget.id}`);
}

function addListener(el) {
  el.addEventListener("click", listenerCallback);
}
