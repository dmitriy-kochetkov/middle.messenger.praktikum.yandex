const BASE_RESOURE_URL = 'https://ya-praktikum.tech/api/v2/resources';

export const getAvatarLink = (avatarUrl: string) => {
    return avatarUrl ? `${BASE_RESOURE_URL}${avatarUrl}` : ''
}
