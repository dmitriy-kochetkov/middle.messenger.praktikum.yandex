import BaseAPI from './BaseAPI';

export interface CreateChatData {
    title: string,
}

export class ChatsAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }

    getChats(): Promise<unknown> {
        return this.httpTransport.get('');
    }

    createChat(data: CreateChatData): Promise<unknown> {
        return this.httpTransport.post('', { data });
    }

    token(id: number) {
        return this.httpTransport.post(`/token/${id}`);
    }
}

export default new ChatsAPI();
