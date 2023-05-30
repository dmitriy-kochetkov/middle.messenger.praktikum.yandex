import Block from "../../utils/Block";
import template from './profile.hbs'
import { Input, IInputProps } from "../../components/input";
import { BackPanel } from "../../components/back-panel";

interface IProfilePage {
  userName: string,
  inputs: IInputProps[]
}

export class ProfilePage extends Block {
  constructor(props: IProfilePage) {
    super(props);
  }

  protected init(): void {
    this.children.backPanel = new BackPanel({ backURL: '../chat'});

    /*this.children.inputEmail = new Input({
      mode: 'default',
      name: 'email',
      label: 'Почта',
      value: 'pochta@yandex.ru',
      errorMessage: '',
      disabled: true,
      isPassword: false,
      events: {
        focusin: (evt: FocusEvent) => {
        },
        focusout: (evt: FocusEvent) => {
        }
      }
    });*/

    this.children.inputEmail = new Input({
        label: "Почта",
        name: "email",
        type: 'text',
        value: "pochta@yandex.ru",
        disabled: true,
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
        disabled: true,
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
        disabled: true,
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
        disabled: true,
        danger: false,
        enableErrorMessage: true,
        errorMessage: "",
        events: {
            focusin: (evt: FocusEvent) => {},
            focusout: (evt: FocusEvent) => {}
        }
    });

    this.children.inputDisplayName = new Input({
        label: "Имя в чате",
        name: "display_name",
        type: 'text',
        value: "Иван",
        disabled: true,
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
        disabled: true,
        danger: false,
        enableErrorMessage: true,
        errorMessage: "",
        events: {
            focusin: (evt: FocusEvent) => {},
            focusout: (evt: FocusEvent) => {}
        }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
