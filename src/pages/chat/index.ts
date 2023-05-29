import { Conversation, IConversation } from "../../components/conversation";
import {ChatItem, IChatItemProps} from '../../components/chat-item';
import Block from "../../utils/Block";
import template from './chat.hbs'


interface IChat {
  chatItems: IChatItemProps[],
  conversation: IConversation,
}

export class ChatPage extends Block {
  constructor(props: IChat) {
    super(props)
  }

  protected init(): void {
    this.children.chats = this.props.chatItems.map((props: IChatItemProps) => new ChatItem(props));
    this.children.conversation = new Conversation(this.props.conversation as IConversation);
  }

  render() {
    return this.compile(template, this.props);
  }
}

/*
{{> chat-item/chat-item name="Андрей" lastActivity="12:00" text="Изображение" counter="2" }}
{{> chat-item/chat-item name="Киноклуб" lastActivity="10:55" isMine=true text="стикер" }}
{{> chat-item/chat-item name="Илья" lastActivity="12:00" text="Друзья, у меня для вас особенный выпуск новостей!..." counter="5" }}
{{> chat-item/chat-item name="Вадим" lastActivity="Пт" isMine=true text="Круто же?" }}
{{> chat-item/chat-item name="тет-а-теты" lastActivity="Ср" isMine=true text="И Human Interface Guidelines и Material Design рекомендуют..."}}
{{> chat-item/chat-item name="1, 2, 3" lastActivity="Пн" text="Миллионы россиян ежедневно проводят десятки часов свое..."}}
{{> chat-item/chat-item name="Crazy Kitty" lastActivity="12:00" text="Meow meow meow meow meow meow..." counter="10" avatarURL="../../../static/cat.jpeg"}}
{{> chat-item/chat-item name="Алексей" lastActivity="18 марта" text="стикер" }}
{{> chat-item/chat-item name="Николай" lastActivity="10 ноября" text="стикер"}}
{{> chat-item/chat-item name="Алёна" lastActivity="16 августа" text="стикер"}}
{{> chat-item/chat-item name="Карлос" lastActivity="10 мая" text="стикер"}}
{{> chat-item/chat-item name="Джонни" lastActivity="17 апреля 2022" text="стикер" }}
{{> chat-item/chat-item name="Василий" lastActivity="18 января 2022" isMine=true text="стикер" }}
{{> chat-item/chat-item name="Денис" lastActivity="9 октября 2021" isMine=true text="Привет друг! Давно не виделись..."}}
{{> chat-item/chat-item name="Аня" lastActivity="17 июля 2020" text="Не пиши мне больше!"}}



{{> conversation/conversation conversation=conversation data=conversation.data}}
*/
