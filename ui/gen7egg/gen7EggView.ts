import TinyMT from "../../TinyMT";
import SFMT from "../../SFMT";
import { TinyMTParameter } from "../../TinyMTParameter";
import * as EggRNGSearch from "../../EggRNGSearch";

export class eggRNGView {
    public rngResult;

    constructor(rngObjects: any, frames: number){
        this.rngResult = [];
        var st: Array<number> = new Array(4);

        st[3] = parseInt(rngObjects.seeds[0].value, 16);
        st[2] = parseInt(rngObjects.seeds[1].value, 16);
        st[1] = parseInt(rngObjects.seeds[2].value, 16);
        st[0] = parseInt(rngObjects.seeds[3].value, 16);

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
    let pre_parent_ivs = rngObjects.parentIVs[0].ivObjects;
    let post_parent_ivs = rngObjects.parentIVs[1].ivObjects;
    var rng: EggRNGSearch.EggRNGSearch = new EggRNGSearch.EggRNGSearch();

    if(rngObjects.Item1.value=="Everstone"
     && rngObjects.Item2.value=="Everstone") {
         bothEverstone = true;
     }

    if(rngObjects.Item1.value=="Everstone"
        || rngObjects.Item2.value=="Everstone") {
        Everstone = true;
    }

    if(rngObjects.Item1.value=="Destiny Knot"
        || rngObjects.Item2.value=="Destiny Knot") {
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

    rng.GenderRatio = rngObjects.genderRatio.value;
    rng.GenderRandom = true;
    rng.GenderMale = false;
    rng.GenderFemale = false;
    rng.International = rngObjects.mmCheck.checked;
    rng.ShinyCharm = rngObjects.scCheck.checked;
    rng.Heterogeneous = rngObjects.difSpec.checked;
    rng.Both_Everstone = bothEverstone;
    rng.Everstone = Everstone;
    rng.DestinyKnot = DestinyKnot;
    rng.Both_PowerItems = false;
    rng.PowerItems = false;
    rng.MalePowerStat = -2;
    rng.FemalePowerStat = -1;
    rng.ParentAbility = (rngObjects.isDitto[1].checked) ? parseInt(rngObjects.Ability1.value, 10) : parseInt(rngObjects.Ability2.value, 10);
    rng.ConciderTSV = (rngObjects.TSV.value!="") ? true : false;
    rng.SearchOtherTSV = false;

    rng.TSV = rngObjects.TSV.value;
    rng.pre_parent = pre_parent;
    rng.post_parent = post_parent;

    rng.Initialize();

    return rng;
}
