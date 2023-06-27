import { Token } from '../api/types';

export function apiHasToken(response: any): response is Token {
    return response && response.token;
}
