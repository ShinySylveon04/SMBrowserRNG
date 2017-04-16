import { gen7EggUi } from "./gen7egg/gen7EggControl"
import * as Konami from "konami-js";

export default class masterUi {

        constructor(document: any){

            //Create Lists
            let tabOjects = {};
            let listList = [
                ["RNG Tools", "Guides", "Help", "About"],
                ["Eggs", "Wild", "Wonder Card", "UB"],
                ["Gen 7", "Gen 6", "Gen 5", "Gen 4", "Gen 3"]
            ];
            let idList = [
                "top-tabs",
                "sidebar",
                "bottom-tabs"
            ];
            let classList = [
                "top",
                "side",
                "bottom"
            ];

            //SuMo Header
            let sumoHeaderDiv = document.createElement("div");
            let sumoHeader = document.createElement("h1");
            sumoHeaderDiv.setAttribute("class", "header");
            sumoHeader.innerHTML = "Sun & Moon Browser RNG";
            sumoHeaderDiv.appendChild(sumoHeader);

            //Donate button
            let donateUl = document.createElement("ul");
            let donateLi = document.createElement("li");
            let donateButton = document.createElement("a");
            donateUl.setAttribute("id", "footer");
            donateButton.setAttribute("class", "footer");
            donateButton.innerHTML = "Donate";
            donateLi.appendChild(donateButton);
            donateUl.appendChild(donateLi);

            //Create Top Tabs
            for(let j = 0; j<idList.length; j++){
                let topTabs = document.createElement("ul");
                topTabs.setAttribute("id", idList[j]);
                for(let i = 0; i<listList[j].length; i++){
                    let listItem = document.createElement("li");
                    let linkItem = document.createElement("a");
                    linkItem.setAttribute("class", classList[j]);
                    linkItem.setAttribute("id", listList[j][i].replace(/\s/g,'').toLowerCase());
                    linkItem.innerHTML = listList[j][i];
                    listItem.appendChild(linkItem);
                    linkItem.addEventListener("click", ()=>createComingSoon(document, settingsContainer, viewContainer));
                    topTabs.appendChild(listItem);
                    tabOjects[listList[j][i].replace(/\s/g,'').toLowerCase()] = linkItem;
                }
                document.body.appendChild(topTabs);
                if(j==0){
                    document.body.appendChild(sumoHeaderDiv);
                }
            }

            tabOjects["eggs"].addEventListener("click", ()=>
                createGen7EggUi(document, settingsContainer, viewContainer)
            );
            tabOjects["gen7"].addEventListener("click", ()=>
                createGen7EggUi(document, settingsContainer, viewContainer)
            );

            //Settings container
            let settingsContainer = document.createElement("div");
            settingsContainer.setAttribute("class", "settingsContainer");
            document.body.appendChild(settingsContainer);

            //View Container
            let viewContainer = document.createElement("div");
            viewContainer.setAttribute("class", "settingsContainer");
            document.body.appendChild(viewContainer);

            //Call the Gen 7 Egg UI by default
            let newUi = new gen7EggUi(document, settingsContainer, viewContainer);

            //Add Donate Button Last
            document.body.appendChild(donateUl);
            
            //Nothing
            let egg = new Konami(function(){
                easter(document, settingsContainer);
            });
        }
}

function createComingSoon(document, settingsContainer, viewContainer){
    //Remove Previous Containers
    while (settingsContainer.firstChild) {
        settingsContainer.removeChild(settingsContainer.firstChild);
    }
    while (viewContainer.firstChild) {
        viewContainer.removeChild(viewContainer.firstChild);
    }

    var soon = document.createElement("h2");
    soon.innerHTML = "This will be added soon :D";

    settingsContainer.appendChild(soon);
}

function createGen7EggUi(document, settingsContainer, viewContainer){
    //Remove Previous Containers
    while (settingsContainer.firstChild) {
        settingsContainer.removeChild(settingsContainer.firstChild);
    }
    while (viewContainer.firstChild) {
        viewContainer.removeChild(viewContainer.firstChild);
    }
    new gen7EggUi(document, settingsContainer, viewContainer);
}

function easter(document, container){
    console.log("Konami");
    //Add Stylesheet
    let styleLink = document.createElement("link");
    styleLink.setAttribute("rel", "stylesheet");
    styleLink.setAttribute("href", "bubbles.css");
    document.head.appendChild(styleLink);

    for(let i = 1; i<=3; i++){
        let star = document.createElement("div");
        star.setAttribute("id", "stars"+i);
        document.body.appendChild(star);
    }

}
