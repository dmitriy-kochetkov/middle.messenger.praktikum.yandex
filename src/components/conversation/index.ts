import Block from '../../core/Block';
import template from './conversation.hbs';
import { ChatFeed, IChatFeedProps } from '../chat-feed';
import { SendMessageForm } from '../send-message-form';
import { Button } from '../button';

export interface IConversation {
    name?: string,
    avatarURL?: string,
    defualtAvatarURL: string,
    chatFeed: IChatFeedProps,
}

export class Conversation extends Block {
    constructor(props: IConversation) {
        super(props);
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
    }

    render() {
        return this.compile(template, this.props);
    }
}
