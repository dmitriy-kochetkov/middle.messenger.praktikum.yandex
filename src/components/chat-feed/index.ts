import Block from '../../utils/Block';
import template from './chat-feed.hbs';
import { IMessage, Message } from '../message';

export interface IChatFeedProps {
    messages: IMessage[],
}

export class ChatFeed extends Block {
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
