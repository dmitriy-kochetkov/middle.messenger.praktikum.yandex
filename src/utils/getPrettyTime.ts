export const getPrettyTime = (data: string): string => {
    const date = new Date(data);
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const hoursFormatted = hours < 10 ? `0${hours}` : hours;
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
    return data && `${hoursFormatted}:${minutesFormatted}`;
};
