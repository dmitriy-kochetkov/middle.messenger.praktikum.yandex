import BaseAPI from './BaseAPI';

export interface CreateChatData {
    title: string,
}

export class ChatsAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }

    getChats(): Promise<unknown> {
        return this.http.get('');
    }

    createChat(data: CreateChatData): Promise<unknown> {
        return this.http.post('', { data, headers: this.defaultHeaders });
    }

    token(id: number) {
        return this.http.post(`/token/${id}`);
    }
}

export default new ChatsAPI();
