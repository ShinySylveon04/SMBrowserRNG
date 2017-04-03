import TinyMT from "./TinyMT";
import SFMT from "./SFMT";
import { TinyMTParameter } from "./TinyMTParameter";
import { EggRNGSearch } from "./EggRNGSearch";

function greeter(person) {
    return "Placeholder code for " + person + " to get in sync!";
}

function getEggRNGSettings(): void {
    var pre_parent: number[] = [31, 31, 31, 31, 31, 31];
    var post_parent: number[] = [31, 31, 31, 31, 31, 31];
    var sex_threshold = 126;

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

var sfmt: SFMT = new SFMT(0x4D413562);


var user = "pokeCalcDevs";
var st: Array<number> = new Array(4);
st[3] = 0xF50D55B8;
st[2] = 0x09690FDA;
st[1] = 0x01B95825;
st[0] = 0x7A6CBDA0;

var status: Array<number> = [st[0], st[1], st[2], st[3]];
var tiny = new TinyMT(status, new TinyMTParameter(0x8f7011ee, 0xfc78ff1f, 0x3793fdff));

st = tiny.status.slice(0);
getEggRNGSettings();
var result: EggRNGSearch.EGGRNGResult = EggRNGSearch.Generate(st);
tiny.nextState();
st = tiny.status.slice(0);
var result2: EggRNGSearch.EGGRNGResult = EggRNGSearch.Generate(st);

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
    + sfmt.NextUInt64().toString(16);
