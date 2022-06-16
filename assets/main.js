main();
var dialog = document.querySelector("dialog");
function openDialog(evt) {
  // set dialog content to match clicked element
  let targetElement = evt.target.id;
  let dialogContent = document.getElementById("dialogHeader");
  dialogContent.innerHTML = targetElement;
  dialog.showModal();
}
function closeDialog() {
  dialog.close();
}

function main() {
  //   get point of interest element and listen for click
  let svg = document.getElementById("number3");
  addDialogListener(svg);
}

function addDialogListener(el) {
  el.addEventListener("click", openDialog);
}
