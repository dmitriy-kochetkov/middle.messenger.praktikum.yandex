import Block from '../../core/Block';
import template from './chat-feed.hbs';
import { IMessage, Message } from '../message';
import { withStore } from '../../hocs/withStore';
import { bytesToString } from '../../utils/bytesToString';

export interface IChatFeedProps {
    messages: IMessage[],
}

class ChatFeed extends Block {
    constructor(props: IChatFeedProps) {
        super(props);
    }

    protected init(): void {
        this.children.messages = this.props.messages.map((props: IMessage) => new Message(props));
    }

    render() {
        return this.compile(template, this.props);
    }
}

const withMessages = withStore((state)=> ({
    // messages: state.activeChat.id
    //     ? state.messages[state.activeChat.id] || []
    //     : [],

    messages: [
            {
                type: 'file',
                time: '11:55',
                content: 'Это мое первое сообщение!',
                url: '',
                isMine: false,
                file: {
                    path: 'https://play-lh.googleusercontent.com/AmKSpZt_rynhOO0ID1eS0gqeW3DFzoH6KNZkAAgepQ0t9MDRQTmil-nlY5GqkZ_7El0=w240-h480-rw',
                    filename: 'cat_00001.jpeg',
                    contentType: 'pmage/jpeg',
                    contentSize: bytesToString(1101203),
                    uploadDate: '19.05.2022 15:17'
                }
            },
            {
                type: 'file',
                time: '12:05',
                content: 'Второе сообщение!',
                url: '',
                isMine: true,
                file: {
                    path: 'https://funart.pro/uploads/posts/2022-06/1654688040_2-funart-pro-p-milie-kotiki-do-slez-zhivotnie-krasivo-fot-2.jpg',
                    filename: 'cat_00002.jpeg',
                    contentType: 'image/png',
                    contentSize: '514,2 Кб',
                    uploadDate: '19.05.2022 17:23'
                }
            },
            {
                type: 'message',
                time: '12:06',
                content: 'Третье сообщение!!!',
                isMine: false
            },
            {
                type: 'message',
                time: '12:07',
                content: 'Четвертое сообщение!',
                isMine: true,
                readed: true
            },
            {
                type: 'message',
                time: '12:17',
                content: 'Пятое сообщение!!!',
                isMine: false
            },
            {
                type: 'message',
                time: '12:05',
                content: 'Шестое сообщение!',
                isMine: true,
            },
            {
                type: 'file',
                time: '13:07',
                content: '',
                url: '',
                isMine: true,
                file: {
                    path: 'https://play-lh.googleusercontent.com/AmKSpZt_rynhOO0ID1eS0gqeW3DFzoH6KNZkAAgepQ0t9MDRQTmil-nlY5GqkZ_7El0=w240-h480-rw',
                    filename: 'cats.mpeg',
                    contentType: 'imagf/jpeg',
                    contentSize: bytesToString(99123617),
                    uploadDate: '19.05.2022 15:17'
                }
            },
        ],
    activeChatID: state.activeChat.id,
    currentUser: state.user,
}))

export default withMessages(ChatFeed);
