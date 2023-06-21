import BaseAPI from './BaseAPI';

export interface GetChatsData {
    offset?: number,
    limit?: number,
    title?: number
}

export interface CreateChatData {
    title: string,
}

export class ChatsAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }

    getAll(data: GetChatsData): Promise<unknown> {
        return this.http.get('', {data, headers: this.defaultHeaders});
    }

    create(data: CreateChatData): Promise<unknown> {
        return this.http.post('', { data, headers: this.defaultHeaders });
    }

    delete(): Promise<unknown> {
        return this.http.delete('');
    }

    addUsers() {

    }

    deleteUsers() {

    }

    token(id: number) {
        return this.http.post(`/token/${id}`, { headers: this.defaultHeaders });
    }
}

export default new ChatsAPI();
