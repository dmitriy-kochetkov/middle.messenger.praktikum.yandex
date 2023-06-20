export type APIError = {
    reason: string;
};

export type UserDTO = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
};

// export type MessageUserDTO = {
//     login: string;
//     first_name: string;
//     second_name: string;
//     display_name: string;
//     avatar: string;
//     phone: string;
//     email: string;
// }

export type MessageDTO = {
    id: number;
    time: string;
    content: string;
    user: UserDTO;
}

export type ChatDTO = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message?: MessageDTO;
}

export type ChatsDTO = ChatDTO[] | [];
