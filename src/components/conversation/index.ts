import Block from '../../core/Block';
import template from './conversation.hbs';
import ChatFeed from '../chat-feed';
import { SendMessageForm } from '../send-message-form';
import { Button } from '../button';
import { Avatar } from '../avatar/avatar';
import { withStore } from '../../hocs/withStore';
import { getAvatarLink } from '../../utils/getAvatarLink';

export interface IConversation {
    activeChatID: number,
    name: string,
    avatar: string,
    setupModal: (options: {isOpen: boolean, title: string, formItems: Block[]}) => void,
}

class Conversation extends Block<IConversation> {

    constructor(props: IConversation) {
        super(props);
    }

    protected init(): void {
        this.children.buttonOptions = new Button({
            submit: false,
            className: 'conversation__options-button',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    console.log(`options click for ${this.props.activeChatID}`);
                    // only for test:
                    this.props.setupModal({
                        isOpen: true,
                        title: 'TEST',
                        formItems: [],
                    });
                },
            },
        });

        this.children.chatFeed = new ChatFeed({});

        this.children.avatar = new Avatar({
            size: 's',
            avatarURL: getAvatarLink(this.props.avatar),
        });

        this.children.sendMessageForm = new SendMessageForm({});
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
}

const withConversation = withStore((state)=> ({
    name: state.activeChat.title,
    avatar: state.activeChat.avatar,
    activeChatID: state.activeChat.id,
}))

export default withConversation(Conversation);
