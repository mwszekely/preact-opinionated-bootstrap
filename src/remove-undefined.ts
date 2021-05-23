

export function removeUndefinedFromObject<T>(obj: T): T {
    let ret = {} as any;
    for (let k in obj) {
        if (obj[k] !== undefined) {
            ret[k] = obj[k];
        }
    }
    return ret;
}
