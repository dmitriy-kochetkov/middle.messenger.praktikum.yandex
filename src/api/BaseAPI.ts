import { HttpTransport } from '../core/HttpTransport/HttpTransport';

export default class BaseAPI {
    protected http: HttpTransport;

    protected defaultHeaders = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };

    protected uploadFileHeaders = {
        Accept: 'application/json',
    };

    protected constructor(endpoint: string) {
        this.http = new HttpTransport(endpoint);
    }
}
