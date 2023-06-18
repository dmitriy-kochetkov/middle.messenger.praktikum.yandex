import { Store } from '../core/Store';
import { Chats, User } from '../utils/apiTransformers';

export interface AppState {
    authError: string | null;
    profileError: string | null;
    chatsError: string | null;
    user: User | null;
    chats: Chats;
    appIsInited: boolean;
}

export const defaultState: AppState = {
    authError: null,
    profileError: null,
    chatsError: null,
    user: null,
    chats: [],
    appIsInited: false,
  };

 export const store = new Store<AppState>(defaultState);
