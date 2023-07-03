import Block from '../../core/Block/Block';
import template from './send-message-form.hbs';
import { getFormData } from '../../utils/getFormData';
import { notEmpty } from '../../utils/validation';
import { Button } from '../button';
import { Input } from '../input';
import MessageController from '../../controllers/MessageController';

export interface ISendMessageForm {
}

export class SendMessageForm extends Block {

    constructor(props: ISendMessageForm) {
        super(props);
    }

    protected init(): void {
        this.setProps({events: {
            submit: (evt: Event) => {
                evt.preventDefault();
                this._handleSubmit();
            }
        }});

        this.children.buttonAttachment = new Button({
            submit: false,
            className: 'send-message-form__attach-button',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    console.log('attachment click');
                },
            },
        });

        this.children.inputMessage = new Input({
            label: '',
            name: 'message',
            type: 'text',
            placeholder: 'Сообщение',
            value: '',
            disabled: false,
            danger: false,
            enableErrorMessage: false,
            errorMessage: '',
            validationFns: [notEmpty()],
        });

        this.children.buttonSendMessage = new Button({
            submit: false,
            className: 'send-message-form__send-button',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    this._handleSubmit();
                },
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }

    private async _handleSubmit() {
        const { isValid } = (this.children.inputMessage as Input).validate();

        if (!isValid) {
            return;
        }
        const form = document.getElementById('send-message-form');
        if (form) {
            const formData = getFormData(form as HTMLFormElement);
            await MessageController.send(formData.message as string);

            (this.children.inputMessage as Input).setValue('');
        }
    }
}
