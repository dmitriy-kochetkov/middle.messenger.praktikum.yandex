import { MessageDTO } from "../api/types";
import wsTransport, {WS_BASE_URL, WSEvents} from "../core/wsTransport";
import { store } from "../store";
import { Message, transformMessages } from "../utils/apiTransformers";

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
        // console.warn(data);
        let messages: MessageDTO[] = [];

        if (Array.isArray(data)) {
            messages = data.reverse();
        } else {
            messages.push(data);
        }

        console.warn(messages);

        const allMessages = store.getState().messages;
        const currentMessages = allMessages[activeChatID] || [];
        const messagesToAdd = [...currentMessages, ...transformMessages(messages)];

        console.warn({currentMessages});
        console.warn({messagesToAdd});

        store.dispatch({
            messages: {
                [activeChatID]: [...messagesToAdd]
            },
            ...allMessages,
        })

        const lastMessage = messagesToAdd[messagesToAdd.length - 1];

        // обновление "последнего сообщения в чате";
        this.updateCurentChat(activeChatID, lastMessage);

    }

    private updateCurentChat(id: number, lastMessage: Message) {
        console.log(`update chat item ${id} ${lastMessage}`);
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
            // console.log('stage - 0');
            // console.log(this.threads);
            // console.log(activeChatID);
            // console.log(token);
            // console.log(this.threads.has(activeChatID))

            if (this.threads.has(activeChatID)) {
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

        // обновление "последнего сообщения в чате";
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
