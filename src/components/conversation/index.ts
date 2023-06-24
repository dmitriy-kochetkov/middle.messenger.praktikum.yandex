import Block from '../../core/Block';
import template from './conversation.hbs';
import { ChatFeed, IChatFeedProps } from '../chat-feed';
import { SendMessageForm } from '../send-message-form';
import { Button } from '../button';
import { Avatar, IAvatar } from '../avatar/avatar';

import { withStore } from '../../hocs/withStore';
import { Chat } from '../../utils/apiTransformers';

export interface IConversation {
    activeChat: number,
    name?: string,
    // avatar: IAvatar,
    chatFeed: IChatFeedProps
    // messages:
}

class Conversation extends Block<IConversation> {
    constructor(props: IConversation) {
        super(props);
        // console.log('conversation constructor')
    }

    protected init(): void {
        this.children.buttonOptions = new Button({
            submit: false,
            className: 'conversation__options-button',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    console.log('options click');
                },
            },
        });
        this.children.chatFeed = new ChatFeed(this.props.chatFeed);
        this.children.sendMessageForm = new SendMessageForm({});

        this.children.avatar = new Avatar({
            size: 's',
            avatarURL: '',
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

const withConversation = withStore((state)=> ({
    // chats: state.chats,
    name: (state.chats || []).filter((chat: Chat) => {chat.id === state.activeChat}),
    chatFeed: {
        messages: [],
    },
    // chatsError: state.chatsError,
    // userLogin: state.user?.login,
    activeChat: state.activeChat,
}))

export default withConversation(Conversation);
