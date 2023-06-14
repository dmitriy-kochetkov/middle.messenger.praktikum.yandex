import Block from '../../core/Block';
import template from './avatar-editable.hbs';

interface IAvatarEditable {
    avatarHoverText: string,
    avatarUrl?: string,
    events: {
        click: (evt: PointerEvent) => void
    },
}

export class AvatarEditable extends Block {
    constructor(props: IAvatarEditable) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
