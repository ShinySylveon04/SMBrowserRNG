import bigInt = require("big-integer");
import SFMT from "./SFMT";

type UInt32 = number;
type int = number;

export class IDRNGSearch
{
    public Clock_CorrectionValue: int;

    Generate(sfmt: SFMT): IDRNGResult
    {
        var id: IDRNGResult = new IDRNGResult();

        id.row_r = sfmt.NextUInt64();

        id.Clock = (id.row_r < 17 ? id.row_r : id.row_r - 17 * (id.row_r / 17)) + this.Clock_CorrectionValue;
        if (id.Clock > 16)
            id.Clock -= 17;

        var temp: UInt32 = bigInt(id.row_r).and(0xFFFFFFFF);
        id.ID = temp < 1000000 ? temp : temp - 1000000 * (temp / 1000000);

        id.TID = temp & 0xFFFF;
        id.SID = temp >> 16;

        id.TSV = (id.TID ^ id.SID) >> 4;

        return id;
    }
}

export class IDRNGResult
{
    public Clock: int;
    public TID: UInt32;
    public SID: UInt32;
    public ID: UInt32;
    public TSV: UInt32;
    public row_r: number;
    public Shiny: boolean;
}