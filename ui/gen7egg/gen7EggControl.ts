import { IVs, generateButton, rngOutput, natureList, genderList } from "../utils/genericUI";
import { eggRNGView } from "./gen7EggView";

export class gen7EggUi {

    constructor(document: any, container: any, viewContainer: any){
        //Attach document to document
        let settingsContainer = container;

        //Create Lists
        let listValue = [
            ["None", "Destiny Knot", "Everstone"],
            ["0", "1", "2"]
        ];
        let listList = [
            ["None", "Destiny Knot", "Everstone"],
            ["1", "2", "H"]
        ];
        let listNames = ["Item", "Ability"];
        let generalList = [
            ["difSpec", "mmCheck", "scCheck", "shinyOnly"],
            ["Different Species", "Masuda Method", "Shiny Charm", "Shiny Only"]
        ];
        let genderList = [
            ["50", "875", "75", "25", "100", "0", "genderless"],
            ["♂1:♀1", "♂7:♀1", "♂3:♀1", "♂1:♀3", "♂ Only", "♀ Only", "Genderless"]
        ];
        let defaultSeeds = ["12345678", "DEADFACE", "DEADBEEF", "BEEFFACE"];
        var rngSettingObjects = {
            "parentIVs": [],
            "isDitto": [],
            "seeds": []
        };

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
            rngSettingObjects.parentIVs.push(ParentIVs);

            //Item, Ability, isDitto, and Gender Settings
            for(let i = 0; i<listNames.length; i++){
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
                rngSettingObjects[listNames[i]+z] = breedingItemSelect;

                for(let j = 0; j<listList[i].length; j++){
                    let option = document.createElement("option");
                    option.setAttribute("value", listValue[i][j]);
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
            rngSettingObjects.isDitto.push(isDittoInput);
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
        for(let i = 0; i<generalList[0].length; i++){
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
            rngSettingObjects[generalList[0][i]] = subInput;
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
        rngSettingObjects["genderRatio"] = genderSelect;

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
        rngSettingObjects["TSV"] = tsvInput;

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
            seedInput.setAttribute("value", defaultSeeds[i]);
            seedBox.appendChild(seedInput);

            //Add to settings List
            rngSettingObjects.seeds.push(seedInput);
        }

        //Generate Button
        var searchButton = new generateButton(document, settingsContainer);

        //Output View
        let outputView = new rngOutput(document, viewContainer);

        searchButton.button.addEventListener("click", ()=>generateResults(rngSettingObjects, outputView.outBox, 100, document));

    }
}

function generateResults(parameters, resultBox, frameAmount, document){
    let eggRngFinished = new eggRNGView(parameters, frameAmount);
    console.log(parameters);
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
        let dataOut = eggRngFinished.rngResult[i];
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
        let formattedIVs = "";
        let formattedSeeds = "";
        let everstoneBool = false;

        //Format IVs
        for(let i = 0; i<6; i++){
            if(i!=0){
                formattedIVs+="/";
            }
            formattedIVs+=dataOut.IVs[i];
        }

        //Format Seeds
        for(let i = 0; i<4; i++){
            if(i!=0){
                formattedSeeds+=", ";
            }
            formattedSeeds+=dataOut.Seed[(3-i)].toString(16).toUpperCase();
        }

        //Check if either parent has Everstone
        if(parameters.Item1.value=="Everstone"
            || parameters.Item2.value=="Everstone") {
            everstoneBool = true;
        }

        //Populate Cells with data
        outIVs.innerHTML = formattedIVs;
        outAbility.innerHTML = (dataOut.Ability==2) ? "H" : dataOut.Ability+1;
        outEC.innerHTML = dataOut.EC.toString(16).toUpperCase();
        outFrameAdv.innerHTML = dataOut.FramesUsed+1;
        outGender.innerHTML = genderList[0][dataOut.Gender];
        outNature.innerHTML = (everstoneBool) ? "Everstone" : natureList[dataOut.Nature];
        outSeed.innerHTML = formattedSeeds;
        outPID.innerHTML = isNaN(dataOut.PID) ? "-" : dataOut.PID.toString(16).toUpperCase();
        outPSV.innerHTML = isNaN(dataOut.PSV) ? "-" : dataOut.PSV;
        outFrame.innerHTML = i;

        //Attach Cells to Row and Tow to Table
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

        //Poor filter
        if(parameters.shinyOnly.checked==true){
            if(dataOut.PSV == parameters.TSV.value){
                outTable.appendChild(outRow);
            }
        } else {
            outTable.appendChild(outRow);
        }
    }

    //Remove Previous Resultswhile (myNode.firstChild) {
    while (resultBox.firstChild) {
        resultBox.removeChild(resultBox.firstChild);
    }

    //Show Results
    resultBox.appendChild(outTable);
}
