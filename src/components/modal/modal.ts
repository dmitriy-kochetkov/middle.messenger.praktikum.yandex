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

        this.children.items = this.props.formItems;
    }

    render() {
        return this.compile(template, this.props);
    }

    protected componentDidUpdate(oldProps: IModal, newProps: IModal) {
        const shouldUpdate = super.componentDidUpdate(oldProps, newProps);
        if (shouldUpdate) {
            this.children.items = this.props.formItems;
        }
        return shouldUpdate;
    }
}
