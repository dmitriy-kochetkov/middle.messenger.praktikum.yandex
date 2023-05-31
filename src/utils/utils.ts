export const queryStringify = (data: any): string => {
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index > 0 ? '&' : ''}`, '?');
};
