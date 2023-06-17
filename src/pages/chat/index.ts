import Block from '../../core/Block';
import template from './chat.hbs';
import { Conversation, IConversation } from '../../components/conversation';
import { ChatItem, IChatItemProps } from '../../components/chat-item';
import { Avatar } from '../../components/avatar/avatar';

import catAvatar from '../../../static/cat.jpeg'

import { withRouter } from '../../hocs/withRouter';
import { withStore } from '../../hocs/withStore';
import { getChatsAction } from '../../controllers/chats';

// export interface IChat {
//     chatItems: IChatItemProps[],
//     conversation: IConversation,
// }

class ChatPage extends Block {
    constructor(props: {}) {
        super(props);
    }

    protected componentDidMount(): void {
        this.props.store.dispatch(getChatsAction);
    }

    protected init(): void {
        this.props.chatItems = [];


        // this.props.chatItems = [
        //     {
        //         name: 'HELLO_WORLD_BOT',
        //         lastActivity: '20:17',
        //         isMine: false,
        //         text: 'Hello world!',
        //         counter: '10',
        //         avatar: new Avatar({
        //             size: 'm'
        //         })
        //     },
        //     {
        //         name: 'Марина',
        //         lastActivity: 'Вт',
        //         isMine: false,
        //         text: 'Oh my gosh!',
        //         avatar: new Avatar({
        //             size: 'm'

        //         })
        //     },
        //     {
        //         name: 'Вадим',
        //         lastActivity: '19 июня',
        //         isMine: true,
        //         text: 'Hello, my friend!',
        //         avatar: new Avatar({
        //             size: 'm',
        //             avatarURL: catAvatar
        //         })
        //     }
        // ];

        this.props.conversation = {
            name: '',
            avatar: {},
            chatFeed: {
                messages: [],
            },
        }

        // this.props.conversation = {
        //     name: 'Вадим',
        //     avatar: new Avatar({
        //         size: 's',
        //         avatarURL: catAvatar
        //     }),
        //     chatFeed: {
        //         messages: [
        //             {
        //                 isText: true,
        //                 time: '11:55',
        //                 text: 'Привет!',
        //                 url: '../../image.png',
        //                 width: '320',
        //                 height: '240',
        //                 isMine: false,
        //                 readed: true
        //             },
        //             {
        //                 isText: true,
        //                 time: '12:05',
        //                 text: 'Привет!',
        //                 url: '../../image.png',
        //                 width: '320',
        //                 height: '240',
        //                 isMine: true,
        //                 readed: true
        //             },
        //             {
        //                 isText: true,
        //                 time: '12:06',
        //                 text: 'Hello!!!',
        //                 isMine: false
        //             },
        //             {
        //                 isText: true,
        //                 time: '12:07',
        //                 text: 'Hello, my friend!',
        //                 isMine: true,
        //                 readed: true
        //             },
        //             {
        //                 isText: true,
        //                 time: '12:17',
        //                 text: 'Hello!!!',
        //                 isMine: false
        //             },
        //             {
        //                 isText: true,
        //                 time: '12:05',
        //                 text: 'Hello, my friend!',
        //                 isMine: true,
        //                 readed: true
        //             }
        //         ],
        //     }
        // };

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

export default withStore(withRouter(ChatPage));
