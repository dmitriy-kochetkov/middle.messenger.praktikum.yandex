import Block from '../../core/Block';
import template from './chat.hbs';
import { Conversation, IConversation } from '../../components/conversation';
import { ChatItem, IChatItemProps } from '../../components/chat-item';
import { Avatar } from '../../components/avatar/avatar';

import { withRouter } from '../../hocs/withRouter';
import { withStore_plus } from '../../hocs/withStore';
import { Button } from '../../components/button';

import ChatsController from '../../controllers/ChatsController';
import { Chats } from '../../utils/apiTransformers';
import { getAvatarLink } from '../../utils/getAvatarLink';
import { extractFirstWords } from '../../utils/extractFirstWords';
import { getPrettyTime } from '../../utils/getPrettyTime';
import { Modal } from '../../components/modal/modal';
import { Input } from '../../components/input';
import { getFormData } from '../../utils/getFormData';
import { CreateChatData } from '../../api/ChatsAPI';
import { notEmpty } from '../../utils/validation';

interface IChatPageProps {
    chats: Chats;
}

class ChatPage extends Block {
    private modalInput: Input;

    private modalSubmit: Button;

    private modalInputValue: string;

    constructor(props: IChatPageProps) {
        super(props);

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
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    console.log('default button click');
                },
            },
        });

        this.modalInputValue = '';
    }

    protected async init() {

        this.children.buttonCreateChat = new Button({
            label: 'Создать чат',
            submit: false,
            className: 'chats_create-button',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    this.createChatClick()
                    // console.log('create chat click');
                },
            },
        });

        this.children.modal = new Modal({
            isOpen: false,
            title: 'Загрузите файл',
            formItems: [],
            // formItems: [
            //     new Input({
            //         name: 'avatar',
            //         type: 'file',
            //         enableErrorMessage: false,
            //         errorMessage: '',
            //         // events: {
            //         //     change: (evt: Event) => {
            //         //         console.log('change image event');
            //         //         const file = (<HTMLInputElement>evt.target).files![0];
            //         //         console.log(file)
            //         //     },
            //         // },
            //     }),
            //     new Button({
            //         label: 'Принять',
            //         submit: false,
            //         className: 'button button_primary button_modal',
            //         events: {
            //             click: (evt: PointerEvent) => {
            //                 evt.preventDefault();
            //                 console.log('modal button click');
            //                 this._confirmModal();
            //             },
            //         },
            //     }),
            // ],
        });

        this.props.conversation = {
            name: '',
            avatar: {},
            chatFeed: {
                messages: [],
            },
        }

        // this.props.conversation = {
        //     name: 'Вадим',
        //     avatar: new Avatar({
        //         size: 's',
        //         avatarURL: catAvatar
        //     }),
        //     chatFeed: {
        //         messages: [
        //             {
        //                 isText: true,
        //                 time: '11:55',
        //                 text: 'Привет!',
        //                 url: '../../image.png',
        //                 width: '320',
        //                 height: '240',
        //                 isMine: false,
        //                 readed: true
        //             },
        //             {
        //                 isText: true,
        //                 time: '12:05',
        //                 text: 'Привет!',
        //                 url: '../../image.png',
        //                 width: '320',
        //                 height: '240',
        //                 isMine: true,
        //                 readed: true
        //             },
        //             {
        //                 isText: true,
        //                 time: '12:06',
        //                 text: 'Hello!!!',
        //                 isMine: false
        //             },
        //             {
        //                 isText: true,
        //                 time: '12:07',
        //                 text: 'Hello, my friend!',
        //                 isMine: true,
        //                 readed: true
        //             },
        //             {
        //                 isText: true,
        //                 time: '12:17',
        //                 text: 'Hello!!!',
        //                 isMine: false
        //             },
        //             {
        //                 isText: true,
        //                 time: '12:05',
        //                 text: 'Hello, my friend!',
        //                 isMine: true,
        //                 readed: true
        //             }
        //         ],
        //     }
        // };

        this.children.chats = this.createChats(this.props.chats);


        this.children.conversation = new Conversation(
            this.props.conversation as IConversation,
        );
    }

    render() {
        console.log(this.props.routerParams);
        return this.compile(template, {...this.props});
    }

    protected async componentDidMount() {
        await ChatsController.getAll({});
    }

    protected componentDidUpdate(oldProps: IChatItemProps, newProps: IChatPageProps) {
        const shouldUpdate = super.componentDidUpdate(oldProps, newProps);
        if (shouldUpdate) {
            this.children.chats = this.createChats(newProps.chats);
        }
        return shouldUpdate;
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
                })
            }
        );
    }

    private isMessageMine(login: String) {
        return login === this.props.userLogin;
    }

    private createChatClick() {
        this.initCreateChatModalForm();
        this.setupCreateChatModal();
    }

    private initCreateChatModalForm() {
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

    private setupCreateChatModal() {
        (this.children.modal as Block).setProps({
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
        const form = document.getElementById('modal-form') as HTMLFormElement;
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
        console.log('focusout');
        this.modalInputValue = this.modalInput.getValue();

        const { isValid, errorMessages } = this.modalInput.validate();

        this.modalInput.setProps({
            value: this.modalInputValue,
            errorMessage: errorMessages![0] ?? undefined,
        });

        this.modalInput.setValidState(isValid);
        this.setupCreateChatModal();
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

const withChats = withStore_plus((state)=> ({
    chats: state.chats,
    chatsError: state.chatsError,
    userLogin: state.user?.login,
}))

export default withChats(withRouter(ChatPage));



// this.props.chatItems = [
        //     {
        //         id: 10,
        //         title: 'HELLO_WORLD_BOT',
        //         messageTime: '20:17',
        //         isMine: false,
        //         content: 'Hello world!',
        //         unreadCount: '10',
        //         avatar: new Avatar({
        //             size: 'm'
        //         })
        //     },
        //     {
        //         id: 15,
        //         title: 'Марина',
        //         messageTime: 'Вт',
        //         isMine: false,
        //         content: 'Oh my gosh!',
        //         avatar: new Avatar({
        //             size: 'm'

        //         })
        //     },
        //     {
        //         id: 20,
        //         title: 'Вадим',
        //         messageTime: '19 июня',
        //         isMine: true,
        //         content: 'Hello, my friend!',
        //         avatar: new Avatar({
        //             size: 'm',
        //             avatarURL: catAvatar
        //         })
        //     }
        // ];
