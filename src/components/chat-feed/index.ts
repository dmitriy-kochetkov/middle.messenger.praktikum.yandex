import Block from '../../utils/Block';
import template from './chat-feed.hbs'

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

type MessageType = 'text' | 'image';

type MessageContent = {
  text: string | null,
  url: string | null,
  width: string | null,
  height: string | null
};

type TMessage = {
  type: MessageType,
  time: string,
  isMine: boolean,
  content: MessageContent
}

type TChatFeedData = {
  date: string,
  messages: TMessage[]
}

interface IChatFeedProps {
  data: TChatFeedData
}

export class ChatFeed extends Block {
  constructor(props: IChatFeedProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props);
  }
}
