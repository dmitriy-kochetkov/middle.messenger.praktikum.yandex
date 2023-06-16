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

    private request<T extends unknown>(
        url: string,
        options: TOptions = { method: METHODS.GET },
        timeout: number = 5000,
    ): Promise<T> {
        const { headers, method, data } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGetMethod = method === METHODS.GET;

            xhr.open(method, isGetMethod && !!data ? `${url}${queryStringify(data)}` : url);
            // console.log(isGetMethod && !!data ? `${url}${queryStringify(data)}` : url);

            if (headers) {
                Object.keys(headers).forEach((key) => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.onload = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            // xhr.onreadystatechange = (e) => {

            //     if (xhr.readyState === XMLHttpRequest.DONE) {
            //         if (xhr.status < 400) {
            //             resolve(xhr.response);
            //         } else {
            //             reject(xhr.response);
            //         }
            //     }
            // };

            xhr.onabort = () =>  reject({reason: "abort"});
            xhr.onerror = () => reject({reason: "network error"})
            xhr.ontimeout = () => reject({reason: "timeout"});
            xhr.timeout = timeout;


            xhr.responseType = "json"
            xhr.withCredentials = true;

            // const jsonData = JSON.stringify(data)
            // console.log({data, jsonData});

            if (isGetMethod || !data) {
                xhr.send();
                console.log('xhr.send()')
            } else if (data instanceof FormData) {
                xhr.send(data);
                console.log('xhr.send(data: FormData)');
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                xhr.send(JSON.stringify(data));
                console.log('xhr.send(JSON.stringify(data))')
            }
        });
    }
}
