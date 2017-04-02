import { RandomBase } from "./RandomBase";
import DeepCopy = require("deepcopy");

type UInt32 = number;
type int = number;

﻿export default class SFMT extends RandomBase
{
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

    constructor(seed: UInt32)
    {
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
    }

    public UInt32()
    {
        if (this.idx >= this.N32)
        {
            this.gen_rand_all_19937();
            this.idx = 0;
        }
        return this.sfmt[this.idx++];
    }

    public init_gen_rand(seed: UInt32)
    {
        var i: number;
        this.sfmt = new Uint32Array(this.N32);
        this.sfmt[0] = seed;
        for (i = 1; i < this.N32; i++)
            this.sfmt[i] = 1812433253 * (this.sfmt[i - 1] ^ (this.sfmt[i - 1] >> 30)) + i;
        this.period_certification();
        this.idx = this.N32;
    }

    public period_certification()
    {
        var PARITY: Uint32Array = new Uint32Array(4);
        PARITY[0] = this.PARITY1;
        PARITY[1] = this.PARITY2;
        PARITY[2] = this.PARITY3;
        PARITY[3] = this.PARITY4;
        var i, j: number;
        var work: UInt32;

        for (i = 0; i < 4; i++)
        {
            work = 1;
            for (j = 0; j < 32; j++)
            {
                if ((work & PARITY[i]) != 0)
                {
                    this.sfmt[i] = this.sfmt[i] ^ work;
                    return;
                }
                work = work << 1;
            }
        }
    }

    public gen_rand_all_19937()
    {
        var a, b, c, d: number;

        a = 0;
        b = 488;
        c = 616;
        d = 620;
        do
        {
            this.sfmt[a + 3] = this.sfmt[a + 3] ^ (this.sfmt[a + 3] << 8) ^ (this.sfmt[a + 2] >> 24) ^ (this.sfmt[c + 3] >> 8) ^ ((this.sfmt[b + 3] >> this.SR1) & this.MSK4) ^ (this.sfmt[d + 3] << this.SL1);
            this.sfmt[a + 2] = this.sfmt[a + 2] ^ (this.sfmt[a + 2] << 8) ^ (this.sfmt[a + 1] >> 24) ^ (this.sfmt[c + 3] << 24) ^ (this.sfmt[c + 2] >> 8) ^ ((this.sfmt[b + 2] >> this.SR1) & this.MSK3) ^ (this.sfmt[d + 2] << this.SL1);
            this.sfmt[a + 1] = this.sfmt[a + 1] ^ (this.sfmt[a + 1] << 8) ^ (this.sfmt[a + 0] >> 24) ^ (this.sfmt[c + 2] << 24) ^ (this.sfmt[c + 1] >> 8) ^ ((this.sfmt[b + 1] >> this.SR1) & this.MSK2) ^ (this.sfmt[d + 1] << this.SL1);
            this.sfmt[a + 0] = this.sfmt[a + 0] ^ (this.sfmt[a + 0] << 8) ^ (this.sfmt[c + 1] << 24) ^ (this.sfmt[c + 0] >> 8) ^ ((this.sfmt[b + 0] >> this.SR1) & this.MSK1) ^ (this.sfmt[d + 0] << this.SL1);
            c = d;
            d = a;
            a += 4;
            b += 4;
            if (b >= this.N32)
                b = 0; 
        } while (a < this.N32);
    }
}
