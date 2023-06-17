import { Dispatch } from "../core/Store";
import { AppState } from "../store";
import { hasError as apiHasError } from '../utils/apiHasError';
import chatsAPI from '../api/ChatsAPI';
import { transformChats } from "../utils/apiTransformers";
import { ChatDTO } from "../api/types";


export const getChatsAction = async (dispatch: Dispatch<AppState>) => {
    try {
        const responseUser = await chatsAPI.getChats();
        dispatch({ chats: transformChats(responseUser as ChatDTO[]) })
        dispatch({ loadingChatsError: null });
    } catch (e) {
        if (apiHasError(e)) {
            dispatch({ loadingChatsError: e.reason });
        }
        return;
    }
}

