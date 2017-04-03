import bigInt = require("big-integer");
import SFMT from "./SFMT";

type UInt32 = number;
type int = number;
type byte = number;

export module RNGSearch
{
    export var AlwaysSynchro: boolean;
    export var Synchro_Stat: byte;
    export var Fix3v: boolean;

    export var TSV: int;
    export var ShinyLocked: boolean;
    export var ShinyCharm: boolean;

    export var PokeLv: byte;

    export var Wild, Honey, UB, Fishing, SOS: boolean;
    export var Lv_max, Lv_min: byte;
    export var ChainLength: byte = 0;
    export var UB_th, Encounter_th: byte;
    export var IsUB: boolean = false;
    export var nogender: boolean;
    export var gender_ratio: byte;

    export var Considerhistory: boolean;
    export var Considerdelay: boolean;
    export var PreDelayCorrection: int;
    export var delaytime: int = 93; //For honey 186F =3.1s
    export var ConsiderBlink: boolean = true;
    export var modelnumber: int;
    export var remain_frame: Array<number>;
    export var blink_flag: Array<boolean>;

    export function ResetModelStatus(): void
    {
        remain_frame = new Array(modelnumber);
        blink_flag = new Array(modelnumber);
    }

    export var IsSolaleo: boolean;
    export var IsLunala: boolean;

    export class RNGResult
    {
        public Nature: byte;
        public Clock: byte;
        public PID: UInt32;
        public EC: UInt32;
        public PSV: UInt32;
        public row_r: number;
        public IVs: Array<number>;
        public Stats: Array<number>;
        public Shiny: boolean;
        public Synchronize: boolean;
        public Blink: byte;
        public frameshift: number;

        public Encounter: number = -1;
        public Gender: byte;
        public Ability: byte = 1;
        public UbValue: byte = 100;
        public Slot: byte;
        public Lv: byte;
        public Item: byte = 100;

        public realtime: number = -1;
    }

    export class EventRule
    {
        public IVs: Array<number>;
        public TSV: UInt32;
        public IVsCount: byte;
        public YourID: boolean;
        public IsEgg: boolean;
        public PIDType: byte;
        public AbilityLocked: boolean;
        public Ability: byte;
        public NatureLocked: boolean;
        public Nature: byte;
        public GenderLocked: boolean;
        public Gender: byte;
        public OtherInfo: boolean;
        public TID: number = -1;
        public SID: number = -1;
        public EC: UInt32;
        public PID: UInt32;
    }

    export function Generate(seed: number): RNGResult
    {
        var st: RNGResult = new RNGResult();

        return st;
    }
}