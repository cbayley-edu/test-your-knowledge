// var themeSwitcher = document.querySelector("#theme-switcher");
// var container = document.querySelector(".container");
// var mode = "dark";

// themeSwitcher.addEventListener("click", function() {
//   if (mode === "dark") {
//     mode = "light";
//     container.setAttribute("class", "light");
//   }
//   else {
//     mode = "dark";
//     container.setAttribute("class", "dark");
//   }
// });

var cocktailsBtnEl = document.querySelector("#cocktailsBtn");
var audioMp3 = new Audio();

cocktailsBtnEl.addEventListener("click", function(){
    audioMp3 = new Audio("assets/cocktail-shaker.mp3").play();
});




