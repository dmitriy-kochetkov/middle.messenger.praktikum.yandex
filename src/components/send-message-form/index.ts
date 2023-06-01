import Block from "../../utils/Block";
import { getFormData } from "../../utils/getFormData";
import { notEmpty } from "../../utils/validation";
import { Button } from "../button";
import { Input } from "../input";
import template from './send-message-form.hbs';

export interface ISendMessageForm {

}

export class SendMessageForm extends Block {
    private _messageValue: string = '';

    constructor(props: ISendMessageForm) {
        super(props);
    }

    protected init(): void {
        this.children.buttonAttachment = new Button({
            submit: false,
            className: 'send-message-form__attach-button',
            events: {
                click: (evt: PointerEvent) => {
                  evt.preventDefault();
                  console.log('attachment click');
                }
            }
          });

        this.children.inputMessage = new Input({
            label: "",
            name: "message",
            type: 'text',
            placeholder: "Сообщение",
            value: "",
            disabled: false,
            danger: false,
            enableErrorMessage: false,
            errorMessage: "",
            validationFns: [notEmpty()],
            events: {
                focusout: (evt: FocusEvent) => {this._handleMessageChange()},
            }
        });

        this.children.buttonSendMessage = new Button({
            submit: false,
            className: 'send-message-form__send-button',
            events: {
                click: (evt: PointerEvent) => {
                  evt.preventDefault();
                  this._handleSubmit();
                }
            }
          });
    }

    render() {
        return this.compile(template, this.props);
    }

    private _handleMessageChange() {
        this._messageValue = (this.children.inputMessage as Input).getValue();
    }

    private _handleSubmit(): void {
        this._handleMessageChange();
        const form = document.getElementById('send-message-form');
        if (form) {
            const formData = getFormData(form as HTMLFormElement);
            console.log(formData);
        }
    }
}
