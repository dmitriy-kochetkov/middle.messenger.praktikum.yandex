import Block from '../../core/Block';
import template from './chat.hbs';
import { Conversation, IConversation } from '../../components/conversation';
import { ChatItem, IChatItemProps } from '../../components/chat-item';
import { Avatar } from '../../components/avatar/avatar';

import { withRouter } from '../../hocs/withRouter';
import { withStore_plus } from '../../hocs/withStore';
import { Button } from '../../components/button';

import ChatsController from '../../controllers/ChatsController';
import { Chats } from '../../utils/apiTransformers';
import { getAvatarLink } from '../../utils/getAvatarLink';
import { extractFirstWords } from '../../utils/extractFirstWords';
import { getPrettyTime } from '../../utils/getPrettyTime';

interface IChatPageProps {
    chats: Chats;
}

class ChatPage extends Block {
    constructor(props: IChatPageProps) {
        super(props);
    }

    protected async componentDidMount() {
        await ChatsController.getAll({});
        // console.log(this.props);
    }

    protected async init() {
        this.props.buttonCreateChat = new Button({
            label: 'Создать чат',
            submit: false,
            className: 'chats_create-button',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    console.log('create chat click');
                },
            },
        });

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

        this.children.buttonCreateChat = this.props.buttonCreateChat;

        this.children.chats = this.createChats(this.props.chats);


        this.children.conversation = new Conversation(
            this.props.conversation as IConversation,
        );
    }

    private createChats(chats: Chats): ChatItem[] {
        return chats.map( chat =>
            new ChatItem({
                id: chat.id,
                title: chat.title,
                avatar: new Avatar({
                    size: 'm',
                    avatarURL: getAvatarLink(chat.avatar),
                }),
                unreadCount: chat.unreadCount ? '' + chat.unreadCount : '',
                messageTime: getPrettyTime(chat.lastMessage.time),
                isMine: this.isMessageMine(chat.lastMessage.user.login),
                content: extractFirstWords(chat.lastMessage.content),
            })
        );
    }

    private isMessageMine(login: String) {
        return login === this.props.userLogin;
    }

    protected componentDidUpdate(oldProps: IChatItemProps, newProps: IChatPageProps) {
        const shouldUpdate = super.componentDidUpdate(oldProps, newProps);
        if (shouldUpdate) {
            this.children.chats = this.createChats(newProps.chats);
        }
        return shouldUpdate;
      }

    render() {
        return this.compile(template, {...this.props});
    }
}

const withChats = withStore_plus((state)=> ({
    chats: state.chats,
    chatsError: state.chatsError,
    userLogin: state.user?.login,
}))

export default withChats(withRouter(ChatPage));



// this.props.chatItems = [
        //     {
        //         id: 10,
        //         title: 'HELLO_WORLD_BOT',
        //         messageTime: '20:17',
        //         isMine: false,
        //         content: 'Hello world!',
        //         unreadCount: '10',
        //         avatar: new Avatar({
        //             size: 'm'
        //         })
        //     },
        //     {
        //         id: 15,
        //         title: 'Марина',
        //         messageTime: 'Вт',
        //         isMine: false,
        //         content: 'Oh my gosh!',
        //         avatar: new Avatar({
        //             size: 'm'

        //         })
        //     },
        //     {
        //         id: 20,
        //         title: 'Вадим',
        //         messageTime: '19 июня',
        //         isMine: true,
        //         content: 'Hello, my friend!',
        //         avatar: new Avatar({
        //             size: 'm',
        //             avatarURL: catAvatar
        //         })
        //     }
        // ];
