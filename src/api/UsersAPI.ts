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

// export interface UserAvatar {
//     avatar: Blob,
// }

export interface userID {
    id: number
}

export interface userLogin {
    login: string
}

export class UsersAPI extends BaseAPI {
    constructor() {
        super('/user');
    }

    updateUser(data: UserData): Promise<unknown> {
        return this.httpTransport.put('/profile', {data});
    }

    updatePassword(data: UserPassword): Promise<unknown> {
        return this.httpTransport.put('/password', {data});
    }

    updateAvatar(data: FormData): Promise<unknown> {
        return this.httpTransport.put('/profile/avatar', {data});
    }

    getUser(data: userID) {
        // XSS: need to check that data.id is a number?
        return this.httpTransport.get(`/${data.id}`);
    }

    searchUsers(data: userLogin) {
        return this.httpTransport.post('/search', {data});
    }
}

export default new UsersAPI();
