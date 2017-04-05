import bigInt = require("big-integer");
import SFMT from "./SFMT";

type UInt32 = number;
type int = number;
type byte = number;

export module RNGSearch {

    export var Considerhistory: boolean;
    export var Considerdelay: boolean;
    export var PreDelayCorrection: int;
    export var delaytime: int = 93; //For honey 186F =3.1s
    export var ConsiderBlink: boolean = true;
    export var modelnumber: int;
    export var remain_frame: Array<number>;
    export var blink_flag: Array<boolean>;
    var index: number;
    export var Rand: Array<number> = new Array();

    export function ResetIndex(): void {
        index = 0;
    }

    export function ResetModelStatus(): void {
        remain_frame = new Array(modelnumber);
        blink_flag = new Array(modelnumber);
    }

    export var IsSolgaleo: boolean;
    export var IsLunala: boolean;

    export function CreateBuffer(sfmt: SFMT, CalcDelay: boolean): void {
        var RandBuffSize: number = 200;
        if (CalcDelay)
            RandBuffSize += modelnumber * delaytime;

        //Find a better way to do this
        Rand.splice(0, Rand.length);

        for (var i = 0; i < RandBuffSize; i++)
            Rand.push(sfmt.NextUInt64());

    }

    export function getRand(): number {
        return Rand[index++];
    }

    export function currentRand(): number {
        return Rand[index];
    }

    export function Advance(d: number): void {
        index += d;
    }

    export function ButtonPressDelay(): void {
        time_elapse(2);
    }

