import { MessageDTO } from '../api/types';
import WSTransport, {
    WS_BASE_URL,
    WSEvents,
} from '../core/WSTransport';
import { store } from '../store';
import { transformMessages } from '../utils/apiTransformers';
// eslint-disable-next-line import/no-cycle
import ChatsController from './ChatsController';

class MessageController {
    private threads: Map<number, WSTransport>;

    constructor() {
        this.threads = new Map();
    }

    private subscribe(activeChatID: number, ws: WSTransport) {
        ws.on(WSEvents.Message, (event) => {
            this.onMessage(activeChatID, event);
        });

        ws.on(WSEvents.Close, () => { this.onClose(activeChatID); });
    }

    private async onMessage(activeChatID: number, data: MessageDTO | MessageDTO[]) {
        // console.warn(data);
        let messages: MessageDTO[] = [];

        if (Array.isArray(data)) {
            messages = data.reverse();
        } else {
            messages.push(data);
        }

        const allMessages = store.getState().messages;
        const currentMessages = allMessages[activeChatID] || [];
        const messagesToAdd = [...currentMessages, ...transformMessages(messages)];

        store.dispatch({
            messages: {
                [activeChatID]: [...messagesToAdd],
            },
            ...allMessages,
        });

        const lastMessage = messagesToAdd[messagesToAdd.length - 1];

        // обновление 'последнего сообщения в чате';
        if (lastMessage) {
            await ChatsController.setChatLastMessage(activeChatID, lastMessage);
            ChatsController.resetChatUnreadCounter(activeChatID);
        }
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
            if (this.threads.has(activeChatID)) {
                return;
            }

            const userID = store.getState().user?.id;

            if (!userID) {
                throw new Error('User not found');
            }

            const ws = new WSTransport(`${WS_BASE_URL}/${userID}/${activeChatID}/${token}`);

            await ws.connect();

            this.subscribe(activeChatID, ws);
            this.threads.set(activeChatID, ws);
            this.fetchOldMessages(activeChatID);
        } catch (e) {
            console.error(e);
        }
    }

    async send(message: string) {
        const { id: activeChatID } = store.getState().activeChat;

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

        // обновление 'последнего сообщения в чате';
    }

    fetchOldMessages(activeChat: number) {
        const socket = this.threads.get(activeChat);

        if (!socket) {
            throw new Error(`Chat ${activeChat} is not connected`);
        }
        // загружаем старые сообщения
        socket.send({
            type: 'get old',
            content: '0',
        });
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
