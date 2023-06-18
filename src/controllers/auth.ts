import authAPI from '../api/AuthAPI';
import { Dispatch } from '../core/Store';
import { AppState } from '../store';
import { apiHasError } from '../utils/apiHasError';
import { router } from '../router';
import { UserDTO } from '../api/types';
import { transformUser } from '../utils/apiTransformers';

type LoginPayload = {
    login: string,
    password: string,
  };

export const loginAction = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: LoginPayload,
) => {
    try {
        await authAPI.signin(action);
        dispatch({ authError: null });
    } catch (e) {
        if (apiHasError(e)) {
            dispatch({ authError: e.reason });
        }
        return;
    }

    try {
        const responseUser = await authAPI.fetchUser();
        dispatch({ user: transformUser(responseUser as UserDTO) });
    } catch (e) {
        dispatch(logoutAction);
        return;
    }

    router.go('/messenger');
};


export const logoutAction = async (dispatch: Dispatch<AppState>) => {
    try {
        await authAPI.logout();
        dispatch({ user: null });
    } catch (e) {
        return;
    }

    router.go('/');
};

type SigninPayload = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string,
};

export const signupAction = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: SigninPayload,
) => {
    try {
        // console.log(action);
        const responseUserID = await authAPI.signup(action);
        // console.log(responseUserID)
        dispatch({ authError: null });
    } catch (e) {
        if (apiHasError(e)) {
            dispatch({ authError: e.reason });
        }
        return;
    }

    try {
        const responseUser = await authAPI.fetchUser();
        dispatch({ user: transformUser(responseUser as UserDTO) });
    } catch (e) {
        dispatch(logoutAction);
        return;
    }

    router.go('/settings');
};

export const getUserAction = async (dispatch: Dispatch<AppState>) => {
    try {
        const responseUser = await authAPI.fetchUser();
        dispatch({ user: transformUser(responseUser as UserDTO) })
    } catch (e) {
        dispatch(logoutAction);
        return;
    }
}
