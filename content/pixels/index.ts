const stuff = document.getElementById("stuff");
const grid = document.getElementById("grid");

const gridSidePixelCount = 20;
const numPixels = gridSidePixelCount * gridSidePixelCount;
const pixels = [];
const pixelBorderStyle = "1px solid black";

// window.addEventListener("resize", () => {
//   grid.style.width = `${grid.client}px`;
//   pixelSidePx = gridHeightPx / gridSidePixelCount;
// });

const gridHeightPx = Math.round(grid.clientHeight);
grid.style.height = `${gridHeightPx}px`;
grid.style.width = `${gridHeightPx}px`;
const pixelSidePx = gridHeightPx / gridSidePixelCount;

for (let i = 0; i < numPixels; i++) {
  const pixel = document.createElement("div");
  pixel.classList.add("pixel");
  pixel.style.width = `${pixelSidePx}px`;
  pixel.style.height = `${pixelSidePx}px`;
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
grid.style.setProperty("--repeatNumber", `${gridSidePixelCount}`);
