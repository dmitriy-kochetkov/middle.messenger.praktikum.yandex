import Block from '../../core/Block';
import template from './login.hbs';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { getFormData } from '../../utils/getFormData';
import {
    login,
    maxLength,
    minLength,
    notOnlyDigits,
    password,
} from '../../utils/validation';

// import { loginAction } from '../../controllers/auth';
// import { SigninData } from '../../api/AuthAPI';
// import { withRouter } from '../../hocs/withRouter';
import { withStore_plus } from '../../hocs/withStore';
import AuthController from '../../controllers/AuthController';
import { SigninData } from '../../api/AuthAPI';

class LoginPage extends Block {
    private _loginValue: string = '';

    private _passwordValue: string = '';

    constructor(props: {}) {
        super(props);
        // if (this.props.store.state.user) {
        //     this.props.router.go('/messenger');
        // }
    }

    protected init(): void {
        console.log('LoginPage.init');

        this.children.inputLogin = new Input({
            label: 'Логин',
            name: 'login',
            type: 'text',
            value: 'cj_',
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
            value: 'CJpassword',
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

    private isValid(): boolean {
        const validationResult = []
        validationResult.push(this._handleLoginChange());
        validationResult.push(this._handlePasswordChange());
        return validationResult.every(Boolean);
    }

    private async _handleSubmit() {
        if (!this.isValid()) {
            return;
        }
        const form = document.getElementById('login-form');
        if (form) {
            const formData = getFormData(form as HTMLFormElement);
            const payload = this.convertFormToCredentials(formData)

            await AuthController.signin(payload);
            await AuthController.user();
        }
    }

    private convertFormToCredentials(
        formData: Record<string, FormDataEntryValue>,
      ): SigninData {
        return {
          login: formData.login as string,
          password: formData.password as string,
        }
    }
}

const withAuthError = withStore_plus((state)=> (
    { authError: state.authError, }
))

export default withAuthError(LoginPage);
