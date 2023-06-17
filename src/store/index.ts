import { Store } from '../core/Store';
import { User } from '../utils/apiTransformers';

export interface AppState {
    loginFormError: string | null;
    signupFormError: string | null;
    updateUserFormError: string | null;
    updateUserPasswordFormError: string | null;
    user: User | null;
    appIsInited: boolean;
}

export const defaultState: AppState = {
    loginFormError: null,
    signupFormError: null,
    updateUserFormError: null,
    updateUserPasswordFormError: null,
    user: null,
    appIsInited: false,
  };

 export const store = new Store<AppState>(defaultState);
