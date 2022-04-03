var stuff = document.getElementById("stuff");
var grid = document.getElementById("grid");
var gridSidePixelCount = 20;
var pixelBorderStyle = "0.5px solid black";
var gridHeightPx = Math.round(grid.clientHeight);
grid.style.height = "".concat(gridHeightPx, "px");
grid.style.width = "".concat(gridHeightPx, "px");
var pixelSidePx = gridHeightPx / gridSidePixelCount;
function getPixelForPosition(down, across) {
    var pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.style.width = "".concat(pixelSidePx, "px");
    pixel.style.height = "".concat(pixelSidePx, "px");
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
for (var down = 0; down < gridSidePixelCount; down++) {
    row = [];
    for (var across = 0; across < gridSidePixelCount; across++) {
        var pixel = getPixelForPosition(down, across);
        row.push(pixel);
        grid.appendChild(pixel);
    }
    pixels.push(row);
}
grid.style.setProperty("--repeatNumber", "".concat(gridSidePixelCount));
