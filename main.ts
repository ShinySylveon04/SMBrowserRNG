function greeter(person) {
    return "Placeholder code for " + person + " to get in sync!";
}

var user = "pokeCalcDevs";

//Link CSS to the web doc
var css = document.createElement("link");
css.rel = "stylesheet";
css.href = "style.css";
document.head.appendChild(css);

//Add a title to the web doc
var title = document.createElement("title");
title.innerHTML = "SMBrowserRNG";
document.head.appendChild(title);

//Populate the web doc with information
document.body.innerHTML = greeter(user);
