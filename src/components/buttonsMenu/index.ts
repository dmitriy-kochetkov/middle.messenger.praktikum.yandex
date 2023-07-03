import Block from '../../core/Block/Block';
import { Button } from '../button';
import template from './buttonsMenu.hbs';

export interface IButtonsMenuProps {
    buttons: Button[],
    location: 'top' | 'bottom',
}

export class ButtonsMenu extends Block {
    constructor(props: IButtonsMenuProps) {
        super(props);
    }

    init() {
        this.children.buttons = this.props.buttons;
    }

    render() {
        return this.compile(template, this.props);
    }
}
