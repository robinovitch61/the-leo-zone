var stuff = document.getElementById("stuff");
var grid = document.getElementById("grid");
var gridSidePixelCount = 20;
var numPixels = gridSidePixelCount * gridSidePixelCount;
var pixels = [];
var pixelBorderStyle = "1px solid black";
// window.addEventListener("resize", () => {
//   grid.style.width = `${grid.client}px`;
//   pixelSidePx = gridHeightPx / gridSidePixelCount;
// });
var gridHeightPx = Math.round(grid.clientHeight);
grid.style.height = "".concat(gridHeightPx, "px");
grid.style.width = "".concat(gridHeightPx, "px");
var pixelSidePx = gridHeightPx / gridSidePixelCount;
for (var i = 0; i < numPixels; i++) {
    var pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.style.width = "".concat(pixelSidePx, "px");
    pixel.style.height = "".concat(pixelSidePx, "px");
    pixel.style.borderTop = pixelBorderStyle;
    pixel.style.borderLeft = pixelBorderStyle;
    if ((i + 1) % gridSidePixelCount === 0) {
        pixel.style.borderRight = pixelBorderStyle;
    }
    if (Math.floor(i / gridSidePixelCount + 1) === gridSidePixelCount) {
        pixel.style.borderBottom = pixelBorderStyle;
    }
    pixels.push(pixel);
    grid.appendChild(pixel);
}
grid.style.setProperty("--repeatNumber", "".concat(gridSidePixelCount));
