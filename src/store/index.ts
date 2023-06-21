import { Store } from '../core/Store';
import { Chats, Message, User } from '../utils/apiTransformers';

export interface AppState {
    authError: string | null;
    profileError: string | null;
    chatsError: string | null;
    user: User | null;
    chats: Chats;
    activeChat: number | null;
    messages: Record<number, Message[]>
    appIsInited: boolean;
}

export const defaultState: AppState = {
    authError: null,
    profileError: null,
    chatsError: null,
    user: null,
    chats: [],
    activeChat: null,
    messages: {},
    appIsInited: false,
  };

 export const store = new Store<AppState>(defaultState);
