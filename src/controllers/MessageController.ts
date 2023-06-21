import wsTransport, {WS_BASE_URL, WSEvents} from "../core/wsTransport";
import { store } from "../store";
import { Message } from "../utils/apiTransformers";

class MessageController {
    private threads: Map<number, wsTransport>;

    constructor() {
        this.threads = new Map();
    }

    private subscribe(activeChat: number, ws: wsTransport) {
        ws.on(WSEvents.Message, (...event) => {
            this.onMessage(activeChat, event);
        });

        ws.on(WSEvents.Close, () => {this.onClose(activeChat)});
    }

    private onMessage(activeChat: number, data: Message | Message[]) {
        let messages: Message[] = [];

        if (Array.isArray(data)) {
            messages = data.reverse();
        } else {
            messages.push(data);
        }

        const storedMessages = store.getState().messages[activeChat];

        store.dispatch({
            messages: {
                [activeChat]: [...(storedMessages || []), ...messages] }
        });
    }

    private onClose(activeChat: number) {
        try {
            this.threads.delete(activeChat);
        } catch (e) {
            console.error(e);
        }
    }

    async connect(activeChat: number, token: string) {
        try {
            if (!this.threads.has(activeChat)) {
                return;
            }

            const userID = store.getState().user?.id;

            if (!userID) {
                throw new Error(`User not found`);
            }

            const ws = new wsTransport(`${WS_BASE_URL}/${userID}/${activeChat}/${token}`);

            await ws.connect();

            this.subscribe(activeChat, ws);
            this.threads.set(activeChat, ws);

            this.fetchOldMessages(activeChat);

        } catch (e) {
            console.error(e);
        }
    }

    async send(message: string) {
        const id = store.getState().activeChat;

        if (!id) {
            throw new Error('Chat is not connected');
        }

        const socket = this.threads.get(id);
        if (socket) {
            socket.send({
                type: 'message',
                content: message.trim(),
            });
        }
    }

    fetchOldMessages(activeChat: number) {
        const socket = this.threads.get(activeChat);

        if (!socket) {
            throw new Error(`Chat ${activeChat} is not connected`);
        }

        socket.send({ type: "get old", content: "0" });
    }

    closeAll() {
        Array.from(this.threads.values()).forEach((thread) => thread.close());
    }

    close(chatID: number) {
        const socket = this.threads.get(chatID);
        socket?.close();
    }
}

export default new MessageController();
