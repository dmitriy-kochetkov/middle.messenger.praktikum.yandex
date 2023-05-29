import Block from "../../utils/Block";
import { TChatFeedData } from "../chat-feed";
import template from './conversation.hbs';
import { ChatFeed } from "../chat-feed";

export interface IConversation {
  visible: boolean,
  name: string,
  avatarURL?: string
}

// export interface IConversation {
//   convData: IConversationData
// }

export class Conversation extends Block {
  constructor(props: IConversation) {
    super(props)
  }

  protected init(): void {
    //this.children.chatFeed = new ChatFeed(this.props.data);
  }

  render() {
    return this.compile(template, this.props)
  }
}
