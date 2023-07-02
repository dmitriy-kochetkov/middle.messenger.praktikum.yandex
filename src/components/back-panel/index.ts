import Block from '../../core/Block';
import template from './back-panel.hbs';

interface IBackPanelProps {
    backURL: string
}

export class BackPanel extends Block {
    constructor(props: IBackPanelProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
