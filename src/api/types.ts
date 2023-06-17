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

export type MessageUserDTO = {
    first_name: string;
    second_name: string;
    avatar: string;
    email: string;
    login: string;
    phone: string;
}

export type MessageDTO = {
    user: MessageUserDTO;
    time: string;
    content: string;
}

export type ChatDTO = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: MessageDTO;
}
