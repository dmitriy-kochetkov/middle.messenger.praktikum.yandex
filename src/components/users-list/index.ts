import Block from '../../core/Block';
import { withStore } from '../../hocs/withStore';
import { User } from '../../utils/apiTransformers';
import { extractFirstWords } from '../../utils/extractFirstWords';
import { getAvatarLink } from '../../utils/getAvatarLink';
import { Avatar } from '../avatar/avatar';
import { UserItem } from '../user-item';
import template from './users-list.hbs';

export interface IUsersList {
    users: User[],
}

export class UsersList extends Block {
    constructor(props: IUsersList) {
        super(props);
    }

    init() {
        this.children.users = this.createUsers(this.props.users);
    }

    render() {
        return this.compile(template, this.props);
    }

    protected componentDidUpdate(oldProps: any, newProps: any): boolean {
        const shouldUpdate = super.componentDidUpdate(oldProps, newProps);
        if (shouldUpdate) {
            this.children.users = this.createUsers(newProps.users);
        }
        return shouldUpdate;
    }

    private createUsers(users: User[]): UserItem[] {
        return users.map(user => {
            let name = `${user.firstName} ${user.secondName}`;
            if (!name.trim()) {
                name = user.displayName
            }

            name = extractFirstWords(name, 20);

            return new UserItem({
                avatar: new Avatar({
                    size: 's',
                    avatarURL: getAvatarLink(user.avatar),
                }),
                name: name,
                selected: false,
                id: user.id,
            });
        });
    }

    public getSelectedUsers(): number[] {
        return (this.children.users as UserItem[])
            .filter(userItem => userItem.isSelected())
            .map(userItem => userItem.getUserID());
    }
}

const withUsers = withStore((state)=> ({
    users: state.users,
}))

export default withUsers(UsersList);
