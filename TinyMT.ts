import { TinyMTParameter } from "./TinyMTParameter";
import bigInt = require("big-integer");

const TINYMT32_MASK: number = 0x7FFFFFFF;
const TINYMT32_SH0: number = 1;
const TINYMT32_SH1: number = 10;
const TINYMT32_SH8: number = 8;

export default class TinyMT
{
    public status: Array<number>;
    readonly param: TinyMTParameter;

    constructor(status: Array<number>, param: TinyMTParameter)
    {
        this.status = new Array(4);
        for (var i = 0; i < 4; i++)
            this.status[i] = status[i];
        this.param = param;
    }

    nextState()
    {
        var y: number = this.status[3];
        var x: number = bigInt(this.status[0]).and(TINYMT32_MASK).xor(this.status[1]).xor(this.status[2]);
        x = bigInt(x).xor(bigInt(x).shiftLeft(TINYMT32_SH0));
        y = bigInt(y).xor(bigInt(y).shiftRight(TINYMT32_SH0)).xor(x);
        this.status[0] = this.status[1];
        this.status[1] = this.status[2];
        this.status[2] = bigInt(y).shiftLeft(TINYMT32_SH1).xor(x);
        this.status[3] = y;

        if (bigInt(y).and(1) == 1)
        {
            this.status[1] = bigInt(this.status[1]).xor(this.param.mat1);
            this.status[2] = bigInt(this.status[2]).xor(this.param.mat2);
        }
    }

    temper()
    {
        var t0: number = this.status[3];
        var t1: number = this.status[0] + (this.status[2] >> TINYMT32_SH8);
        t0 = bigInt(t0).xor(t1);
        if ((t1 & 1) == 1)
            t0 ^= bigInt(t0).xor(this.param.tmat);
        return t0;
    }
}