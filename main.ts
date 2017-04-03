import TinyMT from "./TinyMT";
import SFMT from "./SFMT";
import { TinyMTParameter } from "./TinyMTParameter";
import { EggRNGSearch } from "./EggRNGSearch";

function greeter(person) {
    return "Placeholder code for " + person + " to get in sync!";
}



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
var eggForm = document.createElement("form");
var parentIVTable = document.createElement("table");
var tr_pre_parent = document.createElement("tr");
var tr_post_parent = document.createElement("tr");
var lbl_pre_parent1 = document.createElement("label");
lbl_pre_parent1.innerHTML = "IV1: ";

for (var i = 1; i < 7; i++) {
    var td1 = document.createElement("td");
    td1.innerHTML = "IV" + i + ": ";
    td1.setAttribute("id", "lbl_pre_parent" + i);
    tr_pre_parent.appendChild(td1);
    var td2 = document.createElement("td");
    var nud_pre_parent = document.createElement("input");
    nud_pre_parent.setAttribute("type", "number");
    nud_pre_parent.setAttribute("min", "0");
    nud_pre_parent.setAttribute("max", "31");
    nud_pre_parent.setAttribute("value", "31");
    nud_pre_parent.setAttribute("id", "nud_pre_parent" + i);
    nud_pre_parent.setAttribute("name", "nud_pre_parent" + i);
    nud_pre_parent.setAttribute("style", "width: 100%; text-align: right;");
    td2.appendChild(nud_pre_parent);
    tr_pre_parent.appendChild(td2);
}

for (var i = 1; i < 7; i++) {
    var td1 = document.createElement("td");
    td1.innerHTML = "IV" + i + ": ";
    td1.setAttribute("id", "lbl_post_parent" + i);
    tr_post_parent.appendChild(td1);
    var td2 = document.createElement("td");
    var nud_post_parent = document.createElement("input");
    nud_post_parent.setAttribute("type", "number");
    nud_post_parent.setAttribute("min", "0");
    nud_post_parent.setAttribute("max", "31");
    nud_post_parent.setAttribute("value", "31");
    nud_post_parent.setAttribute("id", "nud_post_parent" + i);
    nud_post_parent.setAttribute("name", "nud_post_parent" + i);
    nud_post_parent.setAttribute("style", "width: 100%; text-align: right;");
    td2.appendChild(nud_post_parent);
    tr_post_parent.appendChild(td2);
}

var tr_button = document.createElement("tr");
var td_bt = document.createElement("td");
var bt_generate = document.createElement("button");
bt_generate.addEventListener("click", () => generate());
bt_generate.innerHTML = "Generate";
bt_generate.setAttribute("style", "width: 100%; height: 50px;");
bt_generate.setAttribute("colspan", "12");
td_bt.setAttribute("colspan", "12");

td_bt.appendChild(bt_generate);
tr_button.appendChild(td_bt);


parentIVTable.appendChild(tr_pre_parent);
parentIVTable.appendChild(tr_post_parent);
parentIVTable.appendChild(tr_button);
eggForm.appendChild(parentIVTable);
document.body.appendChild(eggForm);

function getEggRNGSettings(): void {
    var pre_parent: number[] = [Number((<HTMLInputElement>document.getElementById("nud_pre_parent1")).value), Number((<HTMLInputElement>document.getElementById("nud_pre_parent2")).value), Number((<HTMLInputElement>document.getElementById("nud_pre_parent3")).value), Number((<HTMLInputElement>document.getElementById("nud_pre_parent4")).value), Number((<HTMLInputElement>document.getElementById("nud_pre_parent5")).value), Number((<HTMLInputElement>document.getElementById("nud_pre_parent6")).value)];
    var post_parent: number[] = [Number((<HTMLInputElement>document.getElementById("nud_post_parent1")).value), Number((<HTMLInputElement>document.getElementById("nud_post_parent2")).value), Number((<HTMLInputElement>document.getElementById("nud_post_parent3")).value), Number((<HTMLInputElement>document.getElementById("nud_post_parent4")).value), Number((<HTMLInputElement>document.getElementById("nud_post_parent5")).value), Number((<HTMLInputElement>document.getElementById("nud_post_parent6")).value)];
    var sex_threshold = 126;
    console.log(pre_parent);
    console.log(post_parent);
    EggRNGSearch.GenderRatio = sex_threshold;
    EggRNGSearch.GenderRandom = true;
    EggRNGSearch.GenderMale = false;
    EggRNGSearch.GenderFemale = false;
    EggRNGSearch.International = true;
    EggRNGSearch.ShinyCharm = true;
    EggRNGSearch.Heterogeneous = true;
    EggRNGSearch.Both_Everstone = false;
    EggRNGSearch.Everstone = true;
    EggRNGSearch.DestinyKnot = true;
    EggRNGSearch.Both_PowerItems = false;
    EggRNGSearch.PowerItems = false;
    EggRNGSearch.MalePowerStat = -2;
    EggRNGSearch.FemalePowerStat = -1;
    EggRNGSearch.ParentAbility = 1;
    EggRNGSearch.ConciderTSV = true;
    EggRNGSearch.SearchOtherTSV = false;

    EggRNGSearch.TSV = 2686;
    EggRNGSearch.pre_parent = pre_parent;
    EggRNGSearch.post_parent = post_parent;

    EggRNGSearch.Initialize();
}

function generate(): void {
    getEggRNGSettings();

    var st: Array<number> = new Array(4);
    st[3] = 0xF50D55B8;
    st[2] = 0x09690FDA;
    st[1] = 0x01B95825;
    st[0] = 0x7A6CBDA0;

    var status: Array<number> = [st[0], st[1], st[2], st[3]];
    var tiny = new TinyMT(status, new TinyMTParameter(0x8f7011ee, 0xfc78ff1f, 0x3793fdff));

    st = tiny.status.slice(0);
    var result: EggRNGSearch.EGGRNGResult = EggRNGSearch.Generate(st);
    tiny.nextState();
    st = tiny.status.slice(0);
    var result2: EggRNGSearch.EGGRNGResult = EggRNGSearch.Generate(st);

    document.body.innerHTML += JSON.stringify(result) + "<br /><br />" + JSON.stringify(result2);
}

var user = "pokeCalcDevs";





