import Block from '../../core/Block';
import template from './conversation.hbs';
import ChatFeed from '../chat-feed';
import { SendMessageForm } from '../send-message-form';
import { Button, IButtonProps } from '../button';
import { Avatar } from '../avatar/avatar';
import { withStore } from '../../hocs/withStore';
import { getAvatarLink } from '../../utils/getAvatarLink';
import { ButtonsMenu } from '../buttonsMenu';
import { IInputProps, Input, InputValidationFn } from '../input';
import { login, maxLength, minLength, notOnlyDigits, name } from '../../utils/validation';
import { getFormData } from '../../utils/getFormData';
import { UserLogin } from '../../api/UsersAPI';
// import { User } from '../../utils/apiTransformers';
import UsersList, { UsersList as UsersListType } from '../users-list';
import { ActionUsersData, GetChatUsersData } from '../../api/ChatsAPI';
import UsersController from '../../controllers/UsersControlles';
import ChatsController from '../../controllers/ChatsController';

export interface IConversation {
    isTopMenuVisible: boolean,
    activeChatID: number,
    name: string,
    avatar: string,
    setupModal: (options: {isOpen: boolean, title: string, formItems: Block[]}) => void,
}

class Conversation extends Block<IConversation> {
    private modalInput: Input;

    private modalSubmit: Button;

    private modalInputValue: string;

    constructor(props: IConversation) {
        super(props);

        this.modalInput = new Input({} as IInputProps);

        this.modalSubmit = new Button({} as IButtonProps);
    }

