import BaseAPI from './BaseAPI';

export interface GetChatsData {
    offset?: number,
    limit?: number,
    title?: number
}

export interface CreateChatData {
    title: string,
}

export interface ActionUsersData {
    users: number[],
    chatId: number,
}

export interface GetChatUsersData {
    offset?: number,
    limit?: number,
    name?: string,
    email?: string,
}

export class ChatsAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }

    getAll(data: GetChatsData): Promise<unknown> {
        return this.http.get('', { data, headers: this.defaultHeaders });
    }

    create(data: CreateChatData): Promise<unknown> {
        return this.http.post('', { data, headers: this.defaultHeaders });
    }

    delete(): Promise<unknown> {
        return this.http.delete('/users');
    }

    addUsers(data: ActionUsersData): Promise<unknown> {
        return this.http.put('/users', { data, headers: this.defaultHeaders });
    }

    getChatUsers(id: number, data: GetChatUsersData): Promise<unknown> {
        return this.http.get(`/${id}/users`, { data, headers: this.defaultHeaders });
    }

    deleteUsers(data: ActionUsersData): Promise<unknown> {
        return this.http.delete('/users', { data, headers: this.defaultHeaders });
    }

    token(id: number) {
        return this.http.post(`/token/${id}`, { headers: this.defaultHeaders });
    }
}

export default new ChatsAPI();
