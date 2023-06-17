import authAPI from '../api/AuthAPI';
import { Dispatch } from '../core/Store';
import { AppState } from '../store';
import { hasError as apiHasError } from '../utils/apiHasError';
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
        dispatch({ loginFormError: null });
    } catch (e) {
        if (apiHasError(e)) {
            dispatch({ loginFormError: e.reason });
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
        dispatch({ signupFormError: null });
    } catch (e) {
        if (apiHasError(e)) {
            dispatch({ signupFormError: e.reason });
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


// export class AuthController {
//     private readonly api: AuthAPI;

//     constructor() {
//         this.api = API;
//     }

//     async signin(data: SigninData) {
//         try {
//             await this.api.signin(data);
//             router.go('/settings');
//         } catch (e: any) {
//             console.log('signin catch:')
//             console.log(e);                 // {reason: 'Login or password is incorrect'}
//         }
//     }

//     async signup(data: SignupData) {
//         try {
//             await this.api.signup(data);
//             await this.fetchUser();
//             router.go('/settings');
//         } catch (e: any) {
//             console.log('signup catch:')
//             console.error(e);
//         }
//     }

//     async fetchUser() {
//         try{
//             const user = await this.api.fetchUser();
//             // const message = 'fetchUser'
//             // console.log({message, user});
//             store.set('user', user);
//             // console.log(store);
//         } catch (e: any) {
//             console.log('fetchUser catch:')
//             console.error(e);       // {reason: 'Cookie is not valid'}
//         }

//     }

//     async logout() {
//         try {
//             await this.api.logout();
//             router.go('/');
//         } catch (e: any) {
//             console.log('logout catch:')
//             console.error(e);
//         }
//     }

// }

// export default new AuthController();
