import Block from '../../utils/Block';
import template from './chat-item.hbs'

export interface IChatItemProps {
  avatarURL?: string,
  name: string,
  lastActivity: string,
  isMine: boolean,
  text: string,
  counter?: string
}

export class ChatItem extends Block {
  constructor(props: IChatItemProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props);
  }
}
