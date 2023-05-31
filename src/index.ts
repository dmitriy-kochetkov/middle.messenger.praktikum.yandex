import renderDom from "./utils/renderDom";
import { NavigationPage } from "./pages/navigation";
import { LoginPage } from "./pages/login";
import { SigninPage } from "./pages/signin";
import { ErrorPage } from "./pages/error";
import { ProfilePage } from "./pages/profile";
import { EditProfilePage } from "./pages/edit-profile";
import { ChangePasswordPage } from "./pages/change-password";
import { ChatPage } from "./pages/chat";

import defaultAvatar from '../static/default-avatar.svg';
import catAvatar from '../static/cat.jpeg'

window.addEventListener('DOMContentLoaded', () => {

    const pages = [
    {link: '/login', label: 'LogIn'},
    {link: '/signin', label: 'SignIn'},
    {link: '/404', label: '404'},
    {link: '/500', label: '500'},
    {link: '/chat', label: 'Chat'},
    {link: '/profile', label: 'Profile'},
    {link: '/edit-profile', label: 'Edit Profile'},
    {link: '/change-password', label: 'Change Password'},
  ]

  const navigationPage = new NavigationPage({ pages });

  const loginPage = new LoginPage({inputs: []});

  const signinPage = new SigninPage({inputs: []});

  const profilePage = new ProfilePage({userName: "Иван", inputs: []});

  const editProfilePage = new EditProfilePage({inputs: []});

  const changePasswordPage = new ChangePasswordPage({inputs: []});

  const errorPage404 = new ErrorPage({
    errorCode: "404",
    messageText: "Не туда попали",
    link: "../signin",
    linkLabel: "Ещё не зарегистрированы?",
  });

  const errorPage500 = new ErrorPage({
    errorCode: "500",
    messageText: "Мы уже фиксим",
    link: "../chat",
    linkLabel: "Назад к чатам",
  });

  const chatPage = new ChatPage({
    conversation: {
        name: 'Вадим',
        defualtAvatarURL: defaultAvatar,
        chatFeed: {
            messages: [
                {
                    isText: true,
                    time: '11:55',
                    text: 'Привет!',
                    url: '../../image.png',
                    width: '320',
                    height: '240',
                    isMine: false,
                    readed: true
                },
                {
                    isText: true,
                    time: '12:05',
                    text: 'Привет!',
                    url: '../../image.png',
                    width: '320',
                    height: '240',
                    isMine: true,
                    readed: true
                },
                {
                    isText: true,
                    time: '12:06',
                    text: 'Hello!!!',
                    isMine: false
                },
                {
                    isText: true,
                    time: '12:07',
                    text: 'Hello, my friend!',
                    isMine: true,
                    readed: true
                },
                {
                    isText: true,
                    time: '12:17',
                    text: 'Hello!!!',
                    isMine: false
                },
                {
                    isText: true,
                    time: '12:05',
                    text: 'Hello, my friend!',
                    isMine: true,
                    readed: true
                }
            ]
        }
    },
    chatItems: [
      {
        name: 'HELLO_WORLD_BOT',
        lastActivity: '20:17',
        isMine: false,
        text: 'Hello world!',
        counter: '10',
        defualtAvatarURL: defaultAvatar
      },
      {
        name: 'Марина',
        avatarURL: catAvatar,
        lastActivity: 'Вт',
        isMine: false,
        text: 'Oh my gosh!',
        defualtAvatarURL: defaultAvatar
      },
      {
        name: 'Вадим',
        lastActivity: '19 июня',
        isMine: true,
        text: "Hello, my friend!",
        defualtAvatarURL: defaultAvatar
      }
    ]
  })


  switch (window.location.pathname) {
    case '/login':
        renderDom(loginPage);
        break;
    case '/signin':
          renderDom(signinPage);
          break;
    case '/404':
          renderDom(errorPage404);
          break;
    case '/500':
          renderDom(errorPage500);
          break;
    case '/chat':
        renderDom(chatPage);
        break;
    case '/profile':
          renderDom(profilePage);
          break;
    case '/edit-profile':
          renderDom(editProfilePage);
          break;
    case '/change-password':
          renderDom(changePasswordPage);
          break;
    default:
        renderDom(navigationPage);
        break;
}
});
