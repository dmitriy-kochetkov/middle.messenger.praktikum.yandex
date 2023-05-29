import Block from '../../utils/Block';
import { IMessage, Message } from '../message';
import template from './chat-feed.hbs'

export interface IChatFeedProps {
    messages: IMessage[],
}

export class ChatFeed extends Block {
  constructor(props: IChatFeedProps) {
    super(props)
  }

  protected init(): void {
    this.children.messages = this.props.messages.map((props: IMessage) => new Message(props));
  }

  render() {
    return this.compile(template, this.props);
  }
}

/*
{
  "data": [
    {
      "date": "19 июня",
      "messages": [
        {
          "type": "text",
          "time": "11:56",
          "isMine": false,
          "content": {
            "text": "Привет!"
          }
        },
        {
          "type": "image",
          "time": "11:56",
          "isMine": false,
          "content": {
            "url": "../../static/image.png",
            "width": "230",
            "height": "130"
          }
        }
      ]
    }
  ]
}
*/
