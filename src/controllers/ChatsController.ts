import chatsAPI, { ActionUsersData, ChatsAPI, CreateChatData, GetChatUsersData, GetChatsData } from '../api/ChatsAPI';
import { apiHasError } from "../utils/apiHasError";
import { Chat, transformChats, transformUsers } from "../utils/apiTransformers";
import { store } from '../store';
import { ChatsDTO, UserDTO } from '../api/types';
import { apiHasToken } from '../utils/apiHasToken';
import MessageController from './MessageController';

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

    async delete() {

    }

    async addUsers(payload: ActionUsersData) {
        try {
            const response = await this.api.addUsers(payload);
            if (apiHasError(response)) {
                console.error(response.reason);
                return;
            }
        } catch (e) {
            console.error(e);
        }
    }

    async getChatUsers(id: number, payload: GetChatUsersData) {
        try {
            let ready = false;
            let result = [];
            let {limit, offset} = payload;

            limit = limit || 100;
            offset = offset || 0;

            while (!ready) {
                const response = await this.api.getChatUsers(id, { offset, limit, ...payload});
                if (apiHasError(response)) {
                    console.error(response.reason);
                    return;
                }
                const users = transformUsers(response as UserDTO[]);
                result.push(...users)
                offset += limit;

                if (users.length < limit) {
                    ready = true;
                }
            }

            // уберем из users текущего пользователя
            const currentUser = store.getState().user;
            if (currentUser && result) {
                result = result.filter(user => user.id !== currentUser.id);
            }

            store.dispatch({ users: result });
        } catch (e) {
            console.error(e);
        }
    }

    async deleteUsers(payload: ActionUsersData) {
        try {
            const response = await this.api.deleteUsers(payload);
            if (apiHasError(response)) {
                console.error(response.reason);
                return;
            }
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

    async activateChat(chat: Chat) {
        const currentActiveChat = store.getState().activeChat;

        if (currentActiveChat.id && currentActiveChat.id !== chat.id) {
            //  закрываем соединение с текущим чатом
            console.log(`close connection for chat ${currentActiveChat.id}`);
            MessageController.close(currentActiveChat.id);
        }
        store.dispatch({ activeChat: {
            id: chat.id,
            title: chat.title,
            avatar: chat.avatar
        } });

        const response = await this.token(chat.id);
        if (apiHasToken(response)) {
            // тут коннектимся к чату
            console.log(`create connection for chat ${chat.id} with token:${response.token}`);
            await MessageController.connect(chat.id, response.token);
        }

    }

}

export default new ChatsController();
