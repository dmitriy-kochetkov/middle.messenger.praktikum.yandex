import BaseAPI from './BaseAPI';

export interface SigninData {
    login: string,
    password: string,
}

export interface SignupData {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string,
}

export interface User {
    id: number,
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string,
    avatar: string,
}

export class AuthAPI extends BaseAPI {
    constructor() {
        super('/auth');
    }

    signup(data: SignupData) {
        return this.http.post('/signup', { data, headers: this.defaultHeaders });
    }

    signin(data: SigninData) {
        return this.http.post('/signin', { data, headers: this.defaultHeaders });
    }

    fetchUser(): Promise<unknown> {
        return this.http.get('/user');
    }

    logout() {
        return this.http.post('/logout');
    }
}

export default new AuthAPI();
