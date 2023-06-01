import Block from '../../utils/Block';
import template from './edit-profile.hbs';
import { Input, IInputProps } from '../../components/input';
import { Button } from '../../components/button';
import { BackPanel } from '../../components/back-panel';
import { getFormData } from '../../utils/getFormData';
import {
    email,
    login,
    maxLength,
    minLength,
    name,
    notOnlyDigits,
    phone,
} from '../../utils/validation';

interface IEditProfilePage {
    inputs: IInputProps[]
}

export class EditProfilePage extends Block {
    private _emailValue: string = '';

    private _loginValue: string = '';

    private _firstNameValue: string = '';

    private _secondNameValue: string = '';

    private _phoneValue: string = '';

    constructor(props: IEditProfilePage) {
        super(props);
    }

    protected init(): void {
        this.children.backPanel = new BackPanel({ backURL: '../profile' });

        this.children.inputEmail = new Input({
            label: 'Почта',
            name: 'email',
            type: 'text',
            value: 'pochta@yandex.ru',
            disabled: false,
            danger: false,
            enableErrorMessage: true,
            errorMessage: '',
            validationFns: [email()],
            events: {
                focusout: () => { this._handleEmailChange(); },
            },
        });

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

        this.children.inputFirstName = new Input({
            label: 'Имя',
            name: 'first_name',
            type: 'text',
            value: 'Иван',
            disabled: false,
            danger: false,
            enableErrorMessage: true,
            errorMessage: '',
            validationFns: [name()],
            events: {
                focusout: () => { this._handleFirstNameChange(); },
            },
        });

        this.children.inputSecondName = new Input({
            label: 'Фамилия',
            name: 'second_name',
            type: 'text',
            value: 'Иванов',
            disabled: false,
            danger: false,
            enableErrorMessage: true,
            errorMessage: '',
            validationFns: [name()],
            events: {
                focusout: () => { this._handleSecondNameChange(); },
            },
        });

        this.children.inputDisplayName = new Input({
            label: 'Имя в чате',
            name: 'display_name',
            type: 'text',
            value: 'Иван',
            disabled: false,
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
            value: '+79099673030',
            disabled: false,
            danger: false,
            enableErrorMessage: true,
            errorMessage: '',
            validationFns: [minLength(10), maxLength(15), phone()],
            events: {
                focusout: () => { this._handlePhoneChange(); },
            },
        });

        this.children.button = new Button({
            label: 'Сохранить',
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

    render() {
        return this.compile(template, this.props);
    }

    private _handleEmailChange(): void {
        this._emailValue = (this.children.inputEmail as Input).getValue();

        const { isValid, errorMessages } = (this.children.inputEmail as Input).validate();
        this.children.inputEmail.setProps({
            value: this._emailValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        (this.children.inputEmail as Input).setValidState(isValid);
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

    private _handleFirstNameChange(): void {
        this._firstNameValue = (this.children.inputFirstName as Input).getValue();

        const { isValid, errorMessages } = (this.children.inputFirstName as Input).validate();
        this.children.inputFirstName.setProps({
            value: this._firstNameValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        (this.children.inputFirstName as Input).setValidState(isValid);
    }

    private _handleSecondNameChange(): void {
        this._secondNameValue = (this.children.inputSecondName as Input).getValue();

        const { isValid, errorMessages } = (this.children.inputSecondName as Input).validate();
        this.children.inputSecondName.setProps({
            value: this._secondNameValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        (this.children.inputSecondName as Input).setValidState(isValid);
    }

    private _handlePhoneChange(): void {
        this._phoneValue = (this.children.inputPhone as Input).getValue();

        const { isValid, errorMessages } = (this.children.inputPhone as Input).validate();
        this.children.inputPhone.setProps({
            value: this._phoneValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        (this.children.inputPhone as Input).setValidState(isValid);
    }

    private _handleSubmit(): void {
        this._handleEmailChange();
        this._handleLoginChange();
        this._handleFirstNameChange();
        this._handleSecondNameChange();
        this._handlePhoneChange();
        const form = document.getElementById('edit-profile-form');
        if (form) {
            const formData = getFormData(form as HTMLFormElement);
            console.log(formData);
        }
    }
}
