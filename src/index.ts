import { NavigationPage } from "./pages/navigation";
import { LoginPage } from "./pages/login";
import { SigninPage } from "./pages/signin";
import { ErrorPage } from "./pages/error";
import { ProfilePage } from "./pages/profile";
import renderDom from "./utils/renderDom";
import { EditProfilePage } from "./pages/edit-profile";
import { ChangePasswordPage } from "./pages/change-password";
import { ChatPage } from "./pages/chat";
import { IConversation } from "./components/conversation";

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
    /*conversation: ({
      name: "Вадим",
      avatarURL: "../../../static/cat.jpeg",
      data: [
        date: string,
        messages: [
          type: 'text',
          time: '12:01',
          isMine: false,
          content: {
            text: 'Hello',
            url: null,
            width: null,
            height: null
          }
        ]
      ]
    }) as IConversation*/
    // convData: {},
    chatItems: [
      {
        name: 'чат 1',
        lastActivity: '20:55',
        isMine: false,
        text: 'Hello world...',
        counter: '1'
      },
      {
        name: 'чат 2',
        lastActivity: '20:45',
        isMine: true,
        text: 'Oh my gosh!'
      },
      {
        name: 'чат 3',
        lastActivity: '20:35',
        isMine: false,
        text: "It's alive!",
        counter: '3'
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
