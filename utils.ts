export function dataCopy(copyObj: Object): Object {
    return (<any>Object).assign(copyObj, copyObj);
}