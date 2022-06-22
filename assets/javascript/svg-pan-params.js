function testingMath(poiEl) {
  // get center of element with id "map-of-caen"
  let map = document.getElementsByClassName("svg-pan-zoom_viewport")[0];
  // get center of map element
  let mapDistanceValues = findElementLeftAndTop(map);
  let pinDistanceValues = findElementLeftAndTop(poiEl);

  let correctDistance = {
    x: mapDistanceValues.left - pinDistanceValues.left,
    y: mapDistanceValues.top - pinDistanceValues.top,
  };
  console.log(correctDistance);

  panZoom.panBy({ x: correctDistance.x, y: correctDistance.y });
}

function panToPin(poiEl) {
  // get viewport element
  // get svg which is child of element with id "container"
  let svg = document.getElementById("container").children[0];
  svg.classList.add("actively-moving");

  panZoom.center();

  testingMath(poiEl);

  setTimeout(() => {
    svg.classList.remove("actively-moving");
  }, "1000");
}
window.onload = function () {
  var eventsHandler;

  eventsHandler = {
    haltEventListeners: [
      "touchstart",
      "touchend",
      "touchmove",
      "touchleave",
      "touchcancel",
    ],
    init: function (options) {
      var instance = options.instance,
        initialScale = 1,
        pannedX = 0,
        pannedY = 0;

      // Init Hammer
      // Listen only for pointer and touch events
      this.hammer = Hammer(options.svgElement, {
        inputClass: Hammer.SUPPORT_POINTER_EVENTS
          ? Hammer.PointerEventInput
          : Hammer.TouchInput,
      });

      // Enable pinch
      this.hammer.get("pinch").set({ enable: true });

      // Handle double tap
      this.hammer.on("doubletap", function (ev) {
        instance.zoomIn();
      });

      // Handle pan
      this.hammer.on("panstart panmove", function (ev) {
        // On pan start reset panned variables
        if (ev.type === "panstart") {
          pannedX = 0;
          pannedY = 0;
        }

        // Pan only the difference
        instance.panBy({ x: ev.deltaX - pannedX, y: ev.deltaY - pannedY });
        pannedX = ev.deltaX;
        pannedY = ev.deltaY;
      });

      // Handle pinch
      this.hammer.on("pinchstart pinchmove", function (ev) {
        // On pinch start remember initial zoom
        if (ev.type === "pinchstart") {
          initialScale = instance.getZoom();
          instance.zoomAtPoint(initialScale * ev.scale, {
            x: ev.center.x,
            y: ev.center.y,
          });
        }

        instance.zoomAtPoint(initialScale * ev.scale, {
          x: ev.center.x,
          y: ev.center.y,
        });
      });

      // Prevent moving the page on some devices when panning over SVG
      options.svgElement.addEventListener("touchmove", function (e) {
        e.preventDefault();
      });
    },

    destroy: function () {
      this.hammer.destroy();
    },
  };

  // Expose to window namespace for testing purposes
  window.panZoom = svgPanZoom("#map-of-caen", {
    zoomEnabled: true,
    controlIconsEnabled: false,
    fit: 1,
    center: 1,
    customEventsHandler: eventsHandler,
  });
};
