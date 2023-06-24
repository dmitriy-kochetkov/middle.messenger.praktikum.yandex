import Block from '../../core/Block';
import { Button } from '../button';
import template from './message.hbs';

export interface IMessage {
    type: 'message' | 'file',
    time: string,
    content: string,
    url?: string,
    isMine: boolean,
    file?: {
        path: string,
        filename: string,
        contentType: string,
        contentSize: string,
        uploadDate: string,
    }
}

export class Message extends Block {
    private isText: boolean;
    private isImage: boolean;

    constructor(props: IMessage) {
        super(props);
        this.isText = true;
        this.isImage = false;
    }

    init() {
        this.isText = this.props.type === 'message';

        if (this.props.file) {
            this.isImage = this.props.file.contentType.includes('image');
        }

        this.children.buttonDownloadFile = new Button({
            submit: false,
            className: 'message__download-button',
            events: {
                click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    console.log(`download file click`);
                },
            },
        });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            isText: this.isText,
            isImage: this.isImage
        });
    }
}
