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
      mode: 'default',
      name: 'oldPassword',
      label: 'Старый пароль',
      value: 'pochta@yandex.ru',
      errorMessage: '',
      disabled: false,
      isPassword: true,
      events: {
        focusin: (evt: FocusEvent) => {
        },
        focusout: (evt: FocusEvent) => {
          this.validate(evt, this.children.inputOldPassword);
        }
      }
    });

    this.children.inputNewPassword = new Input({
      mode: 'default',
      name: 'newPassword',
      label: 'Новый пароль',
      value: 'ivanivanov',
      errorMessage: '',
      disabled: false,
      isPassword: true,
      events: {
        focusin: (evt: FocusEvent) => {
        },
        focusout: (evt: FocusEvent) => {
          this.validate(evt, this.children.inputNewPassword);
        }
      }
    });

    this.children.inputNewPasswordRepeat = new Input({
      mode: 'default',
      name: 'newPassword2',
      label: 'Повторите новый пароль',
      value: 'Иван',
      errorMessage: '',
      disabled: false,
      isPassword: true,
      events: {
        focusin: (evt: FocusEvent) => {
        },
        focusout: (evt: FocusEvent) => {
          this.validate(evt, this.children.inputNewPasswordRepeat);
        }
      }
    });

    this.children.button = new Button({
      label: 'Сохранить',
      submit: true,
      mode: 'primary',
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
