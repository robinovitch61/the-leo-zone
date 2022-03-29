var stuff = document.getElementById("stuff");
var grid = document.getElementById("grid");
var pixelCountWidth = 20;
var pixelCountHeight = pixelCountWidth;
window.addEventListener("resize", function () {
    grid.style.width = "".concat(grid.clientHeight, "px");
});
grid.style.width = "".concat(grid.clientHeight, "px");
