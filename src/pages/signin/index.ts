import Block from '../../core/Block/Block';
import template from './signin.hbs';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { getFormData } from '../../utils/getFormData';
import {
    email,
    login,
    maxLength,
    minLength,
    name,
    capital,
    notOnlyDigits,
    password,
    phone,
    repeatPasswordValidationMessage,
} from '../../utils/validation';
import { withStore } from '../../hocs/withStore';
import AuthController from '../../controllers/AuthController';
import { SignupData } from '../../api/AuthAPI';

class SigninPage extends Block {
    private _emailValue: string = '';

    private _loginValue: string = '';

    private _firstNameValue: string = '';

    private _secondNameValue: string = '';

    private _phoneValue: string = '';

    private _passwordValue: string = '';

    private _passwordRepeatValue: string = '';

    constructor(props: {}) {
        super(props);
    }

    protected init(): void {
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
            validationFns: [capital(), name()],
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
            validationFns: [capital(), name()],
            events: {
                focusout: () => { this._handleSecondNameChange(); },
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

        this.children.inputPassword = new Input({
            label: 'Пароль',
            name: 'password',
            type: 'password',
            value: 'userPassword',
            disabled: false,
            danger: false,
            enableErrorMessage: true,
            errorMessage: '',
            validationFns: [minLength(8), maxLength(40), password()],
            events: {
                focusout: () => { this._handlePasswordChange(); },
            },
        });

        this.children.inputPasswordRepeat = new Input({
            label: 'Пароль (ещё раз)',
            name: 'password_2',
            type: 'password',
            value: 'userPassword',
            disabled: false,
            danger: false,
            enableErrorMessage: true,
            errorMessage: '',
            events: {
                focusout: () => { this._handleRepeatPasswordChange(); },
            },
        });

        this.children.button = new Button({
            label: 'Зарегистрироваться',
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

    private _handleEmailChange(): boolean {
        this._emailValue = (this.children.inputEmail as Input).getValue();

        const { isValid, errorMessages } = (this.children.inputEmail as Input).validate();
        (this.children.inputEmail as Input).setProps({
            value: this._emailValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        (this.children.inputEmail as Input).setValidState(isValid);
        return isValid;
    }

    private _handleLoginChange(): boolean {
        this._loginValue = (this.children.inputLogin as Input).getValue();

        const { isValid, errorMessages } = (this.children.inputLogin as Input).validate();
        (this.children.inputLogin as Input).setProps({
            value: this._loginValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        (this.children.inputLogin as Input).setValidState(isValid);
        return isValid;
    }

    private _handleFirstNameChange(): boolean {
        this._firstNameValue = (this.children.inputFirstName as Input).getValue();

        const { isValid, errorMessages } = (this.children.inputFirstName as Input).validate();
        (this.children.inputFirstName as Input).setProps({
            value: this._firstNameValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        (this.children.inputFirstName as Input).setValidState(isValid);
        return isValid;
    }

    private _handleSecondNameChange(): boolean {
        this._secondNameValue = (this.children.inputSecondName as Input).getValue();

        const { isValid, errorMessages } = (this.children.inputSecondName as Input).validate();
        (this.children.inputSecondName as Input).setProps({
            value: this._secondNameValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        (this.children.inputSecondName as Input).setValidState(isValid);
        return isValid;
    }

    private _handlePhoneChange(): boolean {
        this._phoneValue = (this.children.inputPhone as Input).getValue();

        const { isValid, errorMessages } = (this.children.inputPhone as Input).validate();
        (this.children.inputPhone as Input).setProps({
            value: this._phoneValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        (this.children.inputPhone as Input).setValidState(isValid);
        return isValid;
    }

    private _handlePasswordChange(): boolean {
        this._passwordValue = (this.children.inputPassword as Input).getValue();

        const { isValid, errorMessages } = (this.children.inputPassword as Input).validate();
        (this.children.inputPassword as Input).setProps({
            value: this._passwordValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        (this.children.inputPassword as Input).setValidState(isValid);
        return isValid;
    }

    private _handleRepeatPasswordChange(): boolean {
        this._passwordRepeatValue = (this.children.inputPasswordRepeat as Input).getValue();
        this._passwordValue = (this.children.inputPassword as Input).getValue();

        const isValid = this._passwordValue === this._passwordRepeatValue;
        const errorMessage = isValid
            ? undefined
            : repeatPasswordValidationMessage;
        (this.children.inputPasswordRepeat as Input).setProps({
            value: this._passwordRepeatValue,
            errorMessage: errorMessage ?? undefined,
        });

        (this.children.inputPasswordRepeat as Input).setValidState(isValid);
        return isValid;
    }

    private isValid(): boolean {
        const validationResult = []
        validationResult.push(this._handleEmailChange());
        validationResult.push(this._handleLoginChange());
        validationResult.push(this._handleFirstNameChange());
        validationResult.push(this._handleSecondNameChange());
        validationResult.push(this._handlePhoneChange());
        validationResult.push(this._handlePasswordChange());
        validationResult.push(this._handleRepeatPasswordChange());
        return validationResult.every(Boolean);
    }

    private async _handleSubmit() {
        if (!this.isValid()) {
            return;
        }

        const form = document.getElementById('signin-form');
        if (form) {
            const formData = getFormData(form as HTMLFormElement);
            const payload = this.convertFormToSUP(formData);

            await AuthController.signup(payload);
            await AuthController.user();
        }
    }

    private convertFormToSUP(
        formData: Record<string, FormDataEntryValue>,
      ): SignupData {
        return {
            first_name: formData.first_name as string,
            second_name: formData.second_name as string,
            login: formData.login as string,
            email: formData.email as string,
            password: formData.password as string,
            phone: formData.phone as string,
        }
    }
}

const withAuthError = withStore((state)=> (
    { authError: state.authError, }
))

export default withAuthError(SigninPage);
