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
    data?: any
};

type TOptionsWithoutMethod = Omit<TOptions, 'method'>;
type HTTPMethod = (url: string, options?: TOptionsWithoutMethod) => Promise<XMLHttpRequest>;

export class HttpTransport {
    static API_ENDPOINT = 'https://ya-praktikum.tech/api/v2';

    protected path: string;

    constructor(endpoint: string) {
        this.path = `${HttpTransport.API_ENDPOINT}${endpoint}`;
    }

    public get: HTTPMethod = (url, options = {}) => this
        .request(
            this.path + url,
            { ...options, method: METHODS.GET },
        );

    public post: HTTPMethod = (url, options = {}) => this
        .request(
            this.path + url,
            { ...options, method: METHODS.POST },
        );

    public put: HTTPMethod = (url, options = {}) => this
        .request(
            this.path + url,
            { ...options, method: METHODS.PUT },
        );

    public delete: HTTPMethod = (url, options = {}) => this
        .request(
            this.path + url,
            { ...options, method: METHODS.DELETE },
        );

    private request<T extends unknown>(
        url: string,
        options: TOptions = { method: METHODS.GET },
    ): Promise<T> {
        const { headers, method, data, timeout } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject(new Error('No method'));
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGetMethod = method === METHODS.GET;

            xhr.open(method, isGetMethod && !!data ? `${url}${queryStringify(data)}` : url);
            xhr.responseType = 'json';
            xhr.withCredentials = true;

            if (headers) {
                Object.keys(headers).forEach((key) => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            if (timeout) {
                xhr.timeout = timeout;
            }

            try {
                xhr.onload = () => resolve(xhr.response);

                xhr.onabort = () => reject;
                xhr.onerror = () => reject;
                xhr.ontimeout = () => reject;

                if (isGetMethod || !data) {
                    xhr.send();
                    // console.log('xhr.send()');
                } else if (data instanceof FormData) {
                    xhr.send(data);
                    // console.log('xhr.send(data: FormData)');
                } else {
                    xhr.send(JSON.stringify(data));
                    // console.log('xhr.send(JSON.stringify(data))');
                }
            } catch (e) {
                console.log(e);
            }
        });
    }
}
