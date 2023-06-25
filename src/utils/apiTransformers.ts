import { ChatDTO, ChatsDTO, ChatMessageDTO, UserDTO, MessageDTO, FileDTO } from '../api/types';
import { bytesToString } from './bytesToString';

export type User = {
  id: number;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  avatar: string;
  phone: string;
  email: string;
};

export const transformUser = (data: UserDTO): User => {
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
  };
};

export const transformUsers = (data: UserDTO[]): User[] => {
    return data.map((user) => transformUser(user));
    // return {
    //   id: data.id,
    //   login: data.login,
    //   firstName: data.first_name,
    //   secondName: data.second_name,
    //   displayName: data.display_name,
    //   avatar: data.avatar,
    //   phone: data.phone,
    //   email: data.email,
    // };
  };

export type ChatMessage = {
    id: number,
    time: string;
    content: string;
    user: User;
}

// export const transformMessage = (data: ChatMessageDTO): ChatMessage => {
//     return {
//         id: data.id,
//         time: data.time,
//         content: data.content,
//         user: transformUser(data.user as UserDTO),
//     }
// }

export type Chat = {
    id: number;
    title: string;
    avatar: string;
    unreadCount: number;
    lastMessage: ChatMessage | null;
}

export type Chats = Chat[] | [];

export const transformChats = (data: ChatsDTO): Chats => {
    return data.map((chat: ChatDTO) => ({
        id: chat.id,
        title: chat.title,
        avatar: chat.avatar,
        unreadCount: chat.unread_count,

        lastMessage:
            chat.last_message !== null && chat.last_message !== undefined
            ? {
                id: chat.last_message.id,
                time: chat.last_message.time,
                content: chat.last_message.content,
                user: {
                    id: chat.last_message.user.id,
                    login: chat.last_message.user.login,
                    firstName: chat.last_message.user.first_name,
                    secondName: chat.last_message.user.second_name,
                    displayName: chat.last_message.user.display_name,
                    avatar: chat.last_message.user.avatar,
                    phone: chat.last_message.user.phone,
                    email: chat.last_message.user.email,
                },
            }
            : null
    }));
}

export type File = {
    id: number;
    userId: number;
    path: string;
    filename: string;
    contentType: string;
    contentSize: string;
    uploadDate: string;
};

export const transformFile = (data: FileDTO): File => {
    return {
        id: data.id,
        userId: data.user_id,
        path: data.path,
        filename: data.filename,
        contentType: data.content_type,
        contentSize: bytesToString(data.content_size),
        uploadDate: data.upload_date
    }
}

export type Message = {
    chatId: number;
    time: string;
    type: string;
    userId: number;
    content: string;
    file: File;
};

export const transformMessage = (data: MessageDTO): Message => {
    return {
        chatId: data.chat_id,
        time: data.time,
        type: data.type,
        userId: data.user_id,
        content: data.content,
        file: transformFile(data.file as FileDTO),
    };
}