    export function time_delay(): void {
        if (IsSolgaleo || IsLunala) {
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

    export function blink_process(): boolean {
        var temp = getRand();
        var synch: boolean = bigInt(temp).mod(100).and(0xFFFFFFFF) >= 50;
        time_elapse(3);
        return synch;
    }

    export function Rearrange(): void {
        modelnumber = 5;
        var order: number[] = [0, 1, 2, 5, 6];
        for (var i = 0; i < 5; i++) {
            remain_frame[i] = remain_frame[order[i]];
            blink_flag[i] = blink_flag[order[i]];
        }
    }

    export function time_elapse(n: number): void {
        for (var totalframe = 0; totalframe < n; totalframe++) {
            for (var i = 0; i < modelnumber; i++) {
                if (remain_frame[i] > 0)
                    remain_frame[i]--;
                var temp = getRand();
                if (remain_frame[i] == 0) {
                    if (blink_flag[i]) {
                        remain_frame[i] = temp - 3 * Math.floor(temp / 3) == 0 ? 36 : 30;
                        blink_flag[i] = false;
                    } else if (bigInt(temp).and(0x7F).and(0xFFFFFFFF) == 0) {
                        remain_frame[i] = 5;
                        blink_flag[i] = true;
                    }
                }
            }
        }
    }

    export function getSlot(rand: number): byte {
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


    export class RNGSearch {

        public AlwaysSynchro: boolean;
        public Synchro_Stat: byte;
        public Fix3v: boolean;

        public TSV: int;
        public ShinyLocked: boolean;
        public ShinyCharm: boolean;

        public PokeLv: byte;

        public Wild: boolean;
        public Honey: boolean;
        public UB: boolean;
        public Fishing: boolean;
        public SOS: boolean;
        public Lv_max: byte;
        public Lv_min: byte;
        public ChainLength: byte = 0;
        public UB_th: byte;
        public Encounter_th: byte;
        public IsUB: boolean = false;
        public nogender: boolean;
        public gender_ratio: byte;

        tempRand: number = 0;

        public Generate(): RNGResult {
            var st: RNGResult = new RNGResult();
            index = 0;

            st.row_r = Rand[0];
            st.Clock = bigInt(st.row_r).mod(17).and(0xFF);

            if (!Considerhistory)
                ResetModelStatus();

            st.frameshift = this.getFrameShift();

            if (!Considerdelay) {
                ResetIndex();
                ResetModelStatus();
            }

            //UB using honey
            if (this.Wild && this.UB && this.Honey)
                st.UbValue = this.getUBValue();

            //Fishing
            if (this.Wild && this.Fishing) {
                st.Encounter = bigInt(getRand()).mod(100).and(0xFFFFFFFF);
                time_elapse(12);
            }

            //Synch
            if (this.Wild && !this.IsUB && !this.SOS) {
                st.Synchronize = bigInt(getRand()).mod(100).and(0xFFFFFFFF) >= 50;
            } else if (this.IsUB) {
                if (ConsiderBlink) {
                    time_elapse(7);
                    st.Synchronize = blink_process();
                }
            } else if (!this.Wild) {
                if (this.AlwaysSynchro) {
                    if (this.Synchro_Stat < 25)
                        st.Synchronize = true;
                } else if (ConsiderBlink)
                    st.Synchronize = blink_process();
            }

            //Encounter
            var SpecialWild: boolean = this.Wild && !this.Honey && (this.Encounter_th == 101 || this.SOS);
            if (this.Wild && !this.Honey && !SpecialWild && !this.Fishing) {
                st.Encounter = bigInt(getRand()).mod(100).and(0xFFFFFFFF);
            }


            //UB without honey
            if (this.Wild && this.UB && !this.Honey) {
                st.UbValue = this.getUBValue();
                if (this.IsUB) {
                    Advance(1);
                    st.Synchronize = blink_process();
                }
            }

            //UB is determined above
            var Listed: boolean = this.IsUB || !this.Wild;
            var IsShinyLocked: boolean = this.IsUB || this.ShinyLocked;
            if (Listed)
                st.Lv = this.PokeLv;

            //Wild Pokémon
            var IsWild: boolean = this.Wild && !this.IsUB;
            if (IsWild && !SpecialWild) {
                st.Slot = getSlot(bigInt(getRand()).mod(100).and(0xFFFFFFFF));
                st.Lv = bigInt(getRand()).mod((this.Lv_max - this.Lv_min + 1) + this.Lv_min).and(0xFF);
                Advance(1);
            }

            //Something
            if (!this.AlwaysSynchro && !this.SOS)
                Advance(60);

            //Encryption Constant
            st.EC = bigInt(getRand()).and(0xFFFFFFFF);

            //PID
            var roll_count: number = (this.ShinyCharm && !Listed) ? 3 : 1;
            if (this.SOS)
                roll_count += this.AdditionalPIDRollCount();
            for (var i = 0; i < roll_count; i++) {
                st.PID = bigInt(getRand()).and(0xFFFFFFFF);
                st.PSV = bigInt(st.PID).shiftRight(16).xor(bigInt(st.PID).and(0xFFFF)).shiftRight(4);
                if (st.PSV == this.TSV) {
                    st.Shiny = true;
                    break;
                }
            }
            if (IsShinyLocked && st.PSV == this.TSV) {
                st.PID = bigInt(st.PID).xor(0x10000000).and(0xFFFFFFFF);
                st.PSV = bigInt(st.PSV).xor(0x100);
                st.Shiny = false;
            }

            //IV
            st.IVs = new Array(6);
            //Find better way to do this
            for (var i = 0; i < 6; i++)
                st.IVs[i] = -1;
            var cnt: number = (this.IsUB ? true : this.Fix3v) ? 3 : 0;
            while (cnt > 0) {
                var ran: number = bigInt(getRand()).mod(6);
                if (st.IVs[ran] < 0) {
                    st.IVs[ran] = 31;
                    cnt--;
                }
            }
            for (var i = 0; i < 6; i++)
                if (st.IVs[i] < 0)
                    st.IVs[i] = bigInt(getRand()).and(0x1F);

            //Ability
            if (IsWild || this.AlwaysSynchro)
                st.Ability = bigInt(getRand()).and(1).add(1).add(0xFF);

            //Nature
            st.Nature = bigInt(currentRand()).mod(25).and(0xFF);
            if (st.Synchronize) {
                if (this.Synchro_Stat < 25)
                    st.Nature = this.Synchro_Stat
            }
            else
                index++;

            //Gender
            if (this.nogender || this.IsUB)
                st.Gender = 0;
            else {
                st.Gender = bigInt(getRand()).mod(252).and(0xFFFFFFFF) >= this.gender_ratio ? 1 : 2;
            }


            //Item
            if (IsWild && !this.SOS) {
                st.Item = bigInt(getRand()).mod(100).and(0xFF);
            }


            return st;
        }

        public GenerateEvent(e: EventRule): RNGResult {
            var st: RNGResult = new RNGResult();
            index = 0;

            st.row_r = Rand[0];
            st.Clock = bigInt(st.row_r).mod(17).and(0xFF);

            if (!Considerhistory)
                ResetModelStatus();

            st.frameshift = this.getFrameShiftEvent(e);

            if (!Considerdelay) {
                ResetIndex();
                ResetModelStatus();
            }

            //Encryption Constant
            st.EC = e.EC > 0 ? e.EC : bigInt(getRand()).and(0xFFFFFFFF);

            //PID
            switch (e.PIDType) {
                case 0: //Random PID
                    st.PID = bigInt(getRand()).and(0xFFFFFFFF);
                    st.PSV = bigInt(st.PID).shiftRight(16).xor(bigInt(st.PID).and(0xFFFF)).shiftRight(4);
                    if (st.PSV == e.TSV)
                        st.Shiny = true;
                    break;
                case 1: //Random nonshiny
                    st.PID = bigInt(getRand()).and(0xFFFFFFFF);
                    st.PSV = bigInt(st.PID).shiftRight(16).xor(bigInt(st.PID).and(0xFFFF)).shiftRight(4);
                    if (st.PSV == e.TSV) {
                        st.PID = bigInt(st.PID).xor(0x10000000);
                        st.PSV = bigInt(st.PSV).xor(0x100);
                    }
                    break;
                case 2: //Random shiny
                    st.Shiny = true;
                    st.PID = bigInt(getRand()).and(0xFFFFFFFF);
                    st.PSV = e.TSV;
                    if (e.OtherInfo)
                        st.PID = bigInt(e.TID).xor(e.SID).xor(bigInt(st.PID).and(0xFFFF)).leftShift(16).add(bigInt(st.PID).and(0xFFFF)).and(0xFFFFFFFF);
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
            var cnt: number = (this.IsUB ? true : this.Fix3v) ? 3 : 0;
            
            while (cnt > 0) {
                var ran: number = bigInt(getRand()).mod(6).and(0xFFFFFFFF);
                if (st.IVs[ran] < 0) {
                    st.IVs[ran] = 31;
                    cnt--;
                }
            }
            for (var i = 0; i < 6; i++)
                if (st.IVs[i] < 0)
                    st.IVs[i] = bigInt(getRand()).and(0x1F).and(0xFFFFFFFF);

            //Ability
            st.Ability = e.AbilityLocked ? e.Ability : e.Ability == 0 ? bigInt(getRand()).and(1).add(1).and(0xFF) : bigInt(getRand()).mod(3).add(1).and(0xFF);

            //Nature
            st.Nature = e.NatureLocked ? e.Nature : bigInt(getRand()).mod(25).and(0xFF);

            //Gender
            st.Gender = (e.GenderLocked || this.nogender) ? e.Gender : bigInt(getRand()).mod(252).and(0xFF) >= this.gender_ratio ? 1 : 2;

            return st;
        }

        public getFrameShift(): number {
            if (this.Honey) {
                ResetModelStatus();
                time_elapse(1);
                index = PreDelayCorrection;
            }
            else
                ButtonPressDelay();
            time_delay();
            return index;
        }

        public getFrameShiftEvent(e: EventRule): number {
            ButtonPressDelay();
            if (e.YourID && !e.IsEgg) {
                Advance(10);
                time_delay();
            }
            return index;
        }



        public getUBValue(): byte {
            var UBValue: byte = bigInt(getRand()).mod(100).and(0xFF);
            this.IsUB = UBValue < this.UB_th;
            return UBValue;
        }

        public AdditionalPIDRollCount(): byte {
            if (this.ChainLength < 11)
                return 0;
            if (this.ChainLength < 21)
                return 4;
            if (this.ChainLength < 31)
                return 8;
            return 12;
        }

        public getPerfectIVCount(): byte {
            if (this.ChainLength < 5)
                return 0;
            if (this.ChainLength < 10)
                return 1;
            if (this.ChainLength < 20)
                return 2;
            if (this.ChainLength < 30)
                return 3;
            return 4;
        }

        public getHAThreshold(): byte {
            if (this.ChainLength < 10)
                return 0;
            if (this.ChainLength < 20)
                return 5;
            if (this.ChainLength < 30)
                return 10;
            return 15;
        }

    }

    export class RNGResult {
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

    export class EventRule {
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

}

