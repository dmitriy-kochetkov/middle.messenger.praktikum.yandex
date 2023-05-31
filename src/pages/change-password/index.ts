import Block from "../../utils/Block";
import template from './change-password.hbs'
import { Input, IInputProps } from "../../components/input";
import { BackPanel } from "../../components/back-panel";
import { Button } from "../../components/button";
import { maxLength, minLength, password, repeatPasswordValidationMessage } from "../../utils/validation";
import { getFormData } from "../../utils/getFormData";

export interface IChangePasswordPage {
  inputs: IInputProps[]
}

export class ChangePasswordPage extends Block {
    private _oldPasswordValue: string = '';
    private _newPasswordValue: string = '';
    private _newPasswordRepeatValue = '';

    constructor(props: IChangePasswordPage) {
        super(props);
    }

    protected init(): void {
        this.children.backPanel = new BackPanel({ backURL: '../profile'});

        this.children.inputOldPassword = new Input({
            label: "Старый пароль",
            name: "oldPassword",
            type: 'password',
            value: 'myOldPassword',
            disabled: false,
            danger: false,
            enableErrorMessage: true,
            errorMessage: "",
            validationFns: [minLength(8), maxLength(40), password()],
            events: {
                focusout: (evt: FocusEvent) => {this._handleOldPasswordChange()}
            }
        });

        this.children.inputNewPassword = new Input({
            label: "Новый пароль",
            name: "newPassword",
            type: 'password',
            value: 'myNewSuperPassword',
            disabled: false,
            danger: false,
            enableErrorMessage: true,
            errorMessage: "",
            validationFns: [minLength(8), maxLength(40), password()],
            events: {
                focusout: (evt: FocusEvent) => {this._handleNewPasswordChange()}
            }
        });

        this.children.inputNewPasswordRepeat = new Input({
            label: "Повторите новый пароль",
            name: "newPassword2",
            type: 'password',
            value: 'myNewSuperPassword$',
            disabled: false,
            danger: false,
            enableErrorMessage: true,
            errorMessage: "",
            events: {
                focusout: (evt: FocusEvent) => {this._handleRepeatPasswordChange()}
            }
        });

        this.children.button = new Button({
        label: 'Сохранить',
        submit: true,
        className: 'button button_primary',
        events: {
            click: (evt: PointerEvent) => {
                evt.preventDefault();
                this._handleSubmit();
            }
        }
        })
    }

    render() {
        return this.compile(template, this.props)
    }

    private _handleOldPasswordChange(): void {
        this._oldPasswordValue = (this.children.inputOldPassword as Input).getValue();

        const { isValid, errorMessages } = (this.children.inputOldPassword as Input).validate();
        this.children.inputOldPassword.setProps({
            value: this._oldPasswordValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        (this.children.inputOldPassword as Input).setValidState(isValid);
    }

    private _handleNewPasswordChange(): void {
        this._newPasswordValue = (this.children.inputNewPassword as Input).getValue();

        const { isValid, errorMessages } = (this.children.inputNewPassword as Input).validate();
        this.children.inputNewPassword.setProps({
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
        this.children.inputNewPasswordRepeat.setProps({
            value: this._newPasswordRepeatValue,
            errorMessage: errorMessage ?? undefined
        });

        (this.children.inputNewPasswordRepeat as Input).setValidState(isValid);
    }

    private _handleSubmit(): void {
        this._handleOldPasswordChange();
        this._handleNewPasswordChange();
        this._handleRepeatPasswordChange();
        const form = document.getElementById('edit-profile-form');
        const formData = getFormData(form as HTMLFormElement);
        console.log(formData);
    }
}
