import Block from '../../utils/Block';
import template from './chat-item.hbs'

interface IChatItemProps {
  avatarURL: string | null,
  name: string,
  lastActivity: string,
  isMine: boolean,
  text: string,
  counter: string | null
}

export class ChatItem extends Block {
  constructor(props: IChatItemProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props);
  }
}
