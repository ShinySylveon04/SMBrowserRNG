import TinyMT from "./TinyMT";
import { TinyMTParameter } from "./TinyMTParameter";
import bigInt = require("big-integer");

type UInt32 = number;
type int = number;

export module EggRNGSearch {
    export var tiny: TinyMT;

    export var GenderRatio: number;
    export var GenderRandom, GenderMale, GenderFemale: boolean;
    export var DestinyKnot: boolean;
    export var International: boolean;
    export var ShinyCharm: boolean;
    export var SearchOtherTSV: boolean;
    export var ConciderTSV: boolean;

    export var Heterogeneous: boolean;
    export var ParentAbility: number;
    export var Both_Everstone: boolean;
    export var Everstone: boolean;
    export var Both_PowerItems: boolean;
    export var PowerItems: boolean;
    export var MalePowerStat, FemalePowerStat: number;

    export var TSV: number;
    var Homogeneous: boolean;
    var InheritIVs: number;
    export var PIDRerolls: number;

    var FramesUsed: number;
    export var pre_parent: number[];
    export var post_parent: number[];

    export function Initialize(): void {
        InheritIVs = DestinyKnot ? 5 : 3;
        PIDRerolls = 0;
        if (International)
            PIDRerolls += 6;
        if (ShinyCharm)
            PIDRerolls += 2;

        Homogeneous != Heterogeneous;
    }

    function getRand(): UInt32 {
        tiny.nextState();
        var r = tiny.temper();
        ++FramesUsed;
        return r;
    }

    function getRandomAbility(ability: int, value: UInt32): int {
        switch (ability) {
            case 0:
                return value < 80 ? 0 : 1;
            case 1:
                return value < 20 ? 0 : 1;
            case 2:
                if (value < 20) return 0;
                if (value < 40) return 1;
                return 2;
        }
        return 0;
    }

    export class EGGRNGResult {
        public Seed: Array<UInt32> = new Array(4);
        public readonly BaseIV: Array<int> = new Array(6);
        public InheritStats: Uint32Array;
        public InheritParents: Uint32Array;
        public Gender: int;
        public Ability: int;
        public Nature: int;
        public Ball: int;
        public BE_InheritParents: int;
        public PID: UInt32;
        public EC: UInt32;
        public Shiny: boolean;
        public FramesUsed: int;
        public PSV: UInt32;
        public row_r: UInt32;

        public Seed128 = function () {
            var SeedCopy: Array<string> = new Array(4);
            for (var i = 3; i > -1; i++) {
                SeedCopy[3 - i] = this.Seed[i].toString(16);
            }
            return SeedCopy.join(",");
        };
        public IVs: int[];
        public InheritIVs(pre_parent: int[], post_parent: int[]): void {
            this.IVs = this.BaseIV.splice(0);
            for (var j = 0; j < this.InheritStats.length; j++) {
                var stat = this.InheritStats[j];
                var parent = this.InheritParents[j]
                this.IVs[stat] = parent == 0 ? pre_parent[stat] : post_parent[stat];
            }
        }
    }

    export function Generate(seed: number[]): EGGRNGResult {
        tiny = new TinyMT(seed, new TinyMTParameter(0x8f7011ee, 0xfc78ff1f, 0x3793fdff));
        var egg: EGGRNGResult = new EGGRNGResult();
        egg.Seed = seed.splice(0);
        FramesUsed = 0;

        egg.row_r = tiny.temper();

        var rand: UInt32 = getRand();

        if (GenderRandom)
            egg.Gender = (rand - 252 * Math.floor(rand / 252)) >= GenderRatio ? 0 : 1;
        else if (GenderMale)
            egg.Gender = 0;
        else if (GenderFemale)
            egg.Gender = 1;
        else
            egg.Gender = 2;

        rand = getRand();
        egg.Nature = (rand - 25 * Math.floor(rand / 25));

        if (Both_Everstone) {
            egg.BE_InheritParents = getRand() & 1;
        }

        rand = getRand();
        egg.Ability = getRandomAbility(ParentAbility, rand - 100 * Math.floor(rand / 100));

        egg.InheritStats = new Uint32Array(InheritIVs);
        egg.InheritParents = new Uint32Array(InheritIVs);

        if (Both_PowerItems) {
            egg.InheritParents[0] = (getRand() & 1) == 0 ? 0 : 1;
            egg.InheritStats[0] = egg.InheritParents[0] == 0 ? MalePowerStat : FemalePowerStat;
        } else if (PowerItems) {
            egg.InheritParents[0] = MalePowerStat > -1 ? 0 : 1;
            egg.InheritStats[0] = egg.InheritParents[0] == 0 ? MalePowerStat : FemalePowerStat;
        }

        for (var i = 0; i < InheritIVs; i++) {
            if ((i == 0) && PowerItems)
                continue;
            var rand: UInt32;
            repeat:
            while (true) {
                rand = getRand();
                egg.InheritStats[i] = rand - 6 * Math.floor(rand / 6);

                for (var k = 0; k < i; k++) {
                    if (egg.InheritStats[k] == egg.InheritStats[i])
                        continue repeat;
                }
                break;
            }

            egg.InheritParents[i] = getRand() & 1;
        }

        for (var j = 0; j < 6; j++)
            egg.BaseIV[j] = getRand() & 0x1F;
        egg.InheritIVs(pre_parent, post_parent);

        egg.EC = getRand();

        for (var i = PIDRerolls; i > 0; i--) {
            egg.PID = getRand();
            egg.PSV = (bigInt(egg.PID).shiftRight(16)).xor(bigInt(egg.PID).and(0xFFFF)).shiftRight(4);

            if (!SearchOtherTSV && ConciderTSV && egg.PSV == TSV) {
                egg.Shiny = true;
                break;
            }
        }

        if (Homogeneous) {
            rand = getRand();
            egg.Ball = (rand - 100 * Math.floor(rand / 100)) >= 50 ? 0 : 1;
        }

        getRand();
        getRand();

        egg.FramesUsed = FramesUsed;
        return egg;
    }
}