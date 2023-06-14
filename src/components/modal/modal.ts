import Block from '../../core/Block';
import { Button } from '../button';
import template from './modal.hbs';

interface IModal {
    isOpen: boolean,
    title: string,
    buttonConfirm: Button,
}

export class Modal extends Block {
    constructor(props: IModal) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
