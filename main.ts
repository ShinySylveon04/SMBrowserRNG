import masterUi from "./ui/newUi";

//Add Stylesheet
var styleLink = document.createElement("link");
styleLink.setAttribute("rel", "stylesheet");
styleLink.setAttribute("href", "style.css");
document.head.appendChild(styleLink);

//Disable Mobile Zooming
var zoomMeta = document.createElement("meta");
zoomMeta.setAttribute("name", "viewport");
zoomMeta.setAttribute("content", "initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
document.head.appendChild(zoomMeta);

var currentUi = new masterUi(document);
