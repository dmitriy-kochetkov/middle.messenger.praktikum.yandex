import Block from "../../utils/Block";
import { Input } from "../input";
import template from './send-message-form.hbs';

export interface ISendMessageForm {

}

export class SendMessageForm extends Block {
    constructor(props: ISendMessageForm) {
        super(props);
    }

    protected init(): void {
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
    }

    render() {
        return this.compile(template, this.props);
    }
}
