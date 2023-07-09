import Block from '../../core/Block/Block';
import template from './info-message.hbs';

export interface IInfoMessage {
    content: string,
}

export class InfoMessage extends Block {
    constructor(props: IInfoMessage) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
