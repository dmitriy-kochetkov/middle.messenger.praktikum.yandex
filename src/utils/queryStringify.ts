export const queryStringify = (data: any): string => {
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index > 0 ? '&' : ''}`;
    }, '?');
};
