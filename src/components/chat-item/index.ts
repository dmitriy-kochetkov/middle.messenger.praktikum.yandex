import Block from '../../core/Block';
import template from './chat-item.hbs';
import { Avatar } from '../avatar/avatar';

export interface IChatItemProps {
    id: number,
    title: string,
    avatar: Avatar,
    unreadCount?: string,
    messageTime: string,
    isMine: boolean,
    content: string,
}

export class ChatItem extends Block {
    constructor(props: IChatItemProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
