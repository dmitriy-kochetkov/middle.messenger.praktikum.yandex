import { HttpTransport } from "../core/HttpTransport";

export default class BaseAPI {
    protected httpTransport: HttpTransport;

    protected defaultHeaders = {
        "Content-Type": "application/json",
        "Accept": "application/json",
      };

      protected uploadFileHeaders = {
        "Accept": "application/json",
      };

    protected constructor(endpoint: string) {
        this.httpTransport = new HttpTransport(endpoint);
    }
}
