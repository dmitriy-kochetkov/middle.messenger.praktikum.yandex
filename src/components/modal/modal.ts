import Block from '../../core/Block';
import { Button } from '../button';
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

    init() {
        this.children.buttonClose = new Button({
            submit: false,
            className: 'modal__close-button',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    console.log(`modal close click`);
                    this.closeModal();
                },
            },
        });

        this.setProps({events: {
            click: (evt: Event) => {
                const backdrop = document.querySelector('.backdrop');
                if (evt.target === backdrop) {
                    this.closeModal();
                }
            }
        }});
    }

    render() {
        return this.compile(template, this.props);
    }

    private closeModal() {
        this.setProps({ isOpen: false });
    }

    public getForm(): HTMLFormElement {
        return this.getHTMLFormElement();
    }

    private getHTMLFormElement(): HTMLFormElement {
        const { element } = this;
        return element?.getElementsByTagName('form')[0];
    }

    protected componentDidUpdate(oldProps: IModal, newProps: IModal) {
        const shouldUpdate = super.componentDidUpdate(oldProps, newProps);
        if (shouldUpdate) {
            this.children.items = this.props.formItems;
        }
        return shouldUpdate;
    }
}
