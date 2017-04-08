import TinyMT from "../../TinyMT";
import SFMT from "../../SFMT";
import { TinyMTParameter } from "../../TinyMTParameter";
import * as EggRNGSearch from "../../EggRNGSearch";

export class eggRNGView {
    public rngResult;

    constructor(rngObjects: any, frames: number){
        this.rngResult = [];
        var st: Array<number> = new Array(4);

        st[3] = parseInt(rngObjects[15].value, 16);
        st[2] = parseInt(rngObjects[16].value, 16);
        st[1] = parseInt(rngObjects[17].value, 16);
        st[0] = parseInt(rngObjects[18].value, 16);

        var status: Array<number> = [st[0], st[1], st[2], st[3]];
        var tiny = new TinyMT(status, new TinyMTParameter(0x8f7011ee, 0xfc78ff1f, 0x3793fdff));

        var rng = getEggRNGSettings(rngObjects);

        for(let i = 0; i<frames; i++){
            st = tiny.status.slice(0);
            var result: EggRNGSearch.EGGRNGResult = rng.Generate(st);
            this.rngResult.push(result);
            tiny.nextState();
        }
    }
}


export function getEggRNGSettings(rngObjects){
    let bothEverstone = false;
    let DestinyKnot = false;
    let Everstone = false;
    let pre_parent_ivs = rngObjects[0].ivObjects;
    let post_parent_ivs = rngObjects[5].ivObjects;
    var rng: EggRNGSearch.EggRNGSearch = new EggRNGSearch.EggRNGSearch();

    if(rngObjects[1].value=="Everstone"
     && rngObjects[6].value=="Everstone") {
         bothEverstone = true;
     }

    if(rngObjects[1].value=="Everstone"
        || rngObjects[6].value=="Everstone") {
        Everstone = true;
    }

    if(rngObjects[1].value=="Destiny Knot"
        || rngObjects[6].value=="Destiny Knot") {
        DestinyKnot = true;
    }

    var pre_parent: number[] = [
        pre_parent_ivs[0].value,
        pre_parent_ivs[1].value,
        pre_parent_ivs[2].value,
        pre_parent_ivs[3].value,
        pre_parent_ivs[4].value,
        pre_parent_ivs[5].value
    ];
    var post_parent: number[] = [
        post_parent_ivs[0].value,
        post_parent_ivs[1].value,
        post_parent_ivs[2].value,
        post_parent_ivs[3].value,
        post_parent_ivs[4].value,
        post_parent_ivs[5].value
    ];

    rng.GenderRatio = rngObjects[13].value;
    rng.GenderRandom = true;
    rng.GenderMale = false;
    rng.GenderFemale = false;
    rng.International = rngObjects[11].checked;
    rng.ShinyCharm = rngObjects[12].checked;
    rng.Heterogeneous = true;
    rng.Both_Everstone = bothEverstone;
    rng.Everstone = Everstone;
    rng.DestinyKnot = DestinyKnot;
    rng.Both_PowerItems = false;
    rng.PowerItems = false;
    rng.MalePowerStat = -2;
    rng.FemalePowerStat = -1;
    rng.ParentAbility = 1;
    rng.ConciderTSV = true;
    rng.SearchOtherTSV = false;

    rng.TSV = rngObjects[14].value;
    rng.pre_parent = pre_parent;
    rng.post_parent = post_parent;

    rng.Initialize();

    return rng;
}
