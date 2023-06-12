import BaseAPI from './BaseAPI';

export interface SigninData {
    login: string;
    password: string;
}

export interface SignupData {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export interface User {
    id: number;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
}

export class AuthAPI extends BaseAPI {
    constructor() {
        super('/auth');
    }

    signup(data: SignupData) {
        return this.httpTransport.post('/signup', {data});
    }

    signin(data: SigninData) {
        return this.httpTransport.post('/signin', {data});
    }

    fetchUser(): Promise<unknown> {
        return this.httpTransport.get('/user');
    }

    logout() {
        return this.httpTransport.post('/logout');
    }
}

export default new AuthAPI();
