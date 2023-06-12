import Block from '../../core/Block';
import template from './change-password.hbs';
import { Input } from '../../components/input';
import { BackPanel } from '../../components/back-panel';
import { Button } from '../../components/button';
import { getFormData } from '../../utils/getFormData';
import {
    maxLength,
    minLength,
    password,
    repeatPasswordValidationMessage,
} from '../../utils/validation';
import { withStore } from '../../hocs/withStore';
import { withRouter } from '../../hocs/withRouter';
import UsersController from '../../controllers/UsersController';
import { UserPassword } from '../../api/UsersAPI';

// export interface IChangePasswordPage {
//     inputs: IInputProps[]
// }

class ChangePasswordPage extends Block {
    private _oldPasswordValue: string = '';

    private _newPasswordValue: string = '';

    private _newPasswordRepeatValue = '';

    constructor() {
        super({});
    }

    protected init(): void {
        this.children.backPanel = new BackPanel({ backURL: '../settings' });

        this.children.inputOldPassword = new Input({
            label: 'Старый пароль',
            name: 'oldPassword',
            type: 'password',
            value: '',
            disabled: false,
            danger: false,
            enableErrorMessage: true,
            errorMessage: '',
            validationFns: [minLength(8), maxLength(40), password()],
            events: {
                focusout: () => { this._handleOldPasswordChange(); },
            },
        });

        this.children.inputNewPassword = new Input({
            label: 'Новый пароль',
            name: 'newPassword',
            type: 'password',
            value: '',
            disabled: false,
            danger: false,
            enableErrorMessage: true,
            errorMessage: '',
            validationFns: [minLength(8), maxLength(40), password()],
            events: {
                focusout: () => { this._handleNewPasswordChange(); },
            },
        });

        this.children.inputNewPasswordRepeat = new Input({
            label: 'Повторите новый пароль',
            name: 'newPassword2',
            type: 'password',
            value: '',
            disabled: false,
            danger: false,
            enableErrorMessage: true,
            errorMessage: '',
            events: {
                focusout: () => { this._handleRepeatPasswordChange(); },
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

    private _handleOldPasswordChange(): void {
        this._oldPasswordValue = (this.children.inputOldPassword as Input).getValue();

        const { isValid, errorMessages } = (this.children.inputOldPassword as Input).validate();
        (this.children.inputOldPassword as Input).setProps({
            value: this._oldPasswordValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        (this.children.inputOldPassword as Input).setValidState(isValid);
    }

    private _handleNewPasswordChange(): void {
        this._newPasswordValue = (this.children.inputNewPassword as Input).getValue();

        const { isValid, errorMessages } = (this.children.inputNewPassword as Input).validate();
        (this.children.inputNewPassword as Input).setProps({
            value: this._newPasswordValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        (this.children.inputNewPassword as Input).setValidState(isValid);
    }

    private _handleRepeatPasswordChange(): void {
        this._newPasswordRepeatValue = (this.children.inputNewPasswordRepeat as Input).getValue();
        this._newPasswordValue = (this.children.inputNewPassword as Input).getValue();

        const isValid = this._newPasswordValue === this._newPasswordRepeatValue;
        const errorMessage = isValid ? undefined : repeatPasswordValidationMessage;
        (this.children.inputNewPasswordRepeat as Input).setProps({
            value: this._newPasswordRepeatValue,
            errorMessage: errorMessage ?? undefined,
        });

        (this.children.inputNewPasswordRepeat as Input).setValidState(isValid);
    }

    private _handleSubmit(): void {
        this._handleOldPasswordChange();
        this._handleNewPasswordChange();
        this._handleRepeatPasswordChange();
        const form = document.getElementById('edit-profile-form');
        if (form) {
            const formData = getFormData(form as HTMLFormElement);
            const userPassword = this._convertFormToPassword(formData);
            console.log(userPassword);
            UsersController.updatePassword(userPassword);
        }
    }

    private _convertFormToPassword(
        formData: Record<string, FormDataEntryValue>,
      ): UserPassword {
        return {
          oldPassword: formData.oldPassword as string,
          newPassword: formData.newPassword as string
        }
    }
}

export default withRouter(withStore(ChangePasswordPage));
