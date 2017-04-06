import { RandomBase } from "./RandomBase";
import DeepCopy = require("deepcopy");
import bigInt = require("big-integer");

type UInt32 = number;
type int = number;

﻿export default class SFMT extends RandomBase {
    public MEXP: int;
    public POS1: int;
    public SL1: int;
    public SL2: int;
    public SR1: int;
    public SR2: int;
    public MSK1: int;
    public MSK2: UInt32;
    public MSK3: UInt32;
    public MSK4: UInt32;
    public PARITY1: UInt32;
    public PARITY2: UInt32;
    public PARITY3: UInt32;
    public PARITY4: UInt32;
    public N: int;
    public N32: int;
    public SL2_x8: int;
    public SR2_x8: int;
    public SL2_ix8: int;
    public SR2_ix8: int;
    public sfmt: Uint32Array;
    public idx: int;

    constructor(seed: UInt32) {
        super();
        this.MEXP = 19937;
        this.POS1 = 122;
        this.SL1 = 18;
        this.SL2 = 1;
        this.SR1 = 11;
        this.SR2 = 1;
        this.MSK1 = 0xdfffffef;
        this.MSK2 = 0xddfecb7f;
        this.MSK3 = 0xbffaffff;
        this.MSK4 = 0xbffffff6;
        this.PARITY1 = 0x00000001;
        this.PARITY2 = 0x00000000;
        this.PARITY3 = 0x00000000;
        this.PARITY4 = 0x13c9e684;
        this.N = 156;
        this.N32 = 624;
        this.SL2_x8 = 8;
        this.SR2_x8 = 8;
        this.SL2_ix8 = 56;
        this.SR2_ix8 = 56;
        if (seed != -1)
            this.init_gen_rand(seed);
    }

    public NextUInt32() {
        if (this.idx >= this.N32) {
            this.gen_rand_all_19937();
            this.idx = 0;
        }
        return this.sfmt[this.idx++];
    }

    public init_gen_rand(seed: UInt32) {
        var i: number;
        this.sfmt = new Uint32Array(this.N32);
        this.sfmt[0] = seed;
        for (i = 1; i < this.N32; i++)
            this.sfmt[i] = bigInt(1812433253).multiply(bigInt(this.sfmt[i - 1]).xor(bigInt(this.sfmt[i - 1]).shiftRight(30))).add(i).and(0xFFFFFFFF);
        this.period_certification();
        this.idx = this.N32;
    }

    public period_certification() {
        var PARITY: Uint32Array = new Uint32Array(4);
        PARITY[0] = this.PARITY1;
        PARITY[1] = this.PARITY2;
        PARITY[2] = this.PARITY3;
        PARITY[3] = this.PARITY4;
        var i, j: number;
        var work: UInt32;

        for (i = 0; i < 4; i++) {
            work = 1;
            for (j = 0; j < 32; j++) {
                if ((work & PARITY[i]) != 0) {
                    this.sfmt[i] = bigInt(this.sfmt[i]).xor(work).and(0xFFFFFFFF);
                    return;
                }
                work = work << 1;
            }
        }
    }

    public gen_rand_all_19937() {
        var a, b, c, d: number;

        a = 0;
        b = 488;
        c = 616;
        d = 620;
        do {
            this.sfmt[a + 3] = bigInt(this.sfmt[a + 3]).xor(bigInt(this.sfmt[a + 3]).shiftLeft(8)).xor(bigInt(this.sfmt[a + 2]).shiftRight(24)).xor(bigInt(this.sfmt[c + 3]).shiftRight(8)).xor(bigInt(bigInt(this.sfmt[b + 3]).shiftRight(this.SR1)).and(this.MSK4)).xor(bigInt(this.sfmt[d + 3]).shiftLeft(this.SL1)).and(0xFFFFFFFF);
            this.sfmt[a + 2] = bigInt(this.sfmt[a + 2]).xor(bigInt(this.sfmt[a + 2]).shiftLeft(8)).xor(bigInt(this.sfmt[a + 1]).shiftRight(24)).xor(bigInt(this.sfmt[c + 3]).shiftLeft(24)).xor(bigInt(this.sfmt[c + 2]).shiftRight(8)).xor(bigInt(bigInt(this.sfmt[b + 2]).shiftRight(this.SR1)).and(this.MSK3)).xor(bigInt(this.sfmt[d + 2]).shiftLeft(this.SL1)).and(0xFFFFFFFF);
            this.sfmt[a + 1] = bigInt(this.sfmt[a + 1]).xor(bigInt(this.sfmt[a + 1]).shiftLeft(8)).xor(bigInt(this.sfmt[a + 0]).shiftRight(24)).xor(bigInt(this.sfmt[c + 2]).shiftLeft(24)).xor(bigInt(this.sfmt[c + 1]).shiftRight(8)).xor(bigInt(bigInt(this.sfmt[b + 1]).shiftRight(this.SR1)).and(this.MSK2)).xor(bigInt(this.sfmt[d + 1]).shiftLeft(this.SL1)).and(0xFFFFFFFF);
            this.sfmt[a + 0] = bigInt(this.sfmt[a + 0]).xor(bigInt(this.sfmt[a + 0]).shiftLeft(8)).xor(bigInt(this.sfmt[c + 1]).shiftLeft(24)).xor(bigInt(this.sfmt[c + 0]).shiftRight(8)).xor(bigInt(bigInt(this.sfmt[b + 0]).shiftRight(this.SR1)).and(this.MSK1)).xor(bigInt(this.sfmt[d + 0]).shiftLeft(this.SL1)).and(0xFFFFFFFF);
            c = d;
            d = a;
            a += 4;
            b += 4;
            if (b >= this.N32)
                b = 0;
        } while (a < this.N32);
    }

    public deepCopy() {
        var tempsfmt: SFMT = new SFMT(-1);

        for (var i = 0; i < 624; i++)
            tempsfmt.sfmt[i] = this.sfmt[i];

        tempsfmt.idx = this.idx;

        return tempsfmt;
    }

}
