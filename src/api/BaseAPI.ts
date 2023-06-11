import { HttpTransport } from "../core/HttpTransport";

export default class BaseAPI {
    protected httpTransport: HttpTransport;

    protected constructor(endpoint: string) {
        this.httpTransport = new HttpTransport(endpoint);
    }
}
