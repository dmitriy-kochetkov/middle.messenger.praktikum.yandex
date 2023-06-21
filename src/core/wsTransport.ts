import { isPlainObject } from "../utils/isPlainObject";
import { EventBus } from "./EventBus";

export const WS_BASE_URL = `wss://ya-praktikum.tech/ws/chats`;

export enum WSEvents {
    Open = "open",
    Connected = "connected",
    Message = "message",
    Error = "error",
    Close = "close",
}

export enum ServiceTypes {
    UserConnected = "user connected",
    Pong = "pong",
}

export default class wsTransport extends EventBus {
    private socket: WebSocket;
    private pingInterval: number;

    constructor(url: string) {
        super();
        this.socket = new WebSocket(url);
        this.pingInterval = 0;
    }

    private setupPing() {
        this.pingInterval = window.setInterval(() => {
            this.send({ type: 'ping' });
        }, 5000);

        this.on(WSEvents.Close, () => {
            clearInterval(this.pingInterval);
            this.pingInterval = 0;
        })
    }

    private subscribe(socket: WebSocket) {
        socket.addEventListener(WSEvents.Open, () => this.onConnected());
        socket.addEventListener(WSEvents.Message, (event) => this.onMessage(event));
        socket.addEventListener(WSEvents.Close, () => this.onClose());
        socket.addEventListener(WSEvents.Error, (event) => this.onError(event));
    }

    private onMessage(event: MessageEvent<any>) {
        try {
            const messages = JSON.parse(event.data);
            if (
                messages?.type === ServiceTypes.Pong ||
                messages?.type === ServiceTypes.UserConnected
            ) {
                return;
            }

            const data = isPlainObject(messages) ? [messages] : messages;
            this.emit(WSEvents.Message, data);
        } catch (e) {
            console.error(e);
        }
    }

    private onClose() {
        this.emit(WSEvents.Close);
    }

    private onConnected() {
        this.emit(WSEvents.Connected);
    }

    private onError(event: Event) {
        this.emit(WSEvents.Error, event);
    }

    public send(data: unknown) {
        try {
            this.socket.send(JSON.stringify(data));
        } catch (e) {
            console.error('Sending message: ', e);
        }
    }

    public connect() {
        try {
            this.subscribe(this.socket);
            this.setupPing();

        } catch (e) {
            console.error('Connecting socket: ', e);
        }
        return new Promise((resolve) => {
            this.on(WSEvents.Connected, () => {
                resolve(true);
            });
        });
    }

    public close() {
        try {

        } catch (e) {
            console.error('Closing socket: ', e);
        }
    }
}
