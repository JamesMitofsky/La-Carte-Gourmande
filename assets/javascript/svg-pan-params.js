function testingMath(poiEl) {
  showNode(poiEl);
  function showNode(node) {
    const bbox = node.getBBox();

    // pan so the node is at the center
    const { width, height, realZoom } = panZoom.getSizes();
    panZoom.pan({
      x: -realZoom * (bbox.x - width / (realZoom * 2) + bbox.width / 2),
      y: -realZoom * (bbox.y - height / (realZoom * 2) + bbox.height / 2),
    });

    // we want to zoom in to see just around the node -
    const relativeZoom = panZoom.getZoom();
    // this formula below could be improved... I found it worked nicely for my usecases but maybe it should controlled by a 2nd parameter to this function
    const desiredWidth = 50 * Math.sqrt(bbox.width / 25) * 11 * realZoom;
    panZoom.zoom((relativeZoom * width) / desiredWidth);
  }
}

function panToPin(poiEl) {
  // get viewport element
  // get svg which is child of element with id "container"
  let svg = document.getElementById("container").children[0];
  svg.classList.add("actively-moving");

  panZoom.center();

  testingMath(poiEl);

  // setTimeout(() => {
  //   svg.classList.remove("actively-moving");
  // }, "1000");
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
    minZoom: 1,
    maxZoom: 10,
    customEventsHandler: eventsHandler,
  });
};
