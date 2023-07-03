export type TPlainObject<T = any> = {
    [k in string]: T;
};

export const isPlainObject = (value: unknown): value is TPlainObject => {
    const isPlain = typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';

    return isPlain;
};
