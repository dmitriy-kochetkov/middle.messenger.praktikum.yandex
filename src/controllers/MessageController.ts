import wsTransport, {WS_BASE_URL, WSEvents} from "../core/wsTransport";
import { store } from "../store";
import { Message } from "../utils/apiTransformers";

class MessageController {
    private threads: Map<number, wsTransport>;

    constructor() {
        this.threads = new Map();
    }

    private subscribe(activeChatID: number, ws: wsTransport) {
        ws.on(WSEvents.Message, (...event) => {
            this.onMessage(activeChatID, event);
        });

        ws.on(WSEvents.Close, () => {this.onClose(activeChatID)});
    }

    private onMessage(activeChatID: number, data: Message | Message[]) {
        let messages: Message[] = [];

        if (Array.isArray(data)) {
            messages = data.reverse();
        } else {
            messages.push(data);
        }

        const storedMessages = store.getState().messages[activeChatID];

        store.dispatch({
            messages: {
                [activeChatID]: [...(storedMessages || []), ...messages] }
        });
    }

    private onClose(activeChatID: number) {
        try {
            this.threads.delete(activeChatID);
        } catch (e) {
            console.error(e);
        }
    }

    async connect(activeChatID: number, token: string) {
        try {
            if (!this.threads.has(activeChatID)) {
                return;
            }

            const userID = store.getState().user?.id;

            if (!userID) {
                throw new Error(`User not found`);
            }

            const ws = new wsTransport(`${WS_BASE_URL}/${userID}/${activeChatID}/${token}`);

            await ws.connect();

            this.subscribe(activeChatID, ws);
            this.threads.set(activeChatID, ws);

            this.fetchOldMessages(activeChatID);

        } catch (e) {
            console.error(e);
        }
    }

    async send(message: string) {
        const {id: activeChatID} = store.getState().activeChat;

        if (!activeChatID) {
            throw new Error('Chat is not connected');
        }

        const socket = this.threads.get(activeChatID);
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
