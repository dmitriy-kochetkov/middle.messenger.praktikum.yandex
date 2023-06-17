import usersAPI from '../api/UsersAPI';
import { Dispatch } from '../core/Store';
import { AppState } from '../store';
import { hasError as apiHasError } from '../utils/apiHasError';
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
}

export const updateUserAction = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: updateUserPayload,
) => {
    try {
        const responseUser = await usersAPI.updateUser(action);
        dispatch({ user: transformUser(responseUser as UserDTO) });
    } catch (e) {
        if (apiHasError(e)) {
            dispatch({ updateUserFormError: e.reason });
        }
        return;
    }

    router.go('/settings');
}

type updateUserPasswordPayload = {
    oldPassword: string,
    newPassword: string
}

export const updateUserPasswordAction = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: updateUserPasswordPayload,
) => {
    try {
        await usersAPI.updatePassword(action);
    } catch (e) {
        if (apiHasError(e)) {
            dispatch({ updateUserPasswordFormError: e.reason });
        }
        return;
    }

    router.go('/settings');
}
