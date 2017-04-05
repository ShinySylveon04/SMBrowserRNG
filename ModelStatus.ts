import bigInt = require("big-integer");
import SFMT from "./SFMT";


export module ModelStatus {

    export var sfmt: SFMT;
    export var Modelnumber: number;

    export function frameshift(n: number): void {
        for (var i = 0; i < n; i++)
            sfmt.NextUInt64();
    }

    export class ModelStatus {
        public remain_frame: number[];
        public blink_flag: boolean[];

        constructor() {
            this.remain_frame = new Array();
            this.blink_flag = new Array();
            for (var i = 0; i < Modelnumber; i++) {
                this.remain_frame.push(0);
                this.blink_flag.push(false);
            }
            
        }

        public NextState(): number {
            var cnt: number = 0;
            for (var i = 0; i < Modelnumber; i++) {
                if (this.remain_frame[i] > 0)
                    this.remain_frame[i]--;

                if (this.remain_frame[i] == 0) {
                    if (this.blink_flag[i]) {
                        this.remain_frame[i] = bigInt(sfmt.NextUInt64()).mod(3).and(0xFFFFFFFF) == 0 ? 36 : 30;
                        cnt++;
                        this.blink_flag[i] = false;
                    } else {
                        if (bigInt(sfmt.NextUInt64()).and(0x7F).and(0xFFFFFFFF) == 0) {
                            this.remain_frame[i] = 5;
                            this.blink_flag[i] = true;
                        }
                        cnt++;
                    }
                }
            }
            return cnt;
        }
    }
}