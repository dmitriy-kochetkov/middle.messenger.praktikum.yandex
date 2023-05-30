import Block from "../../utils/Block";
import { Button } from "../../components/button";
import { Input, IInputProps } from "../../components/input";
import template from './login.hbs'
import { validateInput } from "../../utils/validation";

interface ILogin {
  inputs: IInputProps[]
}

export class LoginPage extends Block {
  constructor(props: ILogin) {
    super(props)
  }

  protected init(): void {
    /*this.children.inputLogin = new Input({
      mode: 'default',
      name: 'login',
      label: 'Логин',
      value: 'ivanivanov',
      errorMessage: '++++',
      disabled: false,
      isPassword: false,
      events: {
        focusin: (evt: FocusEvent) => {
          // this.eventCheck(evt);
        },
        focusout: (evt: FocusEvent) => {
          // this.eventCheck(evt);
          this.validate(evt, this.children.inputLogin);
        }
      }
    });*/

    this.children.inputLogin = new Input({
        label: "Логин",
        name: "login",
        type: 'text',
        value: "ivanivanov",
        disabled: false,
        danger: false,
        enableErrorMessage: true,
        errorMessage: "",
        events: {
            focusin: (evt: FocusEvent) => {},
            focusout: (evt: FocusEvent) => {}
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
        events: {
            focusin: (evt: FocusEvent) => {},
            focusout: (evt: FocusEvent) => {}
        }
    });

    this.children.button = new Button({
      label: 'Авторизоваться',
      submit: true,
      mode: 'primary',
      events: {
          click: (evt: PointerEvent) => {
            evt.preventDefault();
            this.eventCheck(evt);
          }
      }
    })
  }

  render(): DocumentFragment {
    return this.compile(template, this.props)
  }

  eventCheck(evt: Event): void {
    //console.log(evt.target);
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
