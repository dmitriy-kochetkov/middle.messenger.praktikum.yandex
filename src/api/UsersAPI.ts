import BaseAPI from './BaseAPI';

export interface UserData {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
}

export interface UserPassword {
    oldPassword: string,
    newPassword: string
}

export interface UserID {
    id: number
}

export interface UserLogin {
    login: string
}

export class UsersAPI extends BaseAPI {
    constructor() {
        super('/user');
    }

    profile(data: UserData): Promise<unknown> {
        return this.http.put('/profile', { data, headers: this.defaultHeaders });
    }

    password(data: UserPassword): Promise<unknown> {
        return this.http.put('/password', { data, headers: this.defaultHeaders });
    }

    avatar(data: FormData): Promise<unknown> {
        return this.http.put('/profile/avatar', { data, headers: this.uploadFileHeaders });
    }

    getUser(id: number) {
        return this.http.get(`/${id}`, { headers: this.defaultHeaders });
    }

    search(data: UserLogin): Promise<unknown> {
        return this.http.post('/search', { data, headers: this.defaultHeaders });
    }
}

export default new UsersAPI();
