export class Result {
    public seed: string;
    public encoded_needle: string;
    public step: number;
}

export class Root {
    public results: Array<Result>;
}

export function request(needle: string) {
    var root: Root;
    var url = "http://49.212.217.137:19937/gen7/sfmt/seed?needle=" + needle;

    var jsonStr: string;

    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET", url, false);
    Httpreq.send(null);
    jsonStr = JSON.parse(Httpreq.responseText);

}