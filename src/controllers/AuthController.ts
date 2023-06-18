import authAPI, { AuthAPI } from '../api/AuthAPI';
import { apiHasError } from '../utils/apiHasError';
import { UserDTO } from "../api/types";
import { transformUser } from "../utils/apiTransformers";
import { store } from '../store';
import { router } from '../router';

type LoginPayload = {
    login: string,
    password: string,
};

type SignupPayload = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string,
};

export class AuthController {
    private api: AuthAPI;

    constructor() {
        this.api = authAPI;
    }

    async signin(payload: LoginPayload) {
        try {
            const response = await this.api.signin(payload);

            if (apiHasError(response)) {
                store.dispatch({ authError: response.reason });
                return;
            }

            store.dispatch({ authError: null });
            return response;
        } catch (e) {
            console.error(e);
        }
    }

    async signup(payload: SignupPayload) {
        try {
            const response = await this.api.signup(payload);

            if (apiHasError(response)) {
                store.dispatch({ authError: response.reason })
                return;
            }

            store.dispatch({ authError: null });
        } catch (e) {
            console.error(e);
        }
    }

    async logout() {
        try {
            await this.api.logout();
            store.dispatch({ user: null });
            router.go('/');
        } catch (e) {
            console.error(e);
        }
    }

    async user() {
        try {
            const response = await this.api.fetchUser();
            if (apiHasError(response)) {
                // store.dispatch({ authError: response.reason });
                // router.go('/');
                return;
            }
            store.dispatch({
                user: transformUser(response as UserDTO),
                authError: null,
            });
            // return response;
            router.go('/messenger')
        } catch (e) {
            console.error(e);
        }
    }
}

export default new AuthController();
