import chatsAPI, { ChatsAPI, GetChatsData } from '../api/ChatsAPI';
import { apiHasError } from "../utils/apiHasError";
import { transformChats } from "../utils/apiTransformers";
import { store } from '../store';
// import { router } from '../router';
import { ChatsDTO } from '../api/types';

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

}

export default new ChatsController();
