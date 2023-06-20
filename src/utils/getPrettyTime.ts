export const getPrettyTime = (data: string): string => {
    const date = new Date(data);
    const minutes = date.getMinutes();
    const hours = date.getHours();
    return data && `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}

