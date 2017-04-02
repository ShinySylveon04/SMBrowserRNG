import TinyMT from "./TinyMT";
import { TinyMTParameter } from "./TinyMTParameter";


function greeter(person) {
    return "Placeholder code for " + person + " to get in sync!";
}

var user = "pokeCalcDevs";
var status: Array<number> = new Array(4);
status[3] = 0xBB416559;
status[2] = 0x697EDD9A;
status[1] = 0x79548181;
status[0] = 0xDB34CB83;
var tiny = new TinyMT(status, new TinyMTParameter(0x8f7011ee, 0xfc78ff1f, 0x3793fdff));
tiny.nextState();

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
document.body.innerHTML = "Info: "
      + tiny.status[3].toString(16) + " "
      + tiny.status[2].toString(16) + " "
      + tiny.status[1].toString(16) + " "
      + tiny.status[0].toString(16) + " "
      + tiny.temper().toString(16);
