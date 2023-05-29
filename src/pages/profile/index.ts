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

    this.children.inputEmail = new Input({
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
    });

    this.children.inputLogin = new Input({
      mode: 'default',
      name: 'login',
      label: 'Логин',
      value: 'ivanivanov',
      errorMessage: '',
      disabled: true,
      isPassword: false,
      events: {
        focusin: (evt: FocusEvent) => {
        },
        focusout: (evt: FocusEvent) => {
        }
      }
    });

    this.children.inputFirstName = new Input({
      mode: 'default',
      name: 'first_name',
      label: 'Имя',
      value: 'Иван',
      errorMessage: '',
      disabled: true,
      isPassword: false,
      events: {
        focusin: (evt: FocusEvent) => {
        },
        focusout: (evt: FocusEvent) => {
        }
      }
    });

    this.children.inputSecondName = new Input({
      mode: 'default',
      name: 'second_name',
      label: 'Фамилия',
      value: 'Иванов',
      errorMessage: '',
      disabled: true,
      isPassword: false,
      events: {
        focusin: (evt: FocusEvent) => {
        },
        focusout: (evt: FocusEvent) => {
        }
      }
    });

    this.children.inputDisplayName = new Input({
      mode: 'default',
      name: 'display_name',
      label: 'Имя в чате',
      value: 'Иван',
      errorMessage: '',
      disabled: true,
      isPassword: false,
      events: {
        focusin: (evt: FocusEvent) => {
        },
        focusout: (evt: FocusEvent) => {
        }
      }
    });

    this.children.inputPhone = new Input({
      mode: 'default',
      name: 'phone',
      label: 'Телефон',
      value: '+7 (909) 967 30 30',
      errorMessage: '',
      disabled: true,
      isPassword: false,
      events: {
        focusin: (evt: FocusEvent) => {
        },
        focusout: (evt: FocusEvent) => {
        }
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
