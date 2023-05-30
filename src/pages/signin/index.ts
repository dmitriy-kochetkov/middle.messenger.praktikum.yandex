import Block from "../../utils/Block";
import { Button } from "../../components/button";
import { Input, IInputProps } from "../../components/input";
import template from './signin.hbs'
import { validateInput } from "../../utils/validation";

interface ISignin {
  inputs: IInputProps[]
}

export class SigninPage extends Block {
  constructor(props: ISignin) {
    super(props)
  }

  protected init(): void {
    /*this.children.inputEmail = new Input({
      mode: 'default',
      name: 'email',
      label: 'Почта',
      value: 'pochta@yandex.ru',
      errorMessage: '',
      disabled: false,
      isPassword: false,
      events: {
        focusin: (evt: FocusEvent) => {
        },
        focusout: (evt: FocusEvent) => {
          this.validate(evt, this.children.inputEmail);
        }
      }
    });*/

    this.children.inputEmail = new Input({
        label: "Почта",
        name: "email",
        type: 'text',
        value: "pochta@yandex.ru",
        disabled: false,
        danger: false,
        enableErrorMessage: true,
        errorMessage: "",
        events: {
            focusin: (evt: FocusEvent) => {},
            focusout: (evt: FocusEvent) => {}
        }
    });

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

    this.children.inputFirstName = new Input({
        label: "Имя",
        name: "first_name",
        type: 'text',
        value: "Иван",
        disabled: false,
        danger: false,
        enableErrorMessage: true,
        errorMessage: "",
        events: {
            focusin: (evt: FocusEvent) => {},
            focusout: (evt: FocusEvent) => {}
        }
    });

    this.children.inputSecondName = new Input({
        label: "Фамилия",
        name: "second_name",
        type: 'text',
        value: "Иванов",
        disabled: false,
        danger: false,
        enableErrorMessage: true,
        errorMessage: "",
        events: {
            focusin: (evt: FocusEvent) => {},
            focusout: (evt: FocusEvent) => {}
        }
    });

    this.children.inputPhone = new Input({
        label: "Телефон",
        name: "phone",
        type: 'text',
        value: "+7 (909) 967 30 30",
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
        value: "userPassword",
        disabled: false,
        danger: false,
        enableErrorMessage: true,
        errorMessage: "",
        events: {
            focusin: (evt: FocusEvent) => {},
            focusout: (evt: FocusEvent) => {}
        }
    });

    this.children.inputPasswordRepeat = new Input({
        label: "Пароль (ещё раз)",
        name: "password_2",
        type: 'password',
        value: "userPassword",
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
      label: 'Зарегистрироваться',
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
