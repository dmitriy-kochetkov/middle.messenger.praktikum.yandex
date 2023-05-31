import Block from "../../utils/Block";
import { Button } from "../../components/button";
import { Input, IInputProps } from "../../components/input";
import template from './login.hbs'
import { maxLength, minLength } from "../../utils/validation";

interface ILogin {
  inputs: IInputProps[]
}

export class LoginPage extends Block {
    private _loginValue: string = '';
    private _passwordValue: string = '';

    constructor(props: ILogin) {
        super(props)
    }

  protected init(): void {
    this.children.inputLogin = new Input({
        label: "Логин",
        name: "login",
        type: 'text',
        value: "ivanivanov",
        disabled: false,
        danger: false,
        enableErrorMessage: true,
        errorMessage: "",
        validationFns: [minLength(3), maxLength(20)],
        events: {
            focusin: (evt: FocusEvent) => {},
            focusout: (evt: FocusEvent) => this._handleLoginChange(),
        }
    });

    this.children.inputPassword = new Input({
        label: "Пароль",
        name: "password",
        type: 'password',
        value: "ivanivanov",
        disabled: false,
        danger: false,
        enableErrorMessage: true,
        errorMessage: "",
        validationFns: [minLength(8), maxLength(40)],
        events: {
            focusin: (evt: FocusEvent) => {},
            focusout: (evt: FocusEvent) => {}
        }
    });

    this.children.button = new Button({
      label: 'Авторизоваться',
      submit: true,
      className: 'button button_primary',
      events: {
          click: (evt: PointerEvent) => {
            evt.preventDefault();
          }
      }
    })
  }

  render(): DocumentFragment {
    return this.compile(template, this.props)
  }

  private _handleLoginChange(): void {
    this._loginValue = (this.children.inputLogin as Input).getValue();
    const { isValid, errorMessage } = (this.children.inputLogin as Input).validate();
    console.log({isValid, errorMessage})
    this.children.inputLogin.setProps({
      value: this._loginValue,
      errorMessage: errorMessage![0] ?? undefined,
    });
    (this.children.inputLogin as Input).setValidState(isValid);
  }
}
