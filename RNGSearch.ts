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

    export var Rand: Array<number>;
    export var index: number;

    export function ResetIndex(): void
    {
        index = 0;
    }

    export function ResetModelStatus(): void
    {
        remain_frame = new Array(modelnumber);
        blink_flag = new Array(modelnumber);
    }

    export var IsSolgaleo: boolean;
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

    export function Generate(): RNGResult
    {
        var st: RNGResult = new RNGResult();

        st.row_r = Rand[0];
        st.Clock = st.row_r % 17;

        if (!Considerhistory)
            ResetModelStatus();

        st.frameshift = getFrameShift();

        if (!Considerdelay)
        {
            ResetIndex();
            ResetModelStatus();
        }

        //UB using honey
        if (Wild && UB && Honey)
            st.UbValue = getUBValue();

        //Fishing
        if (Wild && Fishing)
        {
            st.Encounter = getRand() % 100;
            time_elapse(12);
        }

        //Synch
        if (Wild && !IsUB && !SOS)
            st.Synchronize = getRand() % 100 >= 50;
        else if (IsUB)
        {
            if (ConsiderBlink)
            {
                time_elapse(7);
                st.Synchronize = blink_process();
            }
        }
        else if (!Wild)
        {
            if (AlwaysSynchro)
            {
                if (Synchro_Stat < 25)
                    st.Synchronize = true;
            }
            else if (ConsiderBlink)
                st.Synchronize = blink_process();
        }

        //Encounter
        var SpecialWild: boolean = Wild && !Honey && (Encounter_th == 101 || SOS);
        if (Wild && !Honey && !SpecialWild && !Fishing)
            st.Encounter = getRand() % 100;

        //UB without honey
        if (Wild && UB && !Honey)
        {
            st.UbValue = getUBValue();
            if (IsUB)
            {
                Advance(1);
                st.Synchronize = blink_process();
            }
        }

        //UB is determined above
        var Listed: boolean = IsUB || !Wild;
        var IsShinyLocked: boolean = IsUB || ShinyLocked;
        if (Listed)
            st.Lv = PokeLv;

        //Wild Pokémon
        var IsWild: boolean = Wild && !IsUB;
        if (IsWild && !SpecialWild)
        {
            st.Slot = getSlot(getRand() % 100);
            st.Lv = getRand() % (Lv_max - Lv_min + 1) + Lv_min;
            Advance(1);
        }

        //Something
        if (!AlwaysSynchro && !SOS)
            Advance(60);

        //Encryption Constant
        st.EC = getRand() & 0xFFFFFFFF;

        //PID
        var roll_count: number = (ShinyCharm && !Listed) ? 3 : 1;
        if (SOS)
            roll_count += AdditionalPIDRollCount();
        for (var i = 0; i < roll_count; i++)
        {
            st.PID = getRand() & 0xFFFFFFFF;
            st.PSV = ((st.PID >> 16) ^ (st.PID & 0xFFFF)) >> 4;
            if (st.PSV = TSV)
            {
                st.Shiny = true;
                break;
            }
        }
        if (IsShinyLocked && st.PSV == TSV)
        {
            st.PID ^= 0x10000000;
            st.PSV ^= 0x100;
            st.Shiny = false;
        }

        //IV
        st.IVs = new Array(6);
        //Find better way to do this
        for (var i = 0; i < 6; i++)
            st.IVs[i] = -1;
        var cnt: number = (IsUB ? true : Fix3v) ? 3 : 0;
        var ran: number;
        while (cnt > 0)
        {
            ran = getRand() % 6;
            if (st.IVs[ran] < 0)
            {
                st.IVs[ran] = 31;
                cnt--;
            }
        }
        for (var i = 0; i < 6; i++)
            if (st.IVs[i] < 0)
                st.IVs[i] = getRand() & 0x1F;

        //Ability
        if (IsWild || AlwaysSynchro)
            st.Ability = (getRand() & 1) + 1;

        //Nature
        st.Nature = currentRand() % 25;
        if (st.Synchronize)
        {
            if (Synchro_Stat < 25)
                st.Nature = Synchro_Stat
        }
        else
            index++;

        //Gender
        if (nogender || IsUB)
            st.Gender = 0;
        else
            st.Gender = getRand() % 252 >= gender_ratio ? 1 : 2;

        //Item
        if (IsWild && !SOS)
            st.Item = getRand() % 100;

        return st;
    }

    export function GenerateEvent(e: EventRule): RNGResult
    {
        var st: RNGResult = new RNGResult();
        index = 0;

        st.row_r = Rand[0];
        st.Clock = st.row_r % 17;

        if (!Considerhistory)
            ResetModelStatus();

        st.frameshift = getFrameShiftEvent(e);
        if (!Considerdelay)
        {
            ResetIndex();
            ResetModelStatus();
        }

        //Encryption Constant
        st.EC = e.EC > 0 ? e.EC : getRand() & 0xFFFFFFFF;

        //PID
        switch (e.PIDType)
        {
            case 0: //Random PID
                st.PID = getRand() & 0xFFFFFFFF
                st.PSV = ((st.PID >> 16) ^ (st.PID & 0xFFFF)) >> 4;
                if (st.PSV = e.TSV)
                    st.Shiny = true;
                break;
            case 1: //Random nonshiny
                st.PID = getRand() & 0xFFFFFFFF;
                st.PSV = ((st.PID >> 16) ^ (st.PID & 0xFFFF)) >> 4;
                if (st.PSV == e.TSV)
                {
                    st.PID ^= 0x10000000;
                    st.PSV ^= 0x100;
                }
                break;
            case 2: //Random shiny
                st.Shiny = true;
                st.PID = getRand() & 0xFFFFFFFF;
                st.PSV = e.TSV;
                if (e.OtherInfo)
                    st.PID = ((e.TID ^ e.SID ^ (st.PID & 0xFFFF)) << 16) + (st.PID & 0xFFFF);
                break;
            case 3: //Locked PID
                st.PID = e.PID;
                break;
        }

        //IV
        st.IVs = new Array(6);
        //Find a better way to do this
        for (var i = 0; i < 6; i++)
            st.IVs[i] = e.IVs[i];
        var cnt: number = (IsUB ? true : Fix3v) ? 3 : 0;
        var ran: number;
        while (cnt > 0) {
            ran = getRand() % 6;
            if (st.IVs[ran] < 0) {
                st.IVs[ran] = 31;
                cnt--;
            }
        }
        for (var i = 0; i < 6; i++)
            if (st.IVs[i] < 0)
                st.IVs[i] = getRand() & 0x1F;

        //Ability
        st.Ability = e.AbilityLocked ? e.Ability : e.Ability == 0 ? (getRand() & 1) + 1 : getRand() % 3 + 1;

        //Nature
        st.Nature = e.NatureLocked ? e.Nature : getRand() % 25;

        //Gender
        st.Gender = (e.GenderLocked || nogender) ? e.Gender : getRand() % 252 >= gender_ratio ? 1 : 2;

        return st;
    }

    export function CreateBuffer(sfmt: SFMT, CalcDelay: boolean): void
    {
        var RandBuffSize: number = 200;
        if (CalcDelay)
            RandBuffSize += modelnumber * delaytime;

        //Find a better way to do this
        while (Rand.length != 0)
            Rand.pop;

        for (var i = 0; i < RandBuffSize; i++)
            Rand.push(sfmt.NextUInt64());
    }

    export function getRand(): number
    {
        return Rand[index++];
    }

    export function currentRand(): number
    {
        return Rand[index];
    }
    export function Advance(d: number): void
    {
        index += d;
    }

    export function getFrameShift(): number
    {
        if (Honey) {
            ResetModelStatus();
            time_elapse(1);
            index = PreDelayCorrection;
        }
        else
            ButtonPressDelay();
        time_delay();
        return index;
    }

    export function getFrameShiftEvent(e: EventRule): number
    {
        ButtonPressDelay();
        if (e.YourID && !e.IsEgg)
        {
            Advance(10);
            time_delay();
        }
        return index;
    }

    export function ButtonPressDelay(): void
    {
        time_elapse(2);
    }

    export function time_delay(): void
    {
        if (IsSolgaleo || IsLunala)
        {
            var crydelay: number = IsSolgaleo ? 79 : 76;
            time_elapse(delaytime - crydelay - 19);
            if (modelnumber == 7)
                Rearrange();
            time_elapse(19);
            Advance(1);
            time_elapse(crydelay);
        }
        else
            time_elapse(delaytime);
    }

    export function blink_process(): boolean
    {
        var synch: boolean = getRand() % 100 >= 50;
        time_elapse(3);
        return synch;
    }

    export function Rearrange(): void
    {
        modelnumber = 5;
        var order: number[] = [0, 1, 2, 5, 6];
        for (var i = 0; i < 5; i++)
        {
            remain_frame[i] = remain_frame[order[i]];
            blink_flag[i] = blink_flag[order[i]];
        }
    }

    export function time_elapse(n: number): void
    {
        for (var totalframe = 0; totalframe < n; totalframe++)
        {
            for (var i = 0; i < modelnumber; i++)
            {
                if (remain_frame[i] > 0)
                    remain_frame[i]--;

                if (remain_frame[i] == 0)
                {
                    if (blink_flag[i])
                    {
                        remain_frame[i] = getRand() % 3 == 0 ? 36 : 30;
                        blink_flag[i] = false;
                    }
                    else if ((getRand() & 0x7F) == 0)
                    {
                        remain_frame[i] = 5;
                        blink_flag[i] = true;
                    }
                }
            }
        }
    }

    export function getUBValue(): byte
    {
        var UBValue: byte = getRand() % 100;
        IsUB = UBValue < UB_th;
        return UBValue;
    }

    export function getSlot(rand: number): byte
    {
        if (rand < 20)
            return 1;
        if (rand < 40)
            return 2;
        if (rand < 50)
            return 3;
        if (rand < 60)
            return 4;
        if (rand < 70)
            return 5;
        if (rand < 80)
            return 6;
        if (rand < 90)
            return 7;
        if (rand < 95)
            return 8;
        if (rand < 99)
            return 9;
        return 10;
    }

    export function AdditionalPIDRollCount(): byte
    {
        if (ChainLength < 11)
            return 0;
        if (ChainLength < 21)
            return 4;
        if (ChainLength < 31)
            return 8;
        return 12;
    }

    export function getPerfectIVCount(): byte
    {
        if (ChainLength < 5)
            return 0;
        if (ChainLength < 10)
            return 1;
        if (ChainLength < 20)
            return 2;
        if (ChainLength < 30)
            return 3;
        return 4;
    }

    export function getHAThreshold(): byte
    {
        if (ChainLength < 10)
            return 0;
        if (ChainLength < 20)
            return 5;
        if (ChainLength < 30)
            return 10;
        return 15;
    }
}