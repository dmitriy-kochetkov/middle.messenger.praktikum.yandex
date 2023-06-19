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

import { withRouter } from '../../hocs/withRouter';
import { withStore, withStore_plus } from '../../hocs/withStore';

import { UserPassword } from '../../api/UsersAPI';
import { AvatarEditable } from '../../components/avatar-editable/avatar-editable';
import { updateUserPasswordAction } from '../../controllers/users';
import { Avatar } from '../../components/avatar/avatar';
import UsersController from '../../controllers/UsersControlles';

// export interface IChangePasswordPage {
//     inputs: IInputProps[]
// }

class ChangePasswordPage extends Block {
    private _oldPasswordValue: string = '';

    private _newPasswordValue: string = '';

    private _newPasswordRepeatValue = '';

    constructor(props: {}) {
        super(props);
    }

    protected init(): void {
        console.log({...this.props})
        this.children.backPanel = new BackPanel({ backURL: '../settings' });

        this.children.avatar = new Avatar({
            size: 'l',
            avatarURL: this.getAvatarLink(),
        })

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

    private _handleOldPasswordChange(): boolean {
        this._oldPasswordValue = (this.children.inputOldPassword as Input).getValue();

        const { isValid, errorMessages } = (this.children.inputOldPassword as Input).validate();
        (this.children.inputOldPassword as Input).setProps({
            value: this._oldPasswordValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        (this.children.inputOldPassword as Input).setValidState(isValid);
        return isValid;
    }

    private _handleNewPasswordChange(): boolean {
        this._newPasswordValue = (this.children.inputNewPassword as Input).getValue();

        const { isValid, errorMessages } = (this.children.inputNewPassword as Input).validate();
        (this.children.inputNewPassword as Input).setProps({
            value: this._newPasswordValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        (this.children.inputNewPassword as Input).setValidState(isValid);
        return isValid;
    }

    private _handleRepeatPasswordChange(): boolean {
        this._newPasswordRepeatValue = (this.children.inputNewPasswordRepeat as Input).getValue();
        this._newPasswordValue = (this.children.inputNewPassword as Input).getValue();

        const isValid = this._newPasswordValue === this._newPasswordRepeatValue;
        const errorMessage = isValid ? undefined : repeatPasswordValidationMessage;
        (this.children.inputNewPasswordRepeat as Input).setProps({
            value: this._newPasswordRepeatValue,
            errorMessage: errorMessage ?? undefined,
        });

        (this.children.inputNewPasswordRepeat as Input).setValidState(isValid);
        return isValid;
    }

    private isValid(): boolean {
        const validationResult = []
        validationResult.push(this._handleOldPasswordChange());
        validationResult.push(this._handleNewPasswordChange());
        validationResult.push(this._handleRepeatPasswordChange());
        return validationResult.every(Boolean);
    }

    private async _handleSubmit() {
        if (!this.isValid()) {
            return;
        }
        const form = document.getElementById('edit-profile-form');
        if (form) {
            const formData = getFormData(form as HTMLFormElement);
            const userPassword = this._convertFormToPassword(formData);

            await UsersController.password(userPassword)

            // this.props.store.dispatch(updateUserPasswordAction, userPassword);
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

    private getAvatarLink() {
        const avatarPath = this.props.avatar;
        if (avatarPath) {
            return `https://ya-praktikum.tech/api/v2/resources${avatarPath}`;
        }
        return '';
    }
}

const withUser = withStore_plus((state)=> ({
    ...state.user,
    profileError: state.authError,
}))

export default withUser(ChangePasswordPage);
