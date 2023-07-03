import Block from '../../core/Block';
import template from './profile.hbs';
import { Input } from '../../components/input';
import { BackPanel } from '../../components/back-panel';
import { Button } from '../../components/button';
import { Modal } from '../../components/modal/modal';
import { AvatarEditable } from '../../components/avatar-editable/avatar-editable';
import { withRouter } from '../../hocs/withRouter';
import { withStore } from '../../hocs/withStore';
import { getFormData } from '../../utils/getFormData';
import AuthController from '../../controllers/AuthController';
import UsersController from '../../controllers/UsersControlles';
import { getAvatarLink } from '../../utils/getAvatarLink';
import { ROUTES } from '../../core/constants';

class ProfilePage extends Block {
    constructor(props: {}) {
        super(props);
    }

    protected init(): void {
        this.props.userName = this.props.displayName;

        this.children.backPanel = new BackPanel({ backURL: ROUTES.Chat });

        this.children.modal = new Modal({
            isOpen: false,
            title: 'Загрузите файл',
            formItems: [
                new Input({
                    label: 'Выберите файл',
                    name: 'avatar',
                    type: 'file',
                    enableErrorMessage: false,
                    errorMessage: '',
                    // events: {
                    //     change: (evt: Event) => {
                    //         console.log('change image event');
                    //         const file = (<HTMLInputElement>evt.target).files![0];
                    //         console.log(file)
                    //     },
                    // },
                }),
                new Button({
                    label: 'Принять',
                    submit: false,
                    className: 'button button_primary button_modal',
                    events: {
                        click: (evt: PointerEvent) => {
                            evt.preventDefault();
                            console.log('modal button click');
                            this._confirmModal();
                        },
                    },
                }),
            ],
        });

        this.children.avatar = new AvatarEditable({
            avatarHoverText: 'Поменять аватар',
            avatarUrl: getAvatarLink(this.props.avatar),
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    console.log('change avatar click');
                    this._changeAvatarClick();
                },
            },
        });

        this.children.inputEmail = new Input({
            label: 'Почта',
            name: 'email',
            type: 'text',
            value: this.props.email,
            disabled: true,
            enableErrorMessage: true,
            errorMessage: '',
        });

        this.children.inputLogin = new Input({
            label: 'Логин',
            name: 'login',
            type: 'text',
            value: this.props.login,
            disabled: true,
            enableErrorMessage: true,
            errorMessage: '',
        });

        this.children.inputFirstName = new Input({
            label: 'Имя',
            name: 'first_name',
            type: 'text',
            value: this.props.firstName,
            disabled: true,
            enableErrorMessage: true,
            errorMessage: '',
        });

        this.children.inputSecondName = new Input({
            label: 'Фамилия',
            name: 'second_name',
            type: 'text',
            value: this.props.secondName,
            disabled: true,
            enableErrorMessage: true,
            errorMessage: '',
        });

        this.children.inputDisplayName = new Input({
            label: 'Имя в чате',
            name: 'display_name',
            type: 'text',
            value: this.props.displayName,
            disabled: true,
            enableErrorMessage: true,
            errorMessage: '',
        });

        this.children.inputPhone = new Input({
            label: 'Телефон',
            name: 'phone',
            type: 'text',
            value: this.props.phone,
            disabled: true,
            enableErrorMessage: true,
            errorMessage: '',
        });

        this.children.buttonEditProfile = new Button({
            label: 'Изменить данные',
            submit: false,
            className: 'button button_secondary',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    this.props.router.go(ROUTES.EditProfile);
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
                    this.props.router.go(ROUTES.ChangePassword);
                },
            },
        });

        this.children.buttonLogout = new Button({
            label: 'Выйти',
            submit: false,
            className: 'button button_dangerous',
            events: {
                click: async (evt: PointerEvent) => {
                    evt.preventDefault();
                    await AuthController.logout();
                },
            },
        });

    }

    private async _confirmModal() {
        const form = document.getElementById('modal__form') as HTMLFormElement;

        if (form) {
            const rawData = getFormData(form as HTMLFormElement);
            const avatarFormData = this._convertFormToAvatar(rawData);
            console.log(avatarFormData);

            await UsersController.avatar(avatarFormData);
        }

        (this.children.modal as Block).setProps({isOpen: false});
    }

    private _convertFormToAvatar(
        formData: Record<string, FormDataEntryValue>,
      ): FormData {
        const avatarData = new FormData();
        avatarData.append('avatar', formData.avatar);
        return avatarData;
    }

    private _changeAvatarClick() {
        (this.children.modal as Block).setProps({isOpen: true});
    }

    render() {
        return this.compile(template, this.props);
    }
}

const withUser = withStore((state)=> ({
    ...state.user,
    profileError: state.profileError,
}))

export default withUser(withRouter(ProfilePage));
