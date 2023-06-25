import { MessageDTO } from "../api/types";
import wsTransport, {WS_BASE_URL, WSEvents} from "../core/wsTransport";
import { store } from "../store";
import { transformMessages } from "../utils/apiTransformers";

class MessageController {
    private threads: Map<number, wsTransport>;

    constructor() {
        this.threads = new Map();
    }

    private subscribe(activeChatID: number, ws: wsTransport) {
        ws.on(WSEvents.Message, (event) => {
            this.onMessage(activeChatID, event);
        });

        ws.on(WSEvents.Close, () => {this.onClose(activeChatID)});
    }

    private onMessage(activeChatID: number, data: MessageDTO | MessageDTO[]) {
        console.warn(data);
        let messages: MessageDTO[] = [];

        // console.log('data =', data);

        if (Array.isArray(data)) {
            messages = data.reverse();
        } else {
            // messages.push(data);
        }

        // const first = messages[0]
        // console.log(first[0]);
        // console.log(Array.isArray(first))
        // console.log(transformMessage(first));

        const allMessages = store.getState().messages;
        // console.log({ allMessages });

        const currentMessages = allMessages[activeChatID] || [];
        // console.log({ currentMessages });

        const messagesToAdd = [...currentMessages, ...transformMessages(messages)];
        // console.log({ messagesToAdd });


        store.dispatch({ messages: {
            [activeChatID]: [...messagesToAdd], ...allMessages
        } })

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
            console.log('stage - 0');
            // console.log(this.threads);
            // console.log(activeChatID);
            // console.log(token);
            // console.log(this.threads.has(activeChatID))

            if (this.threads.has(activeChatID)) {
                return;
            }

            // console.log('stage - 1');
            const userID = store.getState().user?.id;

            if (!userID) {
                throw new Error(`User not found`);
            }
            // console.log('stage - 2');

            const ws = new wsTransport(`${WS_BASE_URL}/${userID}/${activeChatID}/${token}`);

            // console.log('stage - 3');

            await ws.connect();

            // console.log('stage - 4');

            this.subscribe(activeChatID, ws);
            // console.log('stage - 5');
            this.threads.set(activeChatID, ws);

            // console.log('stage - 6');

            this.fetchOldMessages(activeChatID);

            // console.log('stage - 7');

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
        // загружаем старые сообщения
        socket.send({ type: "get old", content: "0" });
    }

    closeAll() {
        Array.from(this.threads.values()).forEach((thread) => thread.close());
    }

    close(chatID: number) {
        console.log(`closing connection for ${chatID} chat`)
        const socket = this.threads.get(chatID);
        socket?.close();
    }
}

export default new MessageController();
