import Block from '../../core/Block';
// import { getAvatarLink } from '../../utils/getAvatarLink';
import { Avatar } from '../avatar/avatar';
import template from './user-item.hbs';

export interface IUsersItem {
    id: number,
    avatar: Avatar,
    name: string,
    selected: boolean,
}

export class UserItem extends Block {
    constructor(props: IUsersItem) {
        super(props);
    }

    init() {
        this.props.events = {
            click: () => {
                console.log('click')
                this.toggleSelected();
            }
        };
    }

    render() {
        return this.compile(template, this.props);
    }

    private toggleSelected() {
        const selected = this.props.selected;
        this.setProps({ selected: !selected });
    }

    public isSelected(): boolean {
        return this.props.selected;
    }

    public getUserID(): number {
        return this.props.id;
    }
}
