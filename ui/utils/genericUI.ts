export var natureList = [
    "Hardy", "Lonely", "Brave", "Adamant",
    "Naughty", "Bold", "Docile", "Relaxed",
    "Impish", "Lax", "Timid", "Hasty",
    "Serious", "Jolly", "Naive", "Modest",
    "Mild", "Quiet", "Bashful", "Rash",
    "Calm", "Gentle", "Sassy", "Careful", "Quirky"
];

export var genderList = [
    ["♂", "♀", "-"],
    ["Male", "Female", "Genderless"]
];

export class IVs {
    public ivObjects;
    public equalityFilters;

    constructor(document: any, container: any, identifier: string, addFilters: boolean = false){
        this.ivObjects = [];
        this.equalityFilters = [];

        let ivList = ["HP", "Atk", "Def", "SpA", "SpD", "Spe"];
        let equalitySigns = ["<=", "==", ">"];

        for (let j = 0; j<6; j++){
            let ivContainer = document.createElement("div");
            ivContainer.setAttribute("class", "text-input");
            let ivClass = (addFilters) ? "filterSelect" : "ivInput";
            let ivLabelClass = (addFilters) ? "" : "ivLabel";

            let filterSelect = document.createElement("select");

            if(addFilters){
                filterSelect.setAttribute("name", "ivFilter"+j);
                filterSelect.setAttribute("id", "ivFilter"+j);
                filterSelect.setAttribute("class", "filterSelect");

                for(let i = 0; i<equalitySigns.length; i++){
                    let filterOption = document.createElement("option");
                    filterOption.setAttribute("value", equalitySigns[i]);
                    filterOption.innerHTML = equalitySigns[i];
                    filterSelect.appendChild(filterOption);
                }
                this.equalityFilters.push(filterSelect);
            }

            let ivInput = document.createElement("input");
            ivInput.setAttribute("type", "number");
            ivInput.setAttribute("name", ivList[j]+identifier);
            ivInput.setAttribute("class", ivClass);
            ivInput.setAttribute("min", "0");
            ivInput.setAttribute("max", "31");
            ivInput.setAttribute("value", "31");
            let ivLabel = document.createElement("label");
            ivLabel.setAttribute("for", ivList[j]+identifier);
            ivLabel.setAttribute("class", ivLabelClass);
            if(addFilters){
                ivLabel.appendChild(filterSelect);
                ivContainer.appendChild(ivLabel);
                ivContainer.appendChild(ivInput);
            } else {
                ivLabel.innerHTML = ivList[j];
                ivContainer.appendChild(ivInput);
                ivContainer.appendChild(ivLabel);
            }
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
        buttonContainer.setAttribute("class", "searchContainer");
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

    constructor(document: any, container: any){

        let newOuput = document.createElement("div");
        newOuput.setAttribute("class", "outputView");
        container.appendChild(newOuput);

        let newOutview = document.createElement("div");
        newOutview.setAttribute("id", "rngOutput");
        newOuput.appendChild(newOutview);
        this.outBox = newOutview;
    }
}

export class rngFilters{

    public settings = {};

    constructor(document: any, container: any){
        let filterValue = [
                ["None", "Male", "Female"],
                ["None", "0", "1", "2"],
                ["None", "Hardy", "Lonely", "Brave", "Adamant",
                    "Naughty", "Bold", "Docile", "Relaxed",
                    "Impish", "Lax", "Timid", "Hasty",
                    "Serious", "Jolly", "Naive", "Modest",
                    "Mild", "Quiet", "Bashful", "Rash",
                    "Calm", "Gentle", "Sassy", "Careful", "Quirky"
                ]
            ];
            let filterList = [
                ["None", "Male", "Female"],
                ["None", "1", "2", "H"],
                ["None", "Hardy", "Lonely", "Brave", "Adamant",
                    "Naughty", "Bold", "Docile", "Relaxed",
                    "Impish", "Lax", "Timid", "Hasty",
                    "Serious", "Jolly", "Naive", "Modest",
                    "Mild", "Quiet", "Bashful", "Rash",
                    "Calm", "Gentle", "Sassy", "Careful", "Quirky"
                ]
            ];
            let filterName = ["Gender", "Ability", "Nature"];
        //Filters

        let filterLabel = document.createElement("h3");
        filterLabel.innerHTML = "Filters:";
        container.appendChild(filterLabel);

        //IV filter
        var ivFilter = new IVs(document, container, "Filter", true);
        //Add to settings List
        this.settings["ivFilter"] = ivFilter;

        //Shiny Filter
        let shinyFilterContainer = document.createElement("div");
        shinyFilterContainer.setAttribute("class", "subContainer");
        let shinyFilterLabel = document.createElement("label");
        shinyFilterLabel.setAttribute("class", "settingsLabel");
        shinyFilterLabel.setAttribute("for", "shinyOnly");
        shinyFilterLabel.innerHTML = "Shiny Only ";
        shinyFilterContainer.appendChild(shinyFilterLabel);

        let shinyFilterInput = document.createElement("input");
        shinyFilterInput.setAttribute("name", "shinyOnly");
        shinyFilterInput.setAttribute("id", "shinyOnly");
        shinyFilterInput.setAttribute("type", "checkbox");
        shinyFilterInput.setAttribute("class", "settingsCheck");
        shinyFilterContainer.appendChild(shinyFilterInput);

        container.appendChild(shinyFilterContainer);

        //Add to settings List
        this.settings["shinyOnly"] = shinyFilterInput;

        //Select Filters
        for(let j = 0; j<filterName.length; j++){
            let subFilterContainer = document.createElement("div");
            subFilterContainer.setAttribute("class", "subContainer");
            container.appendChild(subFilterContainer);

            let filterLabel = document.createElement("label");
            filterLabel.setAttribute("class", "settingsLabel");
            filterLabel.setAttribute("for", filterName[j]);
            filterLabel.innerHTML = filterName[j];
            subFilterContainer.appendChild(filterLabel);

            let filterSelect = document.createElement("select");
            filterSelect.setAttribute("name", filterName[j]);
            filterSelect.setAttribute("id", filterName[j]);
            filterSelect.setAttribute("class", "settingsSelect");
            subFilterContainer.appendChild(filterSelect);

            for(let i = 0; i<filterList[j].length; i++){
                let filterOption = document.createElement("option");
                filterOption.setAttribute("value", filterValue[j][i]);
                filterOption.innerHTML = filterList[j][i];
                filterSelect.appendChild(filterOption);
            }
            //Add to settings List
            this.settings[filterName[j]+"Filter"] = filterSelect;
        }

        //Frames to search
        let frameFilterContainer = document.createElement("div");
        frameFilterContainer.setAttribute("class", "subContainer");
        container.appendChild(frameFilterContainer);

        let frameFilterLabel = document.createElement("label");
        frameFilterLabel.setAttribute("for", "frameFilter");
        frameFilterLabel.setAttribute("class", "settingsLabel");
        frameFilterLabel.innerHTML = "Frame: ";
        frameFilterContainer.appendChild(frameFilterLabel);

        let frameFilter = document.createElement("input");
        frameFilter.setAttribute("type", "number");
        frameFilter.setAttribute("min", "1");
        frameFilter.setAttribute("value", "100");
        frameFilter.setAttribute("name", "frameFilter");
        frameFilter.setAttribute("id", "frameFilter");
        frameFilter.setAttribute("class", "settingsSelect");
        frameFilterContainer.appendChild(frameFilter);

        //Add to settings list
        this.settings["frameFilter"] = frameFilter;
    }
}
