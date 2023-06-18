import usersAPI from '../api/UsersAPI';
import { Dispatch } from '../core/Store';
import { AppState } from '../store';
import { apiHasError } from '../utils/apiHasError';
import { router } from '../router';
import { UserDTO } from '../api/types';
import { transformUser } from '../utils/apiTransformers';

type updateUserPayload = {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
};

export const updateUserAction = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: updateUserPayload,
) => {
    try {
        const responseUser = await usersAPI.profile(action);
        dispatch({ user: transformUser(responseUser as UserDTO) });
        dispatch({ profileError: null });

        // await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
        if (apiHasError(e)) {
            dispatch({ profileError: e.reason });
        }
        return;
    }


    router.go('/settings');
};

type updateUserPasswordPayload = {
    oldPassword: string,
    newPassword: string
};

export const updateUserPasswordAction = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: updateUserPasswordPayload,
) => {
    try {
        await usersAPI.password(action);
        dispatch({ profileError: null });
    } catch (e) {
        if (apiHasError(e)) {
            dispatch({ profileError: e.reason });
        }
        return;
    }

    router.go('/settings');
};

export const updateUserAvatarAction = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: FormData,
) => {
    try {
        const responseUser = await usersAPI.avatar(action);
        dispatch({
            user: transformUser(responseUser as UserDTO),
            profileError: null
        });
    } catch (e) {
        if (apiHasError(e)) {
            dispatch({ profileError: e.reason });
        }
        return;
    }
    router.go('/settings');
};
