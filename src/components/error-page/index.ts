import Block from '../../core/Block/Block';
import template from './error-page.hbs';

export interface IErrorPage {
    errorCode: string,
    messageText: string,
}

export class ErrorPage extends Block {
    constructor(props: IErrorPage) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
