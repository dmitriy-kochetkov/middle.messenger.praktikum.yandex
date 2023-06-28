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
    selected?: boolean,
    content: string,
    events: {
        click: (evt: PointerEvent | null) => void
    },
}

export class ChatItem extends Block {
    constructor(props: IChatItemProps) {
        super(props);
    }

    init() {
    }

    render() {
        return this.compile(template, this.props);
    }
}
