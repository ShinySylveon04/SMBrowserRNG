import TinyMT from "./TinyMT";
import { TinyMTParameter } from "./TinyMTParameter";
import bigInt = require("big-integer");

type UInt32 = number;
type int = number;

export class EggRNGSearch {
    public tiny: TinyMT;

    public GenderRatio: number;
    public GenderRandom: boolean;
    public GenderMale: boolean;
    public GenderFemale: boolean;
    public DestinyKnot: boolean;
    public International: boolean;
    public ShinyCharm: boolean;
    public SearchOtherTSV: boolean;
    public ConciderTSV: boolean;

    public Heterogeneous: boolean;
    public ParentAbility: number;
    public Both_Everstone: boolean;
    public Everstone: boolean;
    public Both_PowerItems: boolean;
    public PowerItems: boolean;
    public MalePowerStat: number;
    public FemalePowerStat: number;

    public TSV: number;
    Homogeneous: boolean;
    InheritIVs: number;
    public PIDRerolls: number;

    public FramesUsed: number;
    public pre_parent: number[];
    public post_parent: number[];

    Initialize(): void {
        this.InheritIVs = this.DestinyKnot ? 5 : 3;
        this.PIDRerolls = 0;
        if (this.International)
            this.PIDRerolls += 6;
        if (this.ShinyCharm)
            this.PIDRerolls += 2;

        this.Homogeneous != this.Heterogeneous;
    }

    getRand(): UInt32 {
        this.tiny.nextState();
        var r = this.tiny.temper();
        ++this.FramesUsed;
        return r;
    }

    getRandomAbility(ability: int, value: UInt32): int {
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

    Generate(seed: number[]): EGGRNGResult {
        this.tiny = new TinyMT(seed, new TinyMTParameter(0x8f7011ee, 0xfc78ff1f, 0x3793fdff));
        var egg: EGGRNGResult = new EGGRNGResult();
        egg.Seed = seed.splice(0);
        this.FramesUsed = 0;

        egg.row_r = this.tiny.temper();

        var rand: UInt32 = this.getRand();

        if (this.GenderRandom)
            egg.Gender = (rand - 252 * Math.floor(rand / 252)) >= this.GenderRatio ? 0 : 1;
        else if (this.GenderMale)
            egg.Gender = 0;
        else if (this.GenderFemale)
            egg.Gender = 1;
        else
            egg.Gender = 2;

        rand = this.getRand();
        egg.Nature = (rand - 25 * Math.floor(rand / 25));

        if (this.Both_Everstone) {
            egg.BE_InheritParents = this.getRand() & 1;
        }

        rand = this.getRand();
        egg.Ability = this.getRandomAbility(this.ParentAbility, rand - 100 * Math.floor(rand / 100));

        egg.InheritStats = new Uint32Array(this.InheritIVs);
        egg.InheritParents = new Uint32Array(this.InheritIVs);

        if (this.Both_PowerItems) {
            egg.InheritParents[0] = (this.getRand() & 1) == 0 ? 0 : 1;
            egg.InheritStats[0] = egg.InheritParents[0] == 0 ? this.MalePowerStat : this.FemalePowerStat;
        } else if (this.PowerItems) {
            egg.InheritParents[0] = this.MalePowerStat > -1 ? 0 : 1;
            egg.InheritStats[0] = egg.InheritParents[0] == 0 ? this.MalePowerStat : this.FemalePowerStat;
        }

        for (var i = 0; i < this.InheritIVs; i++) {
            if ((i == 0) && this.PowerItems)
                continue;
            var rand: UInt32;
            repeat:
            while (true) {
                rand = this.getRand();
                egg.InheritStats[i] = rand - 6 * Math.floor(rand / 6);

                for (var k = 0; k < i; k++) {
                    if (egg.InheritStats[k] == egg.InheritStats[i])
                        continue repeat;
                }
                break;
            }

            egg.InheritParents[i] = this.getRand() & 1;
        }

        for (var j = 0; j < 6; j++)
            egg.BaseIV[j] = this.getRand() & 0x1F;
        egg.InheritIVs(this.pre_parent, this.post_parent);

        egg.EC = this.getRand();

        for (var i = this.PIDRerolls; i > 0; i--) {
            egg.PID = this.getRand();
            egg.PSV = (bigInt(egg.PID).shiftRight(16)).xor(bigInt(egg.PID).and(0xFFFF)).shiftRight(4);

            if (!this.SearchOtherTSV && this.ConciderTSV && egg.PSV == this.TSV) {
                egg.Shiny = true;
                break;
            }
        }

        if (this.Homogeneous) {
            rand = this.getRand();
            egg.Ball = (rand - 100 * Math.floor(rand / 100)) >= 50 ? 0 : 1;
        }

        this.getRand();
        this.getRand();

        egg.FramesUsed = this.FramesUsed;
        return egg;
    }
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