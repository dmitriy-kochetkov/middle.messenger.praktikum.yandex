import Block from "../../utils/Block";
import template from './message.hbs';

export interface IMessage {
    isText: boolean,
    time: string,
    text?: string,
    url?: string,
    width?: string,
    height?: string,
    isMine: boolean,
    readed?: boolean
}

export class Message extends Block {
    constructor(props: IMessage) {
        super(props);
    }

    render() {
        return this.compile(template, this.props)
    }
}
