(() => {
  // index.ts
  var stuff = document.getElementById("stuff");
  var grid = document.getElementById("grid");
  var gridSidePixelCount = 20;
  var pixelBorderStyle = "0.5px solid black";
  var gridHeightPx = Math.round(grid.clientHeight);
  grid.style.height = `${gridHeightPx}px`;
  grid.style.width = `${gridHeightPx}px`;
  var pixelSidePx = gridHeightPx / gridSidePixelCount;
  function getPixelForPosition(down, across) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.style.width = `${pixelSidePx}px`;
    pixel.style.height = `${pixelSidePx}px`;
    pixel.style.borderTop = pixelBorderStyle;
    pixel.style.borderLeft = pixelBorderStyle;
    if (across == gridSidePixelCount - 1) {
      pixel.style.borderRight = pixelBorderStyle;
    }
    if (down == gridSidePixelCount - 1) {
      pixel.style.borderBottom = pixelBorderStyle;
    }
    return pixel;
  }
  var row = [];
  var pixels = [];
  for (let down = 0; down < gridSidePixelCount; down++) {
    row = [];
    for (let across = 0; across < gridSidePixelCount; across++) {
      const pixel = getPixelForPosition(down, across);
      row.push(pixel);
      grid.appendChild(pixel);
    }
    pixels.push(row);
  }
  grid.style.setProperty("--repeatNumber", `${gridSidePixelCount}`);
})();
