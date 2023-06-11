import { queryStringify } from '../utils/utils';

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
    get: HTTPMethod = (url, options = {}) => this
        .request(url, { ...options, method: METHODS.GET }, options.timeout);

    post: HTTPMethod = (url, options = {}) => this
        .request(url, { ...options, method: METHODS.POST }, options.timeout);

    put: HTTPMethod = (url, options = {}) => this
        .request(url, { ...options, method: METHODS.PUT }, options.timeout);

    delete: HTTPMethod = (url, options = {}) => this
        .request(url, { ...options, method: METHODS.DELETE }, options.timeout);

    request(
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
            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGetMethod || !data) {
                xhr.send();
            } else {
                xhr.send(data as XMLHttpRequestBodyInit);
            }
        });
    }
}
