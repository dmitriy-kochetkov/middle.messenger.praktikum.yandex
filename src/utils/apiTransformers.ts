import { ChatDTO, ChatsDTO, MessageDTO, UserDTO } from '../api/types';

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

export type Message = {
    id: number,
    time: string;
    content: string;
    user: User;
}

export const transformMessage = (data: MessageDTO): Message => {
    return {
        id: data.id,
        time: data.time,
        content: data.content,
        user: transformUser(data.user as UserDTO),
    }
}

export type Chat = {
    id: number;
    title: string;
    avatar: string;
    unreadCount: number;
    lastMessage: Message;
}

export type ChatX = {
    id: number;
    title: string;
    avatar: string;
    unreadCount: string;
    messageTime: string;
    content: string;
    isMine: boolean;
}

export type Chats = Chat[] | [];

export const transformChats = (data: ChatsDTO): Chats => {
    // const result = [] as Chat[];
    // data.forEach((chat: ChatDTO) => {
    //     result.push({
    //         id: chat.id,
    //         title: chat.title,
    //         avatar: chat.avatar,
    //         unreadCount: chat.unread_count,
    //         lastMessage: {
    //             id: chat.last_message.id,
    //             time: chat.last_message.time,
    //             content: chat.last_message.content,
    //             user: {
    //                 id: chat.last_message.user.id,
    //                 login: chat.last_message.user.login,
    //                 firstName: chat.last_message.user.first_name,
    //                 secondName: chat.last_message.user.second_name,
    //                 displayName: chat.last_message.user.display_name,
    //                 avatar: chat.last_message.user.avatar,
    //                 phone: chat.last_message.user.phone,
    //                 email: chat.last_message.user.email,
    //             },
    //         },
    //     })
    // );
    //return result;

    return data.map((chat: ChatDTO) => ({
        id: chat.id,
        title: chat.title,
        avatar: chat.avatar,
        unreadCount: chat.unread_count,
        lastMessage: {
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
        },
    }));
}


// {
//     "id": 12998,
//     "title": "New Chat [X]",
//     "avatar": null,
//     "created_by": 1045886,
//     "unread_count": 0,
//     "last_message": {
//         "user": {
//             "first_name": "Carl",
//             "second_name": "Jonson",
//             "display_name": "CJ",
//             "login": "cj_",
//             "avatar": "/eeb54410-c767-4ddb-a835-5a98298e7d73/13cffd81-4502-423a-91a6-20369bebc8e9_cj.jpeg",
//             "email": "cj@sa-mail.cg",
//             "phone": "+72223334455"
//         },
//         "time": "2023-06-14T12:06:42+00:00",
//         "content": "new message",
//         "id": 159588
//     }
// }

// [
//     {
//       "id": 123,
//       "title": "my-chat",
//       "avatar": "/123/avatar1.jpg",
//       "unread_count": 15,
//       "last_message": {
//         "user": {
//           "first_name": "Petya",
//           "second_name": "Pupkin",
//           "avatar": "/path/to/avatar.jpg",
//           "email": "my@email.com",
//           "login": "userLogin",
//           "phone": "8(911)-222-33-22"
//         },
//         "time": "2020-01-02T14:22:22.000Z",
//         "content": "this is message content"
//       }
//     }
//  ]
