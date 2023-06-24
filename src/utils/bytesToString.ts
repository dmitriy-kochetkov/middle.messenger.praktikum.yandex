export const bytesToString = (bytes: number): string => {
    const thresh = 1024;
    const dp = 1;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' байт';
    }

    const units = ['Кб', 'Мб', 'Гб', 'Тб'];

    let u = -1;
    const r = 10**dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    return bytes.toFixed(dp) + ' ' + units[u];
}
