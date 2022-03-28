var stuff = document.getElementById("stuff");
var board = document.getElementById("container");
var squareCountWidth = 20;
var squareCountHeight = squareCountWidth;
var pageWidthPx = window.innerWidth;
var pageHeightPx = window.innerHeight;
window.addEventListener("resize", function () {
    pageWidthPx = window.innerWidth;
    pageHeightPx = window.innerHeight;
});
