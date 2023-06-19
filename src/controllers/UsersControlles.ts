import usersAPI, { UserData, UserPassword, UsersAPI } from "../api/UsersAPI";
import { apiHasError } from "../utils/apiHasError";
import { UserDTO } from "../api/types";
import { transformUser } from "../utils/apiTransformers";
import { store } from '../store';
import { router } from '../router';


export class UsersController {
    private api: UsersAPI;

    constructor() {
        this.api = usersAPI;
    }

    async profile(payload: UserData) {
        try {
            const response = await this.api.profile(payload);
            if (apiHasError(response)) {
                store.dispatch({ profileError: response.reason });
                return;
            }
            store.dispatch({
                user: transformUser(response as UserDTO),
                profileError: null,
            });
            router.go('/settings')
        } catch (e) {
            console.error(e);
        }

    }

    async avatar(payload: FormData) {

    }

    async password(payload: UserPassword) {
        try {
            const response = await this.api.password(payload);
            if (apiHasError(response)) {
                store.dispatch({ profileError: response.reason });
                return;
            }
            store.dispatch({ profileError: null });
            router.go('/settings')
        } catch (e) {
            console.error(e);
        }
    }

    async user() {

    }

    async search() {

    }
}

export default new UsersController();
