import Block from '../../utils/Block';
import template from './error.hbs';

export interface IErrorPage {
    errorCode: string,
    messageText: string,
    link: string,
    linkLabel: string,
}

export class ErrorPage extends Block {
    constructor(props: IErrorPage) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
