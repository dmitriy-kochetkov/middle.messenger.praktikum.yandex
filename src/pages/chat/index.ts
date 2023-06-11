import Block from '../../core/Block';
import template from './chat.hbs';
import { Conversation, IConversation } from '../../components/conversation';
import { ChatItem, IChatItemProps } from '../../components/chat-item';

export interface IChat {
    chatItems: IChatItemProps[],
    conversation: IConversation,
}

export class ChatPage extends Block {
    constructor(props: IChat) {
        super(props);
    }

    protected init(): void {
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
