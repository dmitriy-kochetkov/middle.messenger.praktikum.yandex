import Block from "../../utils/Block";
import template from './conversation.hbs';
import { ChatFeed, IChatFeedProps } from "../chat-feed";

export interface IConversation {
  name?: string,
  avatarURL?: string,
  chatFeed: IChatFeedProps
}

export class Conversation extends Block {
  constructor(props: IConversation) {
    super(props)
  }

  protected init(): void {
    this.children.chatFeed = new ChatFeed(this.props.chatFeed);
  }

  render() {
    return this.compile(template, this.props)
  }
}
