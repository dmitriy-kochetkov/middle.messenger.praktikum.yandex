import { queryStringify } from '../utils/queryStringify';

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export type TOptions = {
    method: string,
    timeout?: number,
    headers?: Record<string, string>,
    data?: unknown
};

type TOptionsWithoutMethod = Omit<TOptions, 'method'>;
type HTTPMethod = (url: string, options?: TOptionsWithoutMethod) => Promise<XMLHttpRequest>;

export class HttpTransport {
    static API_ENDPOINT = "https://ya-praktikum.tech/api/v2"
    protected path: string;

    constructor(endpoint: string) {
        this.path = `${HttpTransport.API_ENDPOINT}${endpoint}`
    }

    public get: HTTPMethod = (url, options = {}) => this
        .request(
            this.path + url,
            { ...options, method: METHODS.GET },
            options.timeout
        );

    public post: HTTPMethod = (url, options = {}) => this
        .request(
            this.path + url,
            { ...options, method: METHODS.POST },
            options.timeout
        );

    public put: HTTPMethod = (url, options = {}) => this
        .request(
            this.path + url,
            { ...options, method: METHODS.PUT },
            options.timeout
        );

    public delete: HTTPMethod = (url, options = {}) => this
        .request(
            this.path + url,
            { ...options, method: METHODS.DELETE },
            options.timeout
        );

    private request(
        url: string,
        options: TOptions = { method: METHODS.GET },
        timeout = 5000,
    ): Promise<XMLHttpRequest> {
        const { headers, method, data } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject();
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGetMethod = method === METHODS.GET;

            xhr.open(method, isGetMethod && !!data ? `${url}${queryStringify(data)}` : url);

            if (headers) {
                Object.keys(headers).forEach((key) => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            xhr.timeout = timeout;

            // xhr.responseType = "json"
            // xhr.withCredentials = true;

            if (isGetMethod || !data) {
                xhr.send();
            } else if ((data instanceof FormData)) {
                xhr.send(data);
            } else {
                xhr.send(data as XMLHttpRequestBodyInit);
            }
        });
    }
}
