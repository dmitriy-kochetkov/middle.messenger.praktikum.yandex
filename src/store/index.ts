import { Store } from '../core/Store';
import { Chats, User } from '../utils/apiTransformers';

export interface AppState {
    authError: string | null;
    profileError: string | null;
    chatsError: string | null;
    user: User | null;
    chats: Chats;
    activeChat: number | null;
    appIsInited: boolean;
}

export const defaultState: AppState = {
    authError: null,
    profileError: null,
    chatsError: null,
    user: null,
    chats: [],
    activeChat: null,
    appIsInited: false,
  };

 export const store = new Store<AppState>(defaultState);
