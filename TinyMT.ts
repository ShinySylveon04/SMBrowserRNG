import { TinyMTParameter } from "./TinyMTParameter";

const TINYMT32_MASK: number = 0x7FFFFFFF;
const TINYMT32_SH0: number = 1;
const TINYMT32_SH1: number = 10;
const TINYMT32_SH8: number = 8;

export default class TinyMT
{
    public status: Uint32Array;
    readonly param: TinyMTParameter;

    constructor(status: Uint32Array, param: TinyMTParameter)
    {
        this.status = new Uint32Array(4);
        for (var i = 0; i < 4; i++)
            this.status[i] = status[i];
        this.param = param;
    }

    nexState()
    {
        var y = this.status[3];
        var x = (this.status[0] & TINYMT32_MASK) ^ this.status[1] ^ this.status[2];
        this.status[0] = this.status[1];
        this.status[1] = this.status[2];
        this.status[2] = x ^ (y << TINYMT32_SH1);
        this.status[3] = y;

        if ((y & 1) == 1)
        {
            this.status[1] ^= this.param.mat1;
            this.status[2] ^= this.param.mat2;
        }
    }

    temper()
    {
        var t0 = this.status[3];
        var t1 = this.status[0] + (this.status[2] >> TINYMT32_SH8);

        t0 ^= t1;
        if ((t1 & 1) == 1)
            t0 ^= this.param.tmat;
        return t0;
    }
}