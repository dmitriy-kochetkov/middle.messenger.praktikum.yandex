type Indexed<T = unknown> = {
    [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    // eslint-disable-next-line no-restricted-syntax
    for (const p in rhs) {
        // eslint-disable-next-line no-prototype-builtins
        if (!rhs.hasOwnProperty(p)) {
            // eslint-disable-next-line no-continue
            continue;
        }

        try {
            if (typeof (rhs[p]) === 'object') {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e: any) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be a string');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as Indexed);

    return merge(object as Indexed, result);
}
