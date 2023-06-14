import Block from '../../core/Block';
import template from './chat-item.hbs';
import { IAvatar } from '../avatar/avatar';

export interface IChatItemProps {
    avatar: IAvatar,
    name: string,
    lastActivity: string,
    isMine: boolean,
    text: string,
    counter?: string,

}

export class ChatItem extends Block {
    constructor(props: IChatItemProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
