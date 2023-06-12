import Block from '../../core/Block';
import template from './chat.hbs';
import { Conversation, IConversation } from '../../components/conversation';
import { ChatItem, IChatItemProps } from '../../components/chat-item';


import defaultAvatar from '../../../static/default-avatar.svg';
import catAvatar from '../../../static/cat.jpeg'

// export interface IChat {
//     chatItems: IChatItemProps[],
//     conversation: IConversation,
// }

export class ChatPage extends Block {
    constructor() {
        super({});
    }

    protected init(): void {
        this.props.chatItems = [
            {
                name: 'HELLO_WORLD_BOT',
                lastActivity: '20:17',
                isMine: false,
                text: 'Hello world!',
                counter: '10',
                defualtAvatarURL: defaultAvatar
            },
            {
                name: 'Марина',
                avatarURL: catAvatar,
                lastActivity: 'Вт',
                isMine: false,
                text: 'Oh my gosh!',
                defualtAvatarURL: defaultAvatar
            },
            {
                name: 'Вадим',
                lastActivity: '19 июня',
                isMine: true,
                text: 'Hello, my friend!',
                defualtAvatarURL: defaultAvatar
            }
        ];

        this.props.conversation = {
            name: 'Вадим',
            defualtAvatarURL: defaultAvatar,
            chatFeed: {
                messages: [
                    {
                        isText: true,
                        time: '11:55',
                        text: 'Привет!',
                        url: '../../image.png',
                        width: '320',
                        height: '240',
                        isMine: false,
                        readed: true
                    },
                    {
                        isText: true,
                        time: '12:05',
                        text: 'Привет!',
                        url: '../../image.png',
                        width: '320',
                        height: '240',
                        isMine: true,
                        readed: true
                    },
                    {
                        isText: true,
                        time: '12:06',
                        text: 'Hello!!!',
                        isMine: false
                    },
                    {
                        isText: true,
                        time: '12:07',
                        text: 'Hello, my friend!',
                        isMine: true,
                        readed: true
                    },
                    {
                        isText: true,
                        time: '12:17',
                        text: 'Hello!!!',
                        isMine: false
                    },
                    {
                        isText: true,
                        time: '12:05',
                        text: 'Hello, my friend!',
                        isMine: true,
                        readed: true
                    }
                ],
            }
        };

        this.children.chats = this.props.chatItems.map(
            (props: IChatItemProps) => new ChatItem(props),
        );
        this.children.conversation = new Conversation(
            this.props.conversation as IConversation,
        );
    }

    render() {
        return this.compile(template, this.props);
    }
}
