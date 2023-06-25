import usersAPI, { UserData, UserLogin, UserPassword, UsersAPI } from "../api/UsersAPI";
import { apiHasError } from "../utils/apiHasError";
import { UserDTO } from "../api/types";
import { User, transformUser, transformUsers } from "../utils/apiTransformers";
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
        try {
            const response = await this.api.avatar(payload);
            if (apiHasError(response)) {
                store.dispatch({ profileError: response.reason });
                return;
            }
            store.dispatch({
                user: transformUser(response as UserDTO),
                profileError: null,
            });
            router.go('/settings');
        } catch (e) {
            console.error(e);
        }

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

    async search(payload: UserLogin) {
        try {
            const response = await this.api.search(payload);
            if (apiHasError(response)) {
                console.error(response.reason)
                return;
            }
            store.dispatch({
                users: transformUsers(response as UserDTO[]),
            });
        } catch (e) {
            console.error(e);
        }
    }

    resetUsers() {
        store.dispatch({users: []});
    }

    withoutCurrentUser() {
        const {user: currentUser, users} = store.getState();
        if (currentUser && users) {
            store.dispatch({ users: users.filter(user => user.id !== currentUser.id)});
        }
    }
}

export default new UsersController();
