import Block from '../../core/Block';
import template from './chat-feed.hbs';
import { IMessage, Message } from '../message';
import { Message as MessageType } from '../../utils/apiTransformers';
import { withStore } from '../../hocs/withStore';
import { bytesToString } from '../../utils/bytesToString';
import { getPrettyTime } from '../../utils/getPrettyTime';

export interface IChatFeedProps {
    messages: IMessage[],
}

class ChatFeed extends Block {
    constructor(props: IChatFeedProps) {
        super(props);
    }

    protected init(): void {
        this.createMessages()
    }

    render() {
        return this.compile(template, this.props);
    }

    private createMessages() {
        this.children.messages = this.props.messages.map(
            (message: MessageType) => {

                return new Message(this.convertMessageToProp(message))
            }
        );

        // this.children.messages = this.props.messages.map((props: IMessage) => new Message(props));
    }

    protected componentDidUpdate(oldProps: IChatFeedProps, newProps: IChatFeedProps) {
        const shouldUpdate = super.componentDidUpdate(oldProps, newProps);
        if (shouldUpdate) {
            this.createMessages()
        }
        return shouldUpdate;
    }

    private convertMessageToProp(message: MessageType): IMessage {
        if (message) {
            return {
                type: message.type,
                time: getPrettyTime(message.time),
                content: message.content,
                isMine: this.props.currentUser.id === message.userId,
                file: message.file
                    ? {
                        path: 'string',
                        filename: 'string',
                        contentType: 'string',
                        contentSize: 'string',
                        uploadDate: 'string',
                    }
                    : null
            }
        } else {
            return {} as IMessage;
        }
    }
}

const withMessages = withStore((state)=> ({
    activeChatID: state.activeChat.id,
    currentUser: state.user,
    messages: state.activeChat.id
        ? state.messages[state.activeChat.id] || []
        : [],
}))
    /*
    chat_id: 13128
    content: "🍕🍕🍕🍕🍕🍕🍕"
    file: null
    id: 1
    is_read: true
    time: "2023-06-20T20:28:26+00:00"
    type: "message"
    user_id: 1045886
    */

    // messages: [
    //         {
    //             type: 'file',
    //             time: '11:55',
    //             content: 'Это мое первое сообщение!',
    //             url: '',
    //             isMine: false,
    //             file: {
    //                 path: 'https://play-lh.googleusercontent.com/AmKSpZt_rynhOO0ID1eS0gqeW3DFzoH6KNZkAAgepQ0t9MDRQTmil-nlY5GqkZ_7El0=w240-h480-rw',
    //                 filename: 'cat_00001.jpeg',
    //                 contentType: 'pmage/jpeg',
    //                 contentSize: bytesToString(1101203),
    //                 uploadDate: '19.05.2022 15:17'
    //             }
    //         },
    //         {
    //             type: 'file',
    //             time: '12:05',
    //             content: 'Второе сообщение!',
    //             url: '',
    //             isMine: true,
    //             file: {
    //                 path: 'https://funart.pro/uploads/posts/2022-06/1654688040_2-funart-pro-p-milie-kotiki-do-slez-zhivotnie-krasivo-fot-2.jpg',
    //                 filename: 'cat_00002.jpeg',
    //                 contentType: 'image/png',
    //                 contentSize: '514,2 Кб',
    //                 uploadDate: '19.05.2022 17:23'
    //             }
    //         },
    //         {
    //             type: 'message',
    //             time: '12:06',
    //             content: 'Третье сообщение!!!',
    //             isMine: false
    //         },
    //         {
    //             type: 'message',
    //             time: '12:07',
    //             content: 'Четвертое сообщение!',
    //             isMine: true,
    //             readed: true
    //         },
    //         {
    //             type: 'message',
    //             time: '12:17',
    //             content: 'Пятое сообщение!!!',
    //             isMine: false
    //         },
    //         {
    //             type: 'message',
    //             time: '12:05',
    //             content: 'Шестое сообщение!',
    //             isMine: true,
    //         },
    //         {
    //             type: 'file',
    //             time: '13:07',
    //             content: '',
    //             url: '',
    //             isMine: true,
    //             file: {
    //                 path: 'https://play-lh.googleusercontent.com/AmKSpZt_rynhOO0ID1eS0gqeW3DFzoH6KNZkAAgepQ0t9MDRQTmil-nlY5GqkZ_7El0=w240-h480-rw',
    //                 filename: 'cats.mpeg',
    //                 contentType: 'imagf/jpeg',
    //                 contentSize: bytesToString(99123617),
    //                 uploadDate: '19.05.2022 15:17'
    //             }
    //         },
    //     ],


export default withMessages(ChatFeed);
