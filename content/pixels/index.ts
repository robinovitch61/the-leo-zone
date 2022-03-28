const stuff = document.getElementById("stuff");
const board = document.getElementById("container");

const squareCountWidth = 20;
const squareCountHeight = squareCountWidth;

let pageWidthPx = window.innerWidth;
let pageHeightPx = window.innerHeight;

window.addEventListener("resize", () => {
  pageWidthPx = window.innerWidth;
  pageHeightPx = window.innerHeight;
});
