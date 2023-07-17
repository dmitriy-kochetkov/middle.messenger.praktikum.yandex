import Block from '../../core/Block/Block';
import template from './avatar.hbs';

export interface IAvatar {
    size: 's' | 'm' | 'l',
    avatarURL?: string,
}

export class Avatar extends Block {
    constructor(props: IAvatar) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
