import { HttpTransport } from "../core/HttpTransport";

export default abstract class BaseAPI {
    protected http: HttpTransport;

    protected constructor(endpoint: string) {
        this.http = new HttpTransport(endpoint);
    }

    // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
    public abstract create?(data: unknown): Promise<unknown>;

    public abstract request?(identifier?: string | number): Promise<unknown>;

    public abstract update?(identifier: string | number, data: unknown): Promise<unknown>;

    public abstract delete?(identifier: string | number): Promise<unknown>;
}
