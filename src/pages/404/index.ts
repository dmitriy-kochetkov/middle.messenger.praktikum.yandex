import Block from '../../core/Block';
import template from './404.hbs';
import { ErrorPage } from "../../components/error-page";

export interface IPage404 {
}

class Page404 extends Block {
    constructor(props: IPage404) {
        super(props);
    }

    protected init(): void {
        this.children.Page404 = new ErrorPage({
            errorCode: '404',
            messageText: 'Не туда попали'
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Page404;
