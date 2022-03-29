const stuff = document.getElementById("stuff");
const grid = document.getElementById("grid");

const pixelCountWidth = 20;
const pixelCountHeight = pixelCountWidth;

window.addEventListener("resize", () => {
  grid.style.width = `${grid.clientHeight}px`;
});

grid.style.width = `${grid.clientHeight}px`;
