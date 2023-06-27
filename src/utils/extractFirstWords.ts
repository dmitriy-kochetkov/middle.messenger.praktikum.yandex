export const extractFirstWords = (str: string, maxLen: number = 42) => {
    if (str) {
        let result = str.trim();
        result = str.length > maxLen ? `${str.slice(0, maxLen)}...` : str;
        return result;
    }
    return '';
};
