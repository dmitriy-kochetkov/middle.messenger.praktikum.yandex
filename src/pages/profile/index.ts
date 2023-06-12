import Block from '../../core/Block';
import template from './profile.hbs';
import { Input } from '../../components/input';
import { BackPanel } from '../../components/back-panel';
import { Button } from '../../components/button';
import AuthController from '../../controllers/AuthController';
import { withStore } from '../../hocs/withStore';

import store from '../../core/Store';
import router from '../../core/Router';
import { withRouter } from '../../hocs/withRouter';

// export interface IProfilePage {
//     userName: string,
//     inputs: IInputProps[]
// }

class ProfilePage extends Block {
    constructor() {
        super({});
    }

    protected init(): void {
        // console.log(this.props)
        // console.log(store.getState().user);
        // const pr = this.props;
        // console.log({...this.props});

        this.props.userName = store.getState().user.display_name; // 'Иван';

        this.children.backPanel = new BackPanel({ backURL: '../messenger' });

        this.children.inputEmail = new Input({
            label: 'Почта',
            name: 'email',
            type: 'text',
            value: store.getState().user.email, // 'pochta192548@yandex.ru',
            disabled: true,
            danger: false,
            enableErrorMessage: true,
            errorMessage: '',
            events: {
                focusout: () => {},
            },
        });

        this.children.inputLogin = new Input({
            label: 'Логин',
            name: 'login',
            type: 'text',
            value: store.getState().user.login, // 'ivanivanov1_2_3_4',
            disabled: true,
            danger: false,
            enableErrorMessage: true,
            errorMessage: '',
            events: {
                focusout: () => {},
            },
        });

        this.children.inputFirstName = new Input({
            label: 'Имя',
            name: 'first_name',
            type: 'text',
            value: store.getState().user.first_name, // 'Иван',
            disabled: true,
            danger: false,
            enableErrorMessage: true,
            errorMessage: '',
            events: {
                focusout: () => {},
            },
        });

        this.children.inputSecondName = new Input({
            label: 'Фамилия',
            name: 'second_name',
            type: 'text',
            value: store.getState().user.second_name, // 'Иванов',
            disabled: true,
            danger: false,
            enableErrorMessage: true,
            errorMessage: '',
            events: {
                focusout: () => {},
            },
        });

        this.children.inputDisplayName = new Input({
            label: 'Имя в чате',
            name: 'display_name',
            type: 'text',
            value: store.getState().user.display_name, // '',
            disabled: true,
            danger: false,
            enableErrorMessage: true,
            errorMessage: '',
            events: {
                focusout: () => {},
            },
        });

        this.children.inputPhone = new Input({
            label: 'Телефон',
            name: 'phone',
            type: 'text',
            value: store.getState().user.phone, // '+79876543210',
            disabled: true,
            danger: false,
            enableErrorMessage: true,
            errorMessage: '',
            events: {
                focusout: () => {},
            },
        });

        this.children.buttonEditProfile = new Button({
            label: 'Изменить данные',
            submit: false,
            className: 'button button_secondary',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go('/settings/changeData');
                },
            },
        });

        this.children.buttonChangePassword = new Button({
            label: 'Изменить пароль',
            submit: false,
            className: 'button button_secondary',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    router.go('/settings/changePassword');
                },
            },
        });

        this.children.buttonLogout = new Button({
            label: 'Выйти',
            submit: false,
            className: 'button button_dangerous',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    AuthController.logout();
                },
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

// const withUser = withStore((state) => ({...state.user}));
export default withRouter(withStore(ProfilePage));
