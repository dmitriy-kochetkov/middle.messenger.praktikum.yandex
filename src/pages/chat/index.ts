import Block from '../../core/Block/Block';
import template from './chat.hbs';
import Conversation, { IConversation } from '../../components/conversation';
import { ChatItem } from '../../components/chat-item';
import { Avatar } from '../../components/avatar/avatar';
import { Modal } from '../../components/modal/modal';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { notEmpty } from '../../utils/validation';
import { Chats } from '../../utils/apiTransformers';
import { getAvatarLink } from '../../utils/getAvatarLink';
import { extractFirstWords } from '../../utils/extractFirstWords';
import { getPrettyTime } from '../../utils/getPrettyTime';
import { getFormData } from '../../utils/getFormData';
import { CreateChatData } from '../../api/ChatsAPI';
import { withStore } from '../../hocs/withStore';
import ChatsController from '../../controllers/ChatsController';
import MessageController from '../../controllers/MessageController';

export interface IChatPageProps {
    chats: Chats;
    message: string;
}

class ChatPage extends Block {
    private modalInput: Input;

    private modalSubmit: Button;

    private modalInputValue: string;

    private chatsUpdateInterval: number;

    constructor(props: IChatPageProps) {
        super(props);

        this.initChatModalForm();

        this.modalInputValue = '';
        this.chatsUpdateInterval = 0;
    }

    protected async init() {
        this.children.buttonCreateChat = new Button({
            label: 'Создать чат',
            submit: false,
            className: 'chats_create-button',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    this.createChatClick();
                },
            },
        });

        this.children.modal = new Modal({
            isOpen: false,
            title: 'Загрузите файл',
            formItems: [],
        });

        this.children.chats = this.createChats(this.props.chats);

        this.children.conversation = new Conversation(
            {setupModal: this.setupModal.bind(this)} as IConversation,
        );
    }

    render() {
        return this.compile(template, {...this.props});
    }

    protected async componentDidMount() {
        await this.updateChats();

        // this.chatsUpdateInterval = setInterval(() => {
        //     this.updateChats();
        // }, 5000);
    }

    private async updateChats() {
        await ChatsController.getAll({});
    }

    public componentWillUnmount(): void {
        clearInterval(this.chatsUpdateInterval);
        MessageController.closeAll();
    }

    protected componentDidUpdate(newProps: IChatPageProps) {
        this.children.chats = this.createChats(newProps.chats);
        return true;
    }

    private createChats(chats: Chats): ChatItem[] {
        return chats.map( chat => {
            let messageTime = '';
            let isMine = false;
            let content = '';

            if (chat.lastMessage) {
                messageTime = getPrettyTime(chat.lastMessage.time);
                isMine = this.isMessageMine(chat.lastMessage.user.login);
                content = extractFirstWords(chat.lastMessage.content);
            }

            return new ChatItem({
                id: chat.id,
                title: chat.title,
                avatar: new Avatar({
                    size: 'm',
                    avatarURL: getAvatarLink(chat.avatar),
                }),
                unreadCount: chat.unreadCount ? '' + chat.unreadCount : '',
                messageTime: messageTime,
                isMine: isMine,
                content: content,
                selected: this.isChatActive(chat.id),
                events: {
                    click: async () => {
                        await ChatsController.activateChat(chat);
                    },
                },
                })
            }
        );
    }

    private isChatActive(id: number): boolean {
        return id === this.props.activeChat.id;
    }

    private isMessageMine(login: String) {
        return login === this.props.userLogin;
    }

    private createChatClick() {
        this.initChatModalForm();
        this.setupChatModalForm();
        this.setupCreateChatModal();
    }

    private initChatModalForm() {
        this.modalInput = new Input({
            name: '',
            type: 'text',
            enableErrorMessage: true,
            errorMessage: '',
            validationFns: [notEmpty()],
            events: {
                focusout: () => { this.handleModalInputChange(); },
            },
        })

        this.modalSubmit = new Button({
            label: '',
            submit: true,
            className: 'button button_primary button_modal',
            events: {
                click: () => {},
            },
        });
    }

    private setupChatModalForm() {
        this.modalInput.setProps({
            label: 'Имя чата',
            name: 'title',
        });

        this.modalSubmit.setProps({
            label: 'Создать',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    this.createChatHandleSubmit()
                },
            },
        });
    }

    private setupModal(options: {isOpen: boolean, title: string, formItems: Block[]}) {
        (this.children.modal as Modal).setProps({
            isOpen: options.isOpen,
            title: options.title,
            formItems: options.formItems,
        });
    }

    private setupCreateChatModal() {
        this.setupModal({
            isOpen: true,
            title: 'Создать чат',
            formItems: [
                this.modalInput,
                this.modalSubmit,
            ],
        });
    }

    private async createChatHandleSubmit() {
        if (!this.isValid()) {
            return;
        }

        const form = (this.children.modal as Modal).getForm();

        if (form) {
            const rawData = getFormData(form as HTMLFormElement);
            const newChatName = this.convertFromToChatName(rawData);

            await ChatsController.create(newChatName);
            await ChatsController.getAll({});
        }

        (this.children.modal as Block).setProps({ isOpen: false });
    }

    private isValid(): boolean {
        return this.handleModalInputChange()
    }

    private handleModalInputChange(): boolean {
        this.modalInputValue = this.modalInput.getValue();
        const { isValid, errorMessages } = this.modalInput.validate();

        this.modalInput.setProps({
            value: this.modalInputValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        this.modalInput.setValidState(isValid);
        return isValid;
    }

    private convertFromToChatName(
        formData: Record<string, FormDataEntryValue>,
      ): CreateChatData {
        return {
            title: formData.title as string,
        };
    }

}

const withChats = withStore((state)=> ({
    chats: state.chats,
    chatsError: state.chatsError,
    userLogin: state.user?.login,
    activeChat: state.activeChat,
}))

export default withChats(ChatPage);
