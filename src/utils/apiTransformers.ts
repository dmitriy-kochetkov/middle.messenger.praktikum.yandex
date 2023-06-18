import { ChatDTO, MessageDTO, UserDTO } from '../api/types';

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
    user: User;
    time: string;
    content: string;
}

export const transformMessage = (data: MessageDTO): Message => {
    return {
        user: transformUser(data.user as UserDTO),
        time: data.time,
        content: data.content
    }
}

export type Chat = {
    id: number;
    title: string;
    avatar: string;
    unreadCount: number;
    lastMessage: Message;
}

export type Chats = Chat[] | [];

export const transformChats = (data: ChatDTO[]): Chats => {
    const result = [] as Chat[];
    data.forEach((chat: ChatDTO) => {
        result.push({
            id: chat.id,
            title: chat.title,
            avatar: chat.avatar,
            unreadCount: chat.unread_count,
            lastMessage: transformMessage(chat.last_message as MessageDTO),
        })
}   );
    return result;
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
