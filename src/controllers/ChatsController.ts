import chatsAPI, { ChatsAPI, CreateChatData, GetChatsData } from '../api/ChatsAPI';
import { apiHasError } from "../utils/apiHasError";
import { transformChats } from "../utils/apiTransformers";
import { store } from '../store';
// import { router } from '../router';
import { ChatsDTO } from '../api/types';
import { apiHasToken } from '../utils/apiHasToken';

class ChatsController {
    private api: ChatsAPI;

    constructor() {
        this.api = chatsAPI;
    }

    async getAll(payload: GetChatsData) {
        try {
            const response = await this.api.getAll(payload);
            if (apiHasError(response)) {
                store.dispatch({ chatsError: response.reason });
                console.error(response.reason);
                return;
            }
            store.dispatch({
                chatsError: null,
                chats: transformChats(response as ChatsDTO),
            });
        } catch (e) {
            console.error(e);
        }
    }

    async create(payload: CreateChatData) {
        try {
            const response = await this.api.create(payload);
            if (apiHasError(response)) {
                store.dispatch({ chatsError: response.reason });
                return;
            }
            store.dispatch({ chatsError: null });
        } catch (e) {
            console.error(e);
        }
    }

    async token(id: number) {
        try {
            const response = this.api.token(id);
            if (apiHasError(response)) {
                console.error(response.reason);
                return;
            }
            return response;
        } catch (e) {
            console.error(e);
        }
    }

    async activateChat(id: number) {
        const currentActiveChat = store.getState().activeChat;

        if (currentActiveChat && currentActiveChat !== id) {
            //  закрываем соединение с текущим чатом
            console.log(`close connection for chat ${currentActiveChat}`);
        }
        store.dispatch({ activeChat: id });

        const response = await this.token(id);
        if (apiHasToken(response)) {
            // тут коннектимся к чату
            console.log(`create connection for chat ${id} with token:${response.token}`);
        }

    }

}

export default new ChatsController();
