import Block from '../../core/Block';
import template from './profile.hbs';
import { Input } from '../../components/input';
import { BackPanel } from '../../components/back-panel';
import { Button } from '../../components/button';
import { Modal } from '../../components/modal/modal';
import { AvatarEditable } from '../../components/avatar-editable/avatar-editable';

// import AuthController from '../../controllers/AuthController';
import { withStore } from '../../hocs/withStore';

// import store from '../../core/Store';
// import router from '../../core/Router';
import { withRouter } from '../../hocs/withRouter';
import { getFormData } from '../../utils/getFormData';
import UsersController from '../../controllers/UsersController';

// import catAvatar from '../../../static/cat.jpeg'

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

        this.props.userName = store.getState().user.display_name;

        this.children.backPanel = new BackPanel({ backURL: '../messenger' });

        this.children.modal = new Modal({
            isOpen: false,
            title: 'Загрузите файл',
            formItems: [
                new Input({
                    name: 'avatar',
                    type: 'file',
                    enableErrorMessage: false,
                    errorMessage: '',
                    disabled: true,
                    events: {
                        change: (evt: Event) => {
                            console.log('change image event');
                            // const file = (<HTMLInputElement>evt.target).files![0];
                            // console.log(file)
                        },
                    },
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
            avatarUrl: this.getAvatarLink(),
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    console.log('change avatar click');
                    this._changeAvatarClick();
                },
            },
        });

        // this.children.avatar2 = new AvatarEditable({
        //     avatarHoverText: 'Поменять аватар',
        //     avatarUrl: catAvatar,
        //     events: {
        //         click: (evt: PointerEvent) => {
        //             evt.preventDefault();
        //             console.log('change avatar click');
        //             this._changeAvatarClick();
        //         },
        //     },
        // });

        this.children.inputEmail = new Input({
            label: 'Почта',
            name: 'email',
            type: 'text',
            value: store.getState().user.email,
            disabled: true,
            enableErrorMessage: true,
            errorMessage: '',
        });

        this.children.inputLogin = new Input({
            label: 'Логин',
            name: 'login',
            type: 'text',
            value: store.getState().user.login,
            disabled: true,
            enableErrorMessage: true,
            errorMessage: '',
        });

        this.children.inputFirstName = new Input({
            label: 'Имя',
            name: 'first_name',
            type: 'text',
            value: store.getState().user.first_name,
            disabled: true,
            enableErrorMessage: true,
            errorMessage: '',
        });

        this.children.inputSecondName = new Input({
            label: 'Фамилия',
            name: 'second_name',
            type: 'text',
            value: store.getState().user.second_name,
            disabled: true,
            enableErrorMessage: true,
            errorMessage: '',
        });

        this.children.inputDisplayName = new Input({
            label: 'Имя в чате',
            name: 'display_name',
            type: 'text',
            value: store.getState().user.display_name,
            disabled: true,
            enableErrorMessage: true,
            errorMessage: '',
        });

        this.children.inputPhone = new Input({
            label: 'Телефон',
            name: 'phone',
            type: 'text',
            value: store.getState().user.phone,
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

    private _confirmModal() {
        const form = document.getElementById('modal-form') as HTMLFormElement;

        if (form) {
            const formData = getFormData(form as HTMLFormElement);
            const avatar = this._convertFormToAvatar(formData);
            // console.log(avatar);
            // console.log(avatar.get('avatar'));
            // console.log(typeof avatar);
            // console.log(avatar instanceof FormData);
            UsersController.updateAvatar(avatar);
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

    private getAvatarLink() {
        const avatarPath = store.getState().user.avatar;
        if (avatarPath) {
          return `https://ya-praktikum.tech/api/v2/resources${avatarPath}`;
        }
        return '';
      }

    render() {
        return this.compile(template, this.props);
    }
}

// const withUser = withStore((state) => ({...state.user}));
export default withRouter(withStore(ProfilePage));
