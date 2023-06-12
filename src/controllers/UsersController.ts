import API, {UsersAPI, UserData, UserPassword, userID, userLogin} from '../api/UsersAPI';
import store from '../core/Store';
import router from '../core/Router';

export class UsersController {
    private readonly api: UsersAPI;

    constructor() {
        this.api = API;
    }

    async updateUser(data: UserData) {
        try {
            const user = await this.api.updateUser(data);
            store.set('user', user);
            router.go('/settings');
        } catch (e: any) {
            console.log('updateUser catch:')
            console.log(e);                 // {reason: 'error string'}
        }
    }

    async updatePassword(data: UserPassword) {
        try {
            await this.api.updatePassword(data);
            router.go('/settings');
        } catch (e: any) {
            console.log('updatePassword catch:')
            console.log(e);                 // {reason: 'error string'}
        }
    }

    async updateAvatar(data: FormData) {
        try {
            const user = await this.api.updateAvatar(data);
            store.set('user', user);
        } catch (e: any) {
            console.log('updateAvatar catch:')
            console.log(e);                 // {reason: 'error string'}
        }
    }

    async getUser(data: userID) {
        try {
            await this.api.getUser(data);
        } catch (e: any) {
            console.log('getUser catch:')
            console.log(e);                 // {reason: 'error string'}
        }
    }

    async searchUsers(data: userLogin) {
        try {
            await this.api.searchUsers(data);
        } catch (e: any) {
            console.log('getUser catch:')
            console.log(e);                 // {reason: 'error string'}
        }
    }
}

export default new UsersController();
