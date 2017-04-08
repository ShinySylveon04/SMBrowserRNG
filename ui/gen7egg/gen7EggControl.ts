import { IVs, generateButton, rngOutput } from "../utils/genericUI";
import { eggRNGView } from "./gen7EggView";

export class gen7EggUi {

    constructor(document: any, container: any){
        //Attach document to document
        let settingsContainer = container;

        //Create Lists
        let listList = [
            ["None", "Destiny Knot", "Everstone"],
            ["1", "2", "H"],
            ["Male", "Female", "Genderless"]
        ];
        let listNames = ["Item", "Ability", "Gender"];
        let generalList = [
            ["difSpec", "mmCheck", "scCheck"],
            ["Different Species", "Masuda Method", "Shiny Charm"]
        ];
        let genderList = [
            ["50", "875", "75", "25", "100", "0", "genderless"],
            ["♂1:♀1", "♂7:♀1", "♂3:♀1", "♂1:♀3", "♂ Only", "♀ Only", "Genderless"]
        ];
        var rngSettingObjects = [];
        var rngSettingFilters = [];

        //Parents
        for (let z = 1; z<=2; z++){
            let parentContainer = document.createElement("div");
            parentContainer.setAttribute("class", "parentIvs");
            settingsContainer.appendChild(parentContainer);

            let parentLabel = document.createElement("h2");
            parentLabel.innerHTML = "Parent "+z;
            parentContainer.appendChild(parentLabel);

            //IVs
            var ParentIVs = new IVs(document, parentContainer, z.toString(10));
            //Add to settings List
            rngSettingObjects.push(ParentIVs);

            //Item, Ability, isDitto, and Gender Settings
            for(let i = 0; i<3; i++){
                let subContainer = document.createElement("div");
                subContainer.setAttribute("class", "subContainer");
                parentContainer.appendChild(subContainer);

                let breedingItemLabel = document.createElement("label");
                breedingItemLabel.setAttribute("for", "breeding"+listNames[i]+z);
                breedingItemLabel.setAttribute("class", "settingsLabel");
                breedingItemLabel.innerHTML = listNames[i];
                subContainer.appendChild(breedingItemLabel);

                let breedingItemSelect = document.createElement("select");
                breedingItemSelect.setAttribute("name", "breeding"+listNames[i]+z);
                breedingItemSelect.setAttribute("id", "breeding"+listNames[i]+z);
                breedingItemSelect.setAttribute("class", "settingsSelect");
                subContainer.appendChild(breedingItemSelect);

                //Add to settings List
                rngSettingObjects.push(breedingItemSelect);

                for(let j = 0; j<3; j++){
                    let option = document.createElement("option");
                    option.setAttribute("value", listList[i][j]);
                    option.innerHTML = listList[i][j];
                    breedingItemSelect.appendChild(option);
                }
            }

            //Is Ditto?
            let dittoContainer = document.createElement("div");
            dittoContainer.setAttribute("class", "subContainer");
            parentContainer.appendChild(dittoContainer);

            let isDittoLabel = document.createElement("label");
            isDittoLabel.setAttribute("for", "isDitto"+z);
            isDittoLabel.setAttribute("class", "settingsLabel");
            isDittoLabel.innerHTML = "Ditto?";
            dittoContainer.appendChild(isDittoLabel);

            let isDittoInput = document.createElement("input");
            isDittoInput.setAttribute("name", "isDitto"+z);
            isDittoInput.setAttribute("id", "isDitto"+z);
            isDittoInput.setAttribute("type", "checkbox");
            isDittoInput.setAttribute("class", "settingsCheck");
            dittoContainer.appendChild(isDittoInput);

            //Add to settings List
            rngSettingObjects.push(isDittoInput);
        }

        //General Egg settings
        let generalEggSettingsContainer = document.createElement("div");
        generalEggSettingsContainer.setAttribute("class", "otherSettings");
        settingsContainer.appendChild(generalEggSettingsContainer);

        //General Label
        let generalLabel = document.createElement("h3");
        generalLabel.innerHTML = "General Settings:";
        generalEggSettingsContainer.appendChild(generalLabel);

        //Actual General Settings
        for(let i = 0; i<3; i++){
            let subContainer = document.createElement("div");
            subContainer.setAttribute("class", "subContainer");
            let subLabel = document.createElement("label");
            subLabel.setAttribute("class", "settingsLabel");
            subLabel.setAttribute("for", generalList[0][i]);
            subLabel.innerHTML = generalList[1][i];
            subContainer.appendChild(subLabel);

            let subInput = document.createElement("input");
            subInput.setAttribute("name", generalList[0][i]);
            subInput.setAttribute("id", generalList[0][i]);
            subInput.setAttribute("type", "checkbox");
            subInput.setAttribute("class", "settingsCheck");
            subContainer.appendChild(subInput);

            generalEggSettingsContainer.appendChild(subContainer);

            //Add to settings List
            rngSettingObjects.push(subInput);
        }

        //Gender Ratio for General Settings
        let genderContainer = document.createElement("div");
        genderContainer.setAttribute("class", "subContainer");
        generalEggSettingsContainer.appendChild(genderContainer);

        let genderLabel = document.createElement("label");
        genderLabel.setAttribute("for", "genderRatio");
        genderLabel.innerHTML = "Gender Ratio: ";
        genderContainer.appendChild(genderLabel);

        let genderSelect = document.createElement("select");
        genderSelect.setAttribute("name", "genderRatio");
        genderSelect.setAttribute("id", "genderRatio");
        genderSelect.setAttribute("class", "settingsSelect");
        genderContainer.appendChild(genderSelect);

        for(let i = 0; i<7; i++){
            let genderOption = document.createElement("option");
            genderOption.setAttribute("value", genderList[0][i]);
            genderOption.innerHTML = genderList[1][i];
            genderSelect.appendChild(genderOption);
        }

        //Add to settings List
        rngSettingObjects.push(genderSelect);

        let tsvBox = document.createElement("div");
        tsvBox.setAttribute("class", "seedBox");
        generalEggSettingsContainer.appendChild(tsvBox);

        let tsvLabel = document.createElement("h3");
        tsvLabel.innerHTML = "TSV:";
        tsvBox.appendChild(tsvLabel);

        let tsvInput = document.createElement("input");
        tsvInput.setAttribute("type", "text");
        tsvInput.setAttribute("id", "tsvInput");
        tsvBox.appendChild(tsvInput);

        //Add to settings List
        rngSettingObjects.push(tsvInput);

        //Egg Seeds
        let seedContainer = document.createElement("div");
        seedContainer.setAttribute("class", "seedContainer");
        settingsContainer.appendChild(seedContainer);

        let eggSeedLabel = document.createElement("h3");
        eggSeedLabel.innerHTML = "Egg Seeds:";
        seedContainer.appendChild(eggSeedLabel);

        for(let i = 0; i<4; i++){
            let seedBox = document.createElement("div");
            seedBox.setAttribute("class", "seedBox");
            seedContainer.appendChild(seedBox);

            let seedInput = document.createElement("input");
            seedInput.setAttribute("type", "text");
            seedInput.setAttribute("name", "eggSeed"+i);
            seedInput.setAttribute("placeholder", "Egg Seed "+i);
            seedBox.appendChild(seedInput);

            //Add to settings List
            rngSettingObjects.push(seedInput);
        }

        //Generate Button
        var searchButton = new generateButton(document, settingsContainer);

        //Output View
        let outputView = new rngOutput(document);

        searchButton.button.addEventListener("click", ()=>generateResults(rngSettingObjects, outputView.outBox, 100, document));

    }
}

