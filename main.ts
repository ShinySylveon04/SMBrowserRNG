import TinyMT from "./TinyMT";
import SFMT from "./SFMT";
import { TinyMTParameter } from "./TinyMTParameter";
import * as EggRNGSearch from "./EggRNGSearch";
import { RNGSearch } from "./RNGSearch";
import { ModelStatus } from "./ModelStatus";
import bigInt = require("big-integer");
import deepcopy = require("deepcopy");

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
bt_generate.addEventListener("click", () => generateStationary());
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

var ModelNumber: number = 1;

function getEggRNGSettings(): EggRNGSearch.EggRNGSearch {
    var pre_parent: number[] = [Number((<HTMLInputElement>document.getElementById("nud_pre_parent1")).value), Number((<HTMLInputElement>document.getElementById("nud_pre_parent2")).value), Number((<HTMLInputElement>document.getElementById("nud_pre_parent3")).value), Number((<HTMLInputElement>document.getElementById("nud_pre_parent4")).value), Number((<HTMLInputElement>document.getElementById("nud_pre_parent5")).value), Number((<HTMLInputElement>document.getElementById("nud_pre_parent6")).value)];
    var post_parent: number[] = [Number((<HTMLInputElement>document.getElementById("nud_post_parent1")).value), Number((<HTMLInputElement>document.getElementById("nud_post_parent2")).value), Number((<HTMLInputElement>document.getElementById("nud_post_parent3")).value), Number((<HTMLInputElement>document.getElementById("nud_post_parent4")).value), Number((<HTMLInputElement>document.getElementById("nud_post_parent5")).value), Number((<HTMLInputElement>document.getElementById("nud_post_parent6")).value)];
    var sex_threshold = 126;

    var rng: EggRNGSearch.EggRNGSearch = new EggRNGSearch.EggRNGSearch();

    rng.GenderRatio = sex_threshold;
    rng.GenderRandom = true;
    rng.GenderMale = false;
    rng.GenderFemale = false;
    rng.International = true;
    rng.ShinyCharm = true;
    rng.Heterogeneous = true;
    rng.Both_Everstone = false;
    rng.Everstone = true;
    rng.DestinyKnot = true;
    rng.Both_PowerItems = false;
    rng.PowerItems = false;
    rng.MalePowerStat = -2;
    rng.FemalePowerStat = -1;
    rng.ParentAbility = 1;
    rng.ConciderTSV = true;
    rng.SearchOtherTSV = false;

    rng.TSV = 2686;
    rng.pre_parent = pre_parent;
    rng.post_parent = post_parent;

    rng.Initialize();

    return rng;
}

function getRNGSettings(): RNGSearch.RNGSearch {
    var gender_threshold: number = 0;

    RNGSearch.Considerhistory = false;
    RNGSearch.Considerdelay = true;
    RNGSearch.PreDelayCorrection = 0;
    RNGSearch.delaytime = 0;
    RNGSearch.ConsiderBlink = true;
    RNGSearch.modelnumber = 1;
    RNGSearch.IsSolgaleo = false;
    RNGSearch.IsLunala = false;

    var rng: RNGSearch.RNGSearch = new RNGSearch.RNGSearch();

    rng.Synchro_Stat = bigInt(-1).and(0xFF);
    rng.TSV = 2686;
    rng.AlwaysSynchro = false;
    rng.Honey = false;
    rng.UB = false;
    rng.ShinyCharm = true;
    rng.Wild = false;
    rng.Fix3v = true;
    rng.gender_ratio = gender_threshold;
    rng.nogender = true;
    rng.PokeLv = 60;
    rng.Lv_min = 60;
    rng.Lv_max = 60;
    rng.UB_th = 0;
    rng.Encounter_th = 100;
    rng.ShinyLocked = true;
    rng.Fishing = false;
    rng.SOS = false;
    rng.ChainLength = 0;

    return rng;

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

    var rng = getEggRNGSettings();

    st = tiny.status.slice(0);
    var result: EggRNGSearch.EGGRNGResult = rng.Generate(st);
    tiny.nextState();
    st = tiny.status.slice(0);
    var result2: EggRNGSearch.EGGRNGResult = rng.Generate(st);

    document.body.innerHTML += JSON.stringify(result) + "<br /><br />" + JSON.stringify(result2);
}

function Checkafter(Randlist: number[]): number {
    for (var i = 0; i < Randlist.length - 1; i++)
        if (bigInt(Randlist[i]).and(0x7F) == 0) return 1;
    if (Randlist[Randlist.length - 1] - 3 * Math.floor(Randlist[Randlist.length - 1] / 3) == 0) return 1;
    return 1;
}

