export interface Result {
    seed: string;
    encoded_needle: string;
    step: number;
}

export interface Root {
    results: Array<Result>;
}

export function request(needle: string) {
    var root: Root;
    var url = "http://49.212.217.137:19937/gen7/sfmt/seed?needle=" + needle;

    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET", url, false);
    Httpreq.send(null);
    root = JSON.parse(Httpreq.responseText);
    return root;
}