function generateResults(parameters, resultBox, frameAmount, document){
    let eggRngFinished = new eggRNGView(parameters, frameAmount);
    let outHeaders = ["Frame", "Frame Adv", "Seed", "IVs", "Gender", "Ability",
        "Nature", "PID", "PSV", "EC"];

    //Create Output Table
    let outTable = document.createElement("table");
    outTable.setAttribute("class", "outputFormat");

    //Create Header Row
    let headTr = document.createElement("tr");
    outTable.appendChild(headTr);

    //Add headers
    for(let i = 0; i<outHeaders.length; i++){
        let headTd = document.createElement("td");
        headTd.innerHTML = outHeaders[i];
        headTr.appendChild(headTd);
    }

    //Create New rows and populate with results
    for(let i = 0; i<eggRngFinished.rngResult.length; i++){
        //Create Table Row and Cells
        let outRow = document.createElement("tr");
        let outFrame = document.createElement("td");
        let outFrameAdv = document.createElement("td");
        let outSeed = document.createElement("td");
        let outIVs = document.createElement("td");
        let outGender = document.createElement("td");
        let outAbility = document.createElement("td");
        let outNature = document.createElement("td");
        let outPID = document.createElement("td");
        let outPSV = document.createElement("td");
        let outEC = document.createElement("td");
        let dataOut = eggRngFinished.rngResult[i];
        let formattedIVs = "";

        //Format IVs
        for(let i = 0; i<6; i++){
            if(i!=0){
                formattedIVs+="/";
            }
            formattedIVs+=dataOut.IVs[i];
        }

        //Populate Cells with data
        outIVs.innerHTML = formattedIVs;
        outAbility.innerHTML = dataOut.Ability;
        outEC.innerHTML = dataOut.EC;
        outFrameAdv.innerHTML = dataOut.FramesUsed;
        outGender.innerHTML = dataOut.Gender;
        outNature.innerHTML = dataOut.Nature;
        outSeed.innerHTML = dataOut.Seed;
        outPID.innerHTML = dataOut.PID;
        outPSV.innerHTML = dataOut.PSV;
        outFrame.innerHTML = i;

        //Attach Cells to Row and Tow to Table
        outTable.appendChild(outRow);
        outRow.appendChild(outFrame);
        outRow.appendChild(outFrameAdv);
        outRow.appendChild(outSeed);
        outRow.appendChild(outIVs);
        outRow.appendChild(outGender);
        outRow.appendChild(outAbility);
        outRow.appendChild(outNature);
        outRow.appendChild(outPID);
        outRow.appendChild(outPSV);
        outRow.appendChild(outEC);
    }

    //Show Results
    resultBox.appendChild(outTable);
}