    protected init(): void {
        this.children.buttonOptions = new Button({
            submit: false,
            className: 'conversation__options-button',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    console.log(`options click for ${this.props.activeChatID}`);
                    this.toggleTopMenu();
                },
            },
        });

        this.children.buttonsMenuTop = new ButtonsMenu({
            location: 'top',
            buttons: [
                new Button({
                    label: 'Добавить пользователя',
                    submit: false,
                    className: 'menu-button menu-button__add-user',
                    events: {
                        click: (evt: PointerEvent) => {
                            evt.preventDefault();
                            this.addUserHandler();
                            this.toggleTopMenu();
                        }
                    }
                }),
                new Button({
                    label: 'Удалить пользователя',
                    submit: false,
                    className: 'menu-button menu-button__delete-user',
                    events: {
                        click: (evt: PointerEvent) => {
                            evt.preventDefault();
                            this.removeUserHandler();
                            this.toggleTopMenu();
                        }
                    }
                }),
                new Button({
                    label: 'Покинуть чат',
                    submit: false,
                    className: 'menu-button menu-button__leave_chat',
                    events: {
                        click: (evt: PointerEvent) => {
                            evt.preventDefault();
                            this.leaveChatHandler();
                            this.toggleTopMenu();
                        }
                    }
                }),
            ]
        });

        this.children.chatFeed = new ChatFeed({});

        this.children.avatar = new Avatar({
            size: 's',
            avatarURL: getAvatarLink(this.props.avatar),
        });

        this.children.sendMessageForm = new SendMessageForm({});

        this.children.modalUsersList = new UsersList({});
    }

    render() {
        return this.compile(template, this.props);
    }

    protected componentDidUpdate(oldProps: IConversation, newProps: IConversation) {
        const shouldUpdate = super.componentDidUpdate(oldProps, newProps);
        if (shouldUpdate) {
            this.children.avatar = new Avatar({
                size: 's',
                avatarURL: getAvatarLink(this.props.avatar),
            });
        }
        return shouldUpdate;
    }

    private toggleTopMenu() {
        const visibility = this.props.isTopMenuVisible;
        this.setProps({...this.props, isTopMenuVisible: !visibility})
    }

    private closeModal() {
        this.props.setupModal({
            isOpen: false,
            title: '',
            formItems: [],
        });
    }

    private initUserLoginModalForm() {
        this.modalInput = new Input({
            name: '',
            type: 'text',
            enableErrorMessage: true,
            errorMessage: '',
        });

        this.children.modalUsersList = new UsersList({});

        this.modalSubmit = new Button({
            label: '',
            submit: true,
            className: 'button button_primary button_modal',
            events: {
                click: () => {},
            },
        });
    }

    private setupUserModalForm(
        options: {
            inputLabel: string,
            inputName: string,
            inputValidationFns: InputValidationFn[],
            changeHandler: ()=>void,
            buttonLabel: string,
            clickHandler: ()=>void,
        }) {
        this.modalInput.setProps({
            label: options.inputLabel,
            name: options.inputName,
            events: {
                focusout: () => { options.changeHandler(); },
            },
            validationFns: options.inputValidationFns,
        });

        this.modalSubmit.setProps({
            label: options.buttonLabel,
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    options.clickHandler();
                },
            },
        });
    }

    private setupUserModal(modalTitle: string) {
        this.props.setupModal({
            isOpen: true,
            title: modalTitle,
            formItems: [
                this.modalInput,
                this.children.modalUsersList as Block,
                this.modalSubmit,
            ],
        });
    }

    private addUserHandler() {
        UsersController.resetUsers();

        this.initUserLoginModalForm();

        this.setupUserModalForm({
            inputLabel: 'Логин',
            inputName: 'login',
            changeHandler: this.handleAddUserLoginInputChange.bind(this),
            inputValidationFns: [minLength(3), maxLength(20), notOnlyDigits(), login()],
            buttonLabel: 'Добавить',
            clickHandler: this.addUserHandleSubmit.bind(this),
        });

        this.setupUserModal('Добавить пользователя');
    }

    private async handleAddUserLoginInputChange() {
        console.log('handleAddUserLoginInputChange()');
        if (!this.handlemodalInputChange()) {
            return;
        }

        const form = document.getElementById('modal__form') as HTMLFormElement;
        // console.log(form);

        if (form) {
            const rawData = getFormData(form as HTMLFormElement);
            const userLogin = this.convertFromToLogin(rawData);

            await UsersController.search(userLogin);
        }
    }

    private async addUserHandleSubmit() {
        const selectedUsers = (this.children.modalUsersList as UsersListType).getSelectedUsers();
        const payload = this.convertToActionUsersData(selectedUsers);
        await ChatsController.addUsers(payload);
        this.closeModal();
    }

    private async removeUserHandler() {
        // Обнуляем список пользователей в store
        UsersController.resetUsers();

        this.initUserLoginModalForm();

        this.setupUserModalForm({
            inputLabel: 'Имя ',
            inputName: 'name',
            changeHandler: this.handleRemoveUserLoginInputChange.bind(this),
            inputValidationFns: [maxLength(20), name()],
            buttonLabel: 'Удалить',
            clickHandler: this.removeUserHandleSubmit.bind(this),
        });

        this.setupUserModal('Удалить пользователя');

        await ChatsController.getChatUsers(this.props.activeChatID, {});
    }

    private async handleRemoveUserLoginInputChange() {
        if (!this.handlemodalInputChange()) {
            return;
        }

        const form = document.getElementById('modal__form') as HTMLFormElement;

        if (form) {
            const rawData = getFormData(form as HTMLFormElement);
            const userName = this.convertFromToName(rawData);
            await ChatsController.getChatUsers(this.props.activeChatID, userName);
        }
    }

    private async removeUserHandleSubmit() {
        console.log('removeUserHandleSubmit()');
        const selectedUsers = (this.children.modalUsersList as UsersListType).getSelectedUsers();
        const payload = this.convertToActionUsersData(selectedUsers);
        await ChatsController.deleteUsers(payload);
        this.closeModal();
    }


    private leaveChatHandler() {
        console.log(`leave chat click`);
        // TODO:...
    }

    private handlemodalInputChange() {
        this.modalInputValue = this.modalInput.getValue();
        const { isValid, errorMessages } = this.modalInput.validate();

        this.modalInput.setProps({
            value: this.modalInputValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        this.modalInput.setValidState(isValid);
        return isValid;
    }

    private convertToActionUsersData(
        users: number[],
      ): ActionUsersData {
        return {
            users: users,
            chatId: this.props.activeChatID
        };
    }

    private convertFromToLogin(
        formData: Record<string, FormDataEntryValue>,
      ): UserLogin {
        return {
            login: formData.login as string,
        };
    }

    private convertFromToName(
        formData: Record<string, FormDataEntryValue>,
      ): GetChatUsersData {
        return {
            name: formData.name as string,
        };
    }
}

const withConversation = withStore((state)=> ({
    name: state.activeChat.title,
    avatar: state.activeChat.avatar,
    activeChatID: state.activeChat.id,
}))

export default withConversation(Conversation);
