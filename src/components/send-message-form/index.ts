import Block from "../../utils/Block";
import { Button } from "../button";
import { Input } from "../input";
import template from './send-message-form.hbs';

export interface ISendMessageForm {

}

export class SendMessageForm extends Block {
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
            validationFns: [],
            events: {
                focusin: (evt: FocusEvent) => {},
                focusout: (evt: FocusEvent) => {},
            }
        });

        this.children.buttonSendMessage = new Button({
            submit: false,
            className: 'send-message-form__send-button',
            events: {
                click: (evt: PointerEvent) => {
                  evt.preventDefault();
                }
            }
          });


    }

    render() {
        return this.compile(template, this.props);
    }
}
