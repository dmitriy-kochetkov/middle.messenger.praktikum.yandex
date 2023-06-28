const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сенятября", "октября", "ноября", "декабря"
];

export const getPrettyTime = (data: string): string => {
    const date = new Date(data);
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const hoursFormatted = hours < 10 ? `0${hours}` : hours;
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
    return data && `${hoursFormatted}:${minutesFormatted}`;
};

export const getPrettyDate = (data: string): string => {
    const d = new Date(data);
    return data && `${d.getDate()} ${monthNames[d.getMonth()]}`;
};

export const isDifferentDays = (firstDate: string, secondDate: string): boolean => {
    const date1 = new Date(firstDate);
    if (!date1) {
        return true;
    }

    const date2 = new Date(secondDate);
    if (!date2) {
        return true;
    }

    return date1.getDate() !== date2.getDate()
        || date1.getMonth() !== date2.getMonth()
        || date1.getFullYear() !== date2.getFullYear();
}
