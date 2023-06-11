import Block from '../../core/Block';
import template from './navigation.hbs';

export type Link = {
    link: string;
    label: string;
};

export interface INavigationPageProps {
    pages: Link[];
}

export class NavigationPage extends Block {
    constructor(props: INavigationPageProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
