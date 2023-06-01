export const queryStringify = (data: any): string => {
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index > 0 ? '&' : ''}`, '?');
};

export const deepEqual = function (x: any, y: any): boolean {
    if (x === y) {
        return true;
    }
    else if ((typeof x == 'object' && x != null) && (typeof y == 'object' && y != null)) {
        if (Object.keys(x).length != Object.keys(y).length) {
            return false;
        }

        for (const prop in x) {
            if (y.hasOwnProperty(prop)) {
                if (!deepEqual(x[prop], y[prop]))
                return false;
            }
            else {
                return false;
            }
        }

        return true;
    }
    else {
        return false;
    }
}
