main();

function main() {
  let svg = document.getElementById("number3");
  addListener(svg);
}

function listenerCallback(evt) {
  alert(`You hit the listener callback for ${evt.currentTarget.id}`);
}

function addListener(el) {
  el.addEventListener("click", listenerCallback);
}