function getblinkflaglist(min: number, max: number, seed: number): number[] {
    var blinkflaglist: number[] = new Array();
    for (var i = 0; i < max - min + 2; i++)
        blinkflaglist.push(0);

    var Model_n: number = 1;
    var st: SFMT = new SFMT(seed);
    var blink_flag: number = 0;

    if (Model_n == 1) {
        var rand: number;
        for (var i = 0; i < min - 2; i++)
            st.NextUInt64();
        if (bigInt(st.NextUInt64()).and(0x7F).and(0xFFFFFFFF) == 0) {
            blinkflaglist[0] = bigInt(st.NextUInt64).mod(3).and(0xFFFFFFFF) == 0 ? 36 : 30;
        } else if (bigInt(st.NextUInt64()).and(0x7F).and(0xFFFFFFFF) == 0) {
            blink_flag = 1;
        }

        console.log(blink_flag);

        for (var i = min; i <= max; i++) {
            rand = st.NextUInt64();
            if (blink_flag == 1) {
                blinkflaglist[i - min] = 5;
                blinkflaglist[++i - min] = bigInt(rand).mod(3).and(0xFFFFFFFF) == 0 ? 36 : 30;
                blink_flag = 0; rand = st.NextUInt64();
            }
            if (bigInt(rand).and(0x7F).and(0xFFFFFFFF) == 0) {
                blink_flag = 1;
                blinkflaglist[i - min] = 1;
            }
        }
    } else {
        var Unsaferange: number[] = [35 * (Model_n - 1), 41 * (Model_n - 1)];
        var Randlist: number[];
        var Min = Math.max(min - Unsaferange[1], 418);
        for (var i = 0; i < Min; i++)
            st.NextUInt64();
        for (var i = 0; i <= (1 - 1) * 5 + 1; i++)
            Randlist.push(st.NextUInt64());
        for (var i = Min; i <= max; i++ , Randlist.splice(0, 1), Randlist.push(st.NextUInt64())) {
            if (bigInt(Randlist[0]).and(0x7F) == 0) {
                if (blink_flag == 0) {
                    blink_flag = Unsaferange[Checkafter(Randlist)];
                    if (i >= min) blinkflaglist[i - min] = 1;
                } else {
                    blink_flag = Unsaferange[1];
                    if (i >= min) blinkflaglist[i - min] = 3;
                }
            } else if (blink_flag > 0) {
                blink_flag--;
                if (i >= min) blinkflaglist[i - min] = 2;
            }
        }
    }

    return blinkflaglist;

}

function generateStationary(): void {
    var sfmt: SFMT = new SFMT(0xF734CF2F);

    var rng = getRNGSettings();

    var Blinkflaglist: number[] = getblinkflaglist(418, 5000, 0xF734CF2F);

    for (var i = 0; i < 419; i++)
        sfmt.NextUInt64();

    RNGSearch.CreateBuffer(sfmt, true);

    var result1: RNGSearch.RNGResult = rng.Generate();
    result1.Blink = Blinkflaglist[419 - 419]; RNGSearch.Rand.splice(0, 1); RNGSearch.Rand.push(sfmt.NextUInt64());
    var result2: RNGSearch.RNGResult = rng.Generate();
    result2.Blink = Blinkflaglist[420 - 419];

    document.body.innerHTML += JSON.stringify(result1) + "<br /><br />" + JSON.stringify(result2);

}

function CreateNPCStatus(seed: number): ModelStatus.ModelStatus {
    ModelStatus.Modelnumber = 1;
    ModelStatus.sfmt = new SFMT(seed);
    return new ModelStatus.ModelStatus();
}

function createtimeline(): void {
    var sfmt: SFMT = new SFMT(0xF734CF2F);

    var start_frame: number = 418;
    var start_flag: number = getblinkflaglist(start_frame, start_frame, 0xF734CF2F)[0];

    for (var i = 0; i < start_frame; i++)
        sfmt.NextUInt64();

    var st = CreateNPCStatus(0xF734CF2F);
    var rng: RNGSearch.RNGSearch = getRNGSettings();
    RNGSearch.ResetModelStatus();
    RNGSearch.CreateBuffer(sfmt, true);

    var totaltime: number = 10 * 30;
    var frame: number = 418;
    var frameadvance: number;
    var CurrentFrame: number;

    var tempList: RNGSearch.RNGResult[] = new Array();

    for (var i = 0; i <= totaltime; i++) {
        CurrentFrame = frame;
        RNGSearch.remain_frame = st.remain_frame.slice(0);
        RNGSearch.blink_flag = st.blink_flag.slice(0);

        var result: RNGSearch.RNGResult = rng.Generate();

        if (i == 0) result.Blink = start_flag;
        if ((RNGSearch.IsSolgaleo || RNGSearch.IsLunala) && ModelNumber == 7) RNGSearch.modelnumber = 7;

        result.realtime = i;
        frameadvance = st.NextState();
        console.log(frameadvance);
        frame += frameadvance;

        for (var j = 0; j < frameadvance; j++) {
            RNGSearch.Rand.splice(0, 1);
            RNGSearch.Rand.push(sfmt.NextUInt64());
        }

        tempList.push(result);

    }

    document.body.innerHTML += JSON.stringify(tempList[0]) + "<br /><br />" + JSON.stringify(tempList[1]);

}

createtimeline();

var user = "pokeCalcDevs";
