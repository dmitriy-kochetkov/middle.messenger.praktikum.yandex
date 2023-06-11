import Block from '../../core/Block';
import template from './login.hbs';
import { Button } from '../../components/button';
import { Input, IInputProps } from '../../components/input';
import { getFormData } from '../../utils/getFormData';
import {
    login,
    maxLength,
    minLength,
    notOnlyDigits,
    password,
} from '../../utils/validation';

export interface ILogin {
    inputs: IInputProps[]
}

export class LoginPage extends Block {
    private _loginValue: string = '';

    private _passwordValue: string = '';

    constructor(props: ILogin) {
        super(props);
    }

    protected init(): void {
        this.children.inputLogin = new Input({
            label: 'Логин',
            name: 'login',
            type: 'text',
            value: 'ivanivanov',
            disabled: false,
            danger: false,
            enableErrorMessage: true,
            errorMessage: '',
            validationFns: [minLength(3), maxLength(20), notOnlyDigits(), login()],
            events: {
                focusout: () => { this._handleLoginChange(); },
            },
        });

        this.children.inputPassword = new Input({
            label: 'Пароль',
            name: 'password',
            type: 'password',
            value: 'ivanivanov',
            disabled: false,
            danger: false,
            enableErrorMessage: true,
            errorMessage: '',
            validationFns: [minLength(8), maxLength(40), password()],
            events: {
                focusout: () => { this._handlePasswordChange(); },
            },
        });

        this.children.button = new Button({
            label: 'Авторизоваться',
            submit: true,
            className: 'button button_primary',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    this._handleSubmit();
                },
            },
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    private _handleLoginChange(): void {
        this._loginValue = (this.children.inputLogin as Input).getValue();

        const { isValid, errorMessages } = (this.children.inputLogin as Input).validate();
        this.children.inputLogin.setProps({
            value: this._loginValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        (this.children.inputLogin as Input).setValidState(isValid);
    }

    private _handlePasswordChange(): void {
        this._passwordValue = (this.children.inputPassword as Input).getValue();

        const { isValid, errorMessages } = (this.children.inputPassword as Input).validate();
        this.children.inputPassword.setProps({
            value: this._passwordValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        (this.children.inputPassword as Input).setValidState(isValid);
    }

    private _handleSubmit(): void {
        this._handleLoginChange();
        this._handlePasswordChange();
        const form = document.getElementById('login-form');
        if (form) {
            const formData = getFormData(form as HTMLFormElement);
            console.log(formData);
        }
    }
}
