import { Store } from '../core/Store';
import { Chat, User } from '../utils/apiTransformers';

export interface AppState {
    loginFormError: string | null;
    signupFormError: string | null;
    updateUserFormError: string | null;
    updateUserPasswordFormError: string | null;
    updateUserAvatarError: string | null;
    loadingChatsError: string | null;
    user: User | null;
    chats: Chat[] | null;
    appIsInited: boolean;
}

export const defaultState: AppState = {
    loginFormError: null,
    signupFormError: null,
    updateUserFormError: null,
    updateUserPasswordFormError: null,
    updateUserAvatarError: null,
    loadingChatsError: null,
    user: null,
    chats: null,
    appIsInited: false,
  };

 export const store = new Store<AppState>(defaultState);
