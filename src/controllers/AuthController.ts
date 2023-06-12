import API, {AuthAPI, SigninData, SignupData} from '../api/AuthAPI';
import store from '../core/Store';
import router from '../core/Router';

export class AuthController {
    private readonly api: AuthAPI;

    constructor() {
        this.api = API;
    }

    async signin(data: SigninData) {
        try {
            await this.api.signin(data);
            router.go('/settings');
        } catch (e: any) {
            console.log('signin catch:')
            console.log(e);                 // {reason: 'Login or password is incorrect'}
        }
    }

    async signup(data: SignupData) {
        try {
            await this.api.signup(data);
            await this.fetchUser();
            router.go('/settings');
        } catch (e: any) {
            console.log('signup catch:')
            console.error(e);
        }
    }

    async fetchUser() {
        try{
            const user = await this.api.fetchUser();
            // const message = 'fetchUser'
            // console.log({message, user});
            store.set('user', user);
            // console.log(store);
        } catch (e: any) {
            console.log('fetchUser catch:')
            console.error(e);       // {reason: 'Cookie is not valid'}
        }

    }

    async logout() {
        try {
            await this.api.logout();
            router.go('/');
        } catch (e: any) {
            console.log('logout catch:')
            console.error(e);
        }
    }

}

export default new AuthController();
