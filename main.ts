import masterUi from "./ui/newUi";
var styleLink = document.createElement("link");
styleLink.setAttribute("rel", "stylesheet");
styleLink.setAttribute("href", "style.css");
document.head.appendChild(styleLink);

var currentUi = new masterUi(document);
