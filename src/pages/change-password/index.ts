import Block from "../../utils/Block";
import template from './change-password.hbs'
import { Input, IInputProps } from "../../components/input";
import { BackPanel } from "../../components/back-panel";
import { Button } from "../../components/button";
import { validateInput } from "../../utils/validation";

export interface IChangePasswordPage {
  inputs: IInputProps[]
}

export class ChangePasswordPage extends Block {
  constructor(props: IChangePasswordPage) {
    super(props);
  }

  protected init(): void {
    this.children.backPanel = new BackPanel({ backURL: '../profile'});

    this.children.inputOldPassword = new Input({
        label: "Старый пароль",
        name: "oldPassword",
        type: 'password',
        value: "string",
        disabled: false,
        danger: false,
        enableErrorMessage: true,
        errorMessage: "",
        events: {
            focusin: (evt: FocusEvent) => {},
            focusout: (evt: FocusEvent) => {}
        }
    });

    this.children.inputNewPassword = new Input({
        label: "Новый пароль",
        name: "newPassword",
        type: 'password',
        value: "ivanivanov__",
        disabled: false,
        danger: false,
        enableErrorMessage: true,
        errorMessage: "",
        events: {
            focusin: (evt: FocusEvent) => {},
            focusout: (evt: FocusEvent) => {}
        }
    });

    this.children.inputNewPasswordRepeat = new Input({
        label: "Повторите новый пароль",
        name: "newPassword2",
        type: 'password',
        value: "ivanivanov__",
        disabled: false,
        danger: false,
        enableErrorMessage: true,
        errorMessage: "Пароли не совпадают",
        events: {
            focusin: (evt: FocusEvent) => {},
            focusout: (evt: FocusEvent) => {}
        }
    });

    this.children.button = new Button({
      label: 'Сохранить',
      submit: true,
      className: 'button button_primary',
      events: {
          click: (evt: PointerEvent) => {
            evt.preventDefault();
          }
      }
    })
  }

  render() {
    return this.compile(template, this.props)
  }

  validate(evt: FocusEvent, element: Block) {
    console.log('validate');
    // console.log(evt.target);
    // console.log(element);

    const name = (evt.target! as HTMLInputElement).name;
    const value = (evt.target! as HTMLInputElement).value;

    const validation = validateInput(name, value);

    console.log(validation);

    if (value !== '' && !validation.isValid) {
      element.setProps({
        value: value,
        mode: 'error',
        errorMessage: validation.errorText
      })
    } else {
      element.setProps({
        value: value,
        mode: 'default',
        errorMessage: ''
      })
    }
  }
}
