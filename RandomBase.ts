import bigInt = require("big-integer");

export abstract class RandomBase {
    public abstract UInt32(): number;

    public NextUInt32(): number {
        return this.UInt32();
    }

    public UInt64(): number {
        return bigInt(this.NextUInt32()).or(bigInt(this.NextUInt32()).leftShift(32));
    }

    public Int64(): number {
        return bigInt(this.NextUInt32()).leftShift(32).or(bigInt(this.NextUInt32()));
    }

    public NextByte(buffer: Uint8Array): void {
        var i: number = 0;
        var r: number;

        while (i + 4 <= buffer.length) {
            r = this.NextUInt32();
            buffer[i++] = bigInt(r).and(0xFF);
            buffer[i++] = bigInt(r).rightShift(8).and(0xFF);
            buffer[i++] = bigInt(r).rightShift(16).and(0xFF);
            buffer[i++] = bigInt(r).rightShift(24).and(0xFF);
        }

        if (i >= buffer.length) return;
        r = this.NextUInt32();
        buffer[i++] = bigInt(r).and(0xFF);
        if (i >= buffer.length) return;
        buffer[i++] = bigInt(r).rightShift(8).and(0xFF);
        if (i >= buffer.length) return;
        buffer[i++] = bigInt(r).rightShift(16).and(0xFF);
    }

    public NextDouble() : number {
        var r1, r2: number;
        r1 = this.NextUInt32();
        r2 = this.NextUInt32();
        return (bigInt(r1).multiply(2 << 11).add(r2).divide(2 << 53));
    }

}
