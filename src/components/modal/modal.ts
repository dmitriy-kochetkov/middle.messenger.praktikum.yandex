import Block from '../../core/Block';
import template from './modal.hbs';

interface IModal {
    isOpen: boolean,
    title: string,
    formItems?: Block[],
}

export class Modal extends Block {
    constructor(props: IModal) {
        super(props);

        this.children.items = this.props.formItems?.map((item: Block) => item)
    }

    render() {
        return this.compile(template, this.props);
    }
}
