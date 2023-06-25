export type APIError = {
    reason: string;
};

export type Token = {
    token: string;
}

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

export type ChatMessageDTO = {
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
    last_message?: ChatMessageDTO;
}

export type ChatsDTO = ChatDTO[] | [];

export type FileDTO = {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };

  export type MessageDTO = {
    id: number;
    is_read: boolean | null;
    chat_id: number | null;
    time: string;
    type: 'message' | 'file';
    user_id: number;
    content: string;
    file: FileDTO | null;
  };
