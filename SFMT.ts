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

    constructor(seed: UInt32, mexp: int)
    {
        super();
        this.MEXP = mexp;
        if (mexp == 607)
        {
            this.POS1 = 2;
            this.SL1 = 15;
            this.SL2 = 3;
            this.SR1 = 13;
            this.SR2 = 3;
            this.MSK1 = 0xfdff37ff;
            this.MSK2 = 0xef7f3f7d;
            this.MSK3 = 0xff777b7d;
            this.MSK4 = 0x7ff7fb2f;
            this.PARITY1 = 0x00000001;
            this.PARITY2 = 0x00000000;
            this.PARITY3 = 0x00000000;
            this.PARITY4 = 0x5986f054;
        }
        else if (mexp == 1279)
        {
            this.POS1 = 7;
            this.SL1 = 14;
            this.SL2 = 3;
            this.SR1 = 5;
            this.SR2 = 1;
            this.MSK1 = 0xf7fefffd;
            this.MSK2 = 0x7fefcfff;
            this.MSK3 = 0xaff3ef3f;
            this.MSK4 = 0xb5ffff7f;
            this.PARITY1 = 0x00000001;
            this.PARITY2 = 0x00000000;
            this.PARITY3 = 0x00000000;
            this.PARITY4 = 0x20000000;
        }
        else if (mexp == 2281)
        {
            this.POS1 = 12;
            this.SL1 = 19;
            this.SL2 = 1;
            this.SR1 = 5;
            this.SR2 = 1;
            this.MSK1 = 0xbff7ffbf;
            this.MSK2 = 0xfdfffffe;
            this.MSK3 = 0xf7ffef7f;
            this.MSK4 = 0xf2f7cbbf;
            this.PARITY1 = 0x00000001;
            this.PARITY2 = 0x00000000;
            this.PARITY3 = 0x00000000;
            this.PARITY4 = 0x41dfa600;
        }
        else if (mexp == 4253)
        {
            this.POS1 = 17;
            this.SL1 = 20;
            this.SL2 = 1;
            this.SR1 = 7;
            this.SR2 = 1;
            this.MSK1 = 0x9f7bffff;
            this.MSK2 = 0x9fffff5f;
            this.MSK3 = 0x3efffffb;
            this.MSK4 = 0xfffff7bb;
            this.PARITY1 = 0xa8000001;
            this.PARITY2 = 0xaf5390a3;
            this.PARITY3 = 0xb740b3f8;
            this.PARITY4 = 0x6c11486d;
        }
        else if (mexp == 11213)
        {
            this.POS1 = 68;
            this.SL1 = 14;
            this.SL2 = 3;
            this.SR1 = 7;
            this.SR2 = 3;
            this.MSK1 = 0xeffff7fb;
            this.MSK2 = 0xffffffef;
            this.MSK3 = 0xdfdfbfff;
            this.MSK4 = 0x7fffdbfd;
            this.PARITY1 = 0x00000001;
            this.PARITY2 = 0x00000000;
            this.PARITY3 = 0xe8148000;
            this.PARITY4 = 0xd0c7afa3;
        }
        else if (mexp == 19937)
        {
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
        }
        else if (mexp == 44497)
        {
            this.POS1 = 330;
            this.SL1 = 5;
            this.SL2 = 3;
            this.SR1 = 9;
            this.SR2 = 3;
            this.MSK1 = 0xeffffffb;
            this.MSK2 = 0xdfbebfff;
            this.MSK3 = 0xbfbf7bef;
            this.MSK4 = 0x9ffd7bff;
            this.PARITY1 = 0x00000001;
            this.PARITY2 = 0x00000000;
            this.PARITY3 = 0xa3ac4000;
            this.PARITY4 = 0xecc1327a;
        }
        else if (mexp == 86243)
        {
            this.POS1 = 366;
            this.SL1 = 6;
            this.SL2 = 7;
            this.SR1 = 19;
            this.SR2 = 1;
            this.MSK1 = 0xfdbffbff;
            this.MSK2 = 0xbff7ff3f;
            this.MSK3 = 0xfd77efff;
            this.MSK4 = 0xbf9ff3ff;
            this.PARITY1 = 0x00000001;
            this.PARITY2 = 0x00000000;
            this.PARITY3 = 0x00000000;
            this.PARITY4 = 0xe9528d85;
        }
        else if (mexp == 132049)
        {
            this.POS1 = 110;
            this.SL1 = 19;
            this.SL2 = 1;
            this.SR1 = 21;
            this.SR2 = 1;
            this.MSK1 = 0xffffbb5f;
            this.MSK2 = 0xfb6ebf95;
            this.MSK3 = 0xfffefffa;
            this.MSK4 = 0xcff77fff;
            this.PARITY1 = 0x00000001;
            this.PARITY2 = 0x00000000;
            this.PARITY3 = 0xcb520000;
            this.PARITY4 = 0xc7e91c7d;
        }
        else if (mexp == 216091)
        {
            this.POS1 = 627;
            this.SL1 = 11;
            this.SL2 = 3;
            this.SR1 = 10;
            this.SR2 = 1;
            this.MSK1 = 0xbff7bff7;
            this.MSK2 = 0xbfffffff;
            this.MSK3 = 0xbffffa7f;
            this.MSK4 = 0xffddfbfb;
            this.PARITY1 = 0xf8000001;
            this.PARITY2 = 0x89e80709;
            this.PARITY3 = 0x3bd2b64b;
            this.PARITY4 = 0x0c64b1e4;
        }
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
        this.N = this.MEXP / 128 + 1;
        this.SL2_x8 = this.SL2 * 8;
        this.SR2_x8 = this.SR2 * 8;
        this.SL2_ix8 = 64 - this.SL2 * 8;
        this.SR2_ix8 = 64 - this.SR2 * 8;
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

        const cMEXP: number = 19937;
        const cPOS1: number = 122;
        const cMSK1: number = 0xdfffffef;
        const cMSK2: number = 0xddfecb7f;
        const cMSK3: number = 0xbffaffff;
        const cMSK4: number = 0xbffffff6;
        const cSL1: number = 18;
        const cSR1: number = 11;
        const cN: number = cMEXP / 128 + 1;
        const cN32: number = cN * 4;

        a = 0;
        b = cPOS1 * 4;
        c = (cN - 2) * 4;
        d = (cN - 1) * 4;
        do
        {
            this.sfmt[a + 3] = this.sfmt[a + 3] ^ (this.sfmt[a + 3] << 8) ^ (this.sfmt[a + 2] >> 24) ^ (this.sfmt[c + 3] >> 8) ^ ((this.sfmt[b + 3] >> cSR1) & cMSK4) ^ (this.sfmt[d + 3] << cSL1);
            this.sfmt[a + 2] = this.sfmt[a + 2] ^ (this.sfmt[a + 2] << 8) ^ (this.sfmt[a + 1] >> 24) ^ (this.sfmt[c + 3] << 24) ^ (this.sfmt[c + 2] >> 8) ^ ((this.sfmt[b + 2] >> cSR1) & cMSK3) ^ (this.sfmt[d + 2] << cSL1);
            this.sfmt[a + 1] = this.sfmt[a + 1] ^ (this.sfmt[a + 1] << 8) ^ (this.sfmt[a + 0] >> 24) ^ (this.sfmt[c + 2] << 24) ^ (this.sfmt[c + 1] >> 8) ^ ((this.sfmt[b + 1] >> cSR1) & cMSK2) ^ (this.sfmt[d + 1] << cSL1);
            this.sfmt[a + 0] = this.sfmt[a + 0] ^ (this.sfmt[a + 0] << 8) ^ (this.sfmt[c + 1] << 24) ^ (this.sfmt[c + 0] >> 8) ^ ((this.sfmt[b + 0] >> cSR1) & cMSK1) ^ (this.sfmt[d + 0] << cSL1);
            c = d;
            d = a;
            a += 4;
            b += 4;
            if (b >= cN32)
                b = 0; 
        } while (a < cN32);
    }
}
