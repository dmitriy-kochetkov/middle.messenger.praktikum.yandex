import Block from "../../utils/Block";
import { Button } from "../../components/button";
import { Input, IInputProps } from "../../components/input";
import template from './login.hbs'

interface ILogin {
  inputs: IInputProps[]
}

export class LoginPage extends Block {
  constructor(props: ILogin) {
    super(props)
  }

  protected init(): void {
    this.children.inputLogin = new Input({
      mode: 'default',
      name: 'login',
      label: 'Логин',
      value: 'ivanivanov',
      errorMessage: '',
      disabled: false,
      isPassword: false,
      events: {
        focusin: (evt: FocusEvent) => {
          this.eventChech(evt);
        },
        focusout: (evt: FocusEvent) => {
          this.eventChech(evt);
        }
      }
    });

    this.children.inputPassword = new Input({
      mode: 'default',
      name: 'password',
      label: 'Пароль',
      value: 'userPassword',
      errorMessage: '',
      disabled: false,
      isPassword: true,
      events: {
          focusin: (evt: FocusEvent) => {
            this.eventChech(evt);
          },
          focusout: (evt: FocusEvent) => {
            this.eventChech(evt);
          }
      }
    });

    this.children.button = new Button({
      label: 'Авторизоваться',
      submit: true,
      mode: 'primary',
      events: {
          click: (evt: PointerEvent) => {
            evt.preventDefault();
            this.eventChech(evt);
          }
      }
    })
  }

  render(): DocumentFragment {
    return this.compile(template, this.props)
  }

  eventChech(evt: Event): void {
    console.log(evt.target);
  }
}
