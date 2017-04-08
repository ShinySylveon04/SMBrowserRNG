
export class IVs {
    public ivObjects;

    constructor(document: any, container: any, identifier: string){
        this.ivObjects = [];

        let ivList = ["HP", "Atk", "Def", "SpA", "SpD", "Spe"];

        for (let j = 0; j<6; j++){
            let ivContainer = document.createElement("div");
            ivContainer.setAttribute("class", "text-input");
            let ivInput = document.createElement("input");
            ivInput.setAttribute("type", "number");
            ivInput.setAttribute("name", ivList[j]+identifier);
            ivInput.setAttribute("class", "ivInput");
            ivInput.setAttribute("min", "0");
            ivInput.setAttribute("max", "31");
            ivInput.setAttribute("value", "0");
            let ivLabel = document.createElement("label");
            ivLabel.setAttribute("for", ivList[j]+identifier);
            ivLabel.setAttribute("class", "ivLabel");
            ivLabel.innerHTML = ivList[j];
            ivContainer.appendChild(ivInput);
            ivContainer.appendChild(ivLabel);
            container.appendChild(ivContainer);

            //Add ivInput to ivObjects
            this.ivObjects.push(ivInput);
        }
    }
}

export class generateButton{
    public button;

    constructor(document: any, container: any){

        let buttonContainer = document.createElement("div");
        buttonContainer.setAttribute("class", "subContainer");
        container.appendChild(buttonContainer);

        var searchButton = document.createElement("a");
        searchButton.setAttribute("class", "searchBtn");
        searchButton.setAttribute("id", "searchBtn");
        searchButton.innerHTML = "Generate";
        buttonContainer.appendChild(searchButton);
        this.button = searchButton;
    }
}

export class rngOutput{
    public outBox;

    constructor(document: any){

        let newOuput = document.createElement("div");
        newOuput.setAttribute("class", "settingsContainer");
        document.body.appendChild(newOuput);

        let newOutview = document.createElement("div");
        newOutview.setAttribute("class", "outputView");
        newOutview.setAttribute("id", "rngOutput");
        newOuput.appendChild(newOutview);
        this.outBox = newOutview;
    }
}
