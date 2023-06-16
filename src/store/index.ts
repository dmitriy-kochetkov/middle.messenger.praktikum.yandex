import { Store } from '../core/Store';
import { User } from '../utils/apiTransformers';

export interface AppState {
    loginFormError: string | null;
    user: User | null;
    appIsInited: boolean;
}

export const defaultState: AppState = {
    loginFormError: null,
    user: null,
    appIsInited: false,
  };

 export const store = new Store<AppState>(defaultState);
