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
    this.children.inputEmail = new Input({
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
    });

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
        },
        focusout: (evt: FocusEvent) => {
          this.validate(evt, this.children.inputLogin);
        }
      }
    });

    this.children.inputFirstName = new Input({
      mode: 'default',
      name: 'first_name',
      label: 'Имя',
      value: 'Иван',
      errorMessage: '',
      disabled: false,
      isPassword: false,
      events: {
        focusin: (evt: FocusEvent) => {
        },
        focusout: (evt: FocusEvent) => {
          this.validate(evt, this.children.inputFirstName);
        }
      }
    });

    this.children.inputSecondName = new Input({
      mode: 'default',
      name: 'second_name',
      label: 'Фамилия',
      value: 'Иванов',
      errorMessage: '',
      disabled: false,
      isPassword: false,
      events: {
        focusin: (evt: FocusEvent) => {
        },
        focusout: (evt: FocusEvent) => {
          this.validate(evt, this.children.inputSecondName);
        }
      }
    });

    this.children.inputPhone = new Input({
      mode: 'default',
      name: 'phone',
      label: 'Телефон',
      value: '+7 (909) 967 30 30',
      errorMessage: '',
      disabled: false,
      isPassword: false,
      events: {
        focusin: (evt: FocusEvent) => {
        },
        focusout: (evt: FocusEvent) => {
          this.validate(evt, this.children.inputPhone);
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
          },
          focusout: (evt: FocusEvent) => {
            this.validate(evt, this.children.inputPassword);
          }
      }
    });

    this.children.inputPasswordRepeat = new Input({
      mode: 'default',
      name: 'password_2',
      label: 'Пароль (ещё раз)',
      value: 'userPassword',
      errorMessage: '',
      disabled: false,
      isPassword: true,
      events: {
          focusin: (evt: FocusEvent) => {
          },
          focusout: (evt: FocusEvent) => {
            this.validate(evt, this.children.inputPasswordRepeat);
          }
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
