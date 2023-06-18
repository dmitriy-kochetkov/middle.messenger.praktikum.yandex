import { Store } from '../core/Store';
import { Chats, User } from '../utils/apiTransformers';

export interface AppState {
    authError: string | null;
    signupFormError: string | null;
    updateUserFormError: string | null;
    updateUserPasswordFormError: string | null;
    updateUserAvatarError: string | null;
    loadingChatsError: string | null;
    user: User | null;
    chats: Chats;
    appIsInited: boolean;
}

export const defaultState: AppState = {
    authError: null,
    signupFormError: null,
    updateUserFormError: null,
    updateUserPasswordFormError: null,
    updateUserAvatarError: null,
    loadingChatsError: null,
    user: null,
    chats: [],
    appIsInited: false,
  };

 export const store = new Store<AppState>(defaultState);
