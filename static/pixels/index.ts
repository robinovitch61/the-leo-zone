const stuff = document.getElementById("stuff");
const grid = document.getElementById("grid");

const gridSidePixelCount = 20;
const pixelBorderStyle = "0.5px solid black";

const gridHeightPx = Math.round(grid.clientHeight);
grid.style.height = `${gridHeightPx}px`;
grid.style.width = `${gridHeightPx}px`;
const pixelSidePx = gridHeightPx / gridSidePixelCount;

function getPixelForPosition(down: number, across: number) {
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

type Pixel = HTMLDivElement;

let row: Pixel[] = [];
const pixels: Pixel[][] = [];
for (let down = 0; down < gridSidePixelCount; down++) {
  row = [];
  for (let across = 0; across < gridSidePixelCount; across++) {
    const pixel = getPixelForPosition(down, across);
    row.push(pixel);
    grid.appendChild(pixel);
  }
  pixels.push(row);
}

// pixels[0][5].style.backgroundColor = "red"

grid.style.setProperty("--repeatNumber", `${gridSidePixelCount}`);
