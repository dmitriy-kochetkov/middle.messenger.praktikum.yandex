import Block from '../../core/Block/Block';
import template from './edit-profile.hbs';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { BackPanel } from '../../components/back-panel';
import { getFormData } from '../../utils/getFormData';
import {
    email,
    login,
    maxLength,
    minLength,
    name,
    capital,
    notOnlyDigits,
    phone,
} from '../../utils/validation';
import { withStore } from '../../hocs/withStore';
import { UserData } from '../../api/UsersAPI';
import UsersController from '../../controllers/UsersControlles';
import { Avatar } from '../../components/avatar/avatar';
import { getAvatarLink } from '../../utils/getAvatarLink';
import { ROUTES } from '../../core/constants';


class EditProfilePage extends Block {
    private _emailValue: string = '';

    private _loginValue: string = '';

    private _firstNameValue: string = '';

    private _secondNameValue: string = '';

    private _phoneValue: string = '';

    constructor(props: {}) {
        super(props);
    }

    protected init(): void {
        this.children.backPanel = new BackPanel({ backURL: ROUTES.Profile });

        this.children.avatar = new Avatar({
                        size: 'l',
                        avatarURL: getAvatarLink(this.props.avatar),
                    })

        this.children.inputEmail = new Input({
            label: 'Почта',
            name: 'email',
            type: 'text',
            value: this.props.email,
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
            value: this.props.login,
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
            value: this.props.firstName,
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
            value: this.props.secondName,
            disabled: false,
            danger: false,
            enableErrorMessage: true,
            errorMessage: '',
            validationFns: [capital(), name()],
            events: {
                focusout: () => { this._handleSecondNameChange(); },
            },
        });

        this.children.inputDisplayName = new Input({
            label: 'Имя в чате',
            name: 'display_name',
            type: 'text',
            value: this.props.displayName,
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
            value: this.props.phone,
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

    private isValid(): boolean {
        const validationResult = []
        validationResult.push(this._handleEmailChange());
        validationResult.push(this._handleLoginChange());
        validationResult.push(this._handleFirstNameChange());
        validationResult.push(this._handleSecondNameChange());
        validationResult.push(this._handlePhoneChange());
        return validationResult.every(Boolean);
    }

    private async _handleSubmit() {
        if (!this.isValid()) {
            return;
        }
        const form = document.getElementById('edit-profile-form');
        if (form) {
            const formData = getFormData(form as HTMLFormElement);
            const payload = this.convertFormToUser(formData);

            await UsersController.profile(payload);
        }
    }

    private convertFormToUser(
        formData: Record<string, FormDataEntryValue>,
      ): UserData {
        return {
          email: formData.email as string,
          first_name: formData.first_name as string,
          second_name: formData.second_name as string,
          display_name: formData.display_name as string,
          login: formData.login as string,
          phone: formData.phone as string,
        }
    }
}

const withUser = withStore((state)=> ({
    ...state.user,
    profileError: state.profileError,
}))

export default withUser(EditProfilePage);
