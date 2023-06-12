// import renderDOM from './core/renderDOM';
// import { NavigationPage } from './pages/navigation';
// import { LoginPage } from './pages/login';
// import { SigninPage } from './pages/signin';
// import { ErrorPage } from './pages/error';
// import { ProfilePage } from './pages/profile';
// import { EditProfilePage } from './pages/edit-profile';
// import { ChangePasswordPage } from './pages/change-password';
// import { ChatPage } from './pages/chat';

// import defaultAvatar from '../static/default-avatar.svg';
// import catAvatar from '../static/cat.jpeg'

// window.addEventListener('DOMContentLoaded', () => {

//     const pages = [
//     {link: '/login', label: 'LogIn'},
//     {link: '/signin', label: 'SignIn'},
//     {link: '/404', label: '404'},
//     {link: '/500', label: '500'},
//     {link: '/chat', label: 'Chat'},
//     {link: '/profile', label: 'Profile'},
//     {link: '/edit-profile', label: 'Edit Profile'},
//     {link: '/change-password', label: 'Change Password'},
//   ]

//   const navigationPage = new NavigationPage({ pages });

//   const loginPage = new LoginPage({inputs: []});

//   const signinPage = new SigninPage({inputs: []});

//   const profilePage = new ProfilePage({userName: 'Иван', inputs: []});

//   const editProfilePage = new EditProfilePage({inputs: []});

//   const changePasswordPage = new ChangePasswordPage({inputs: []});

//   const errorPage404 = new ErrorPage({
//     errorCode: '404',
//     messageText: 'Не туда попали',
//     link: '../signin',
//     linkLabel: 'Ещё не зарегистрированы?',
//   });

//   const errorPage500 = new ErrorPage({
//     errorCode: '500',
//     messageText: 'Мы уже фиксим',
//     link: '../chat',
//     linkLabel: 'Назад к чатам',
//   });

//   const chatPage = new ChatPage({
//     conversation: {
//         name: 'Вадим',
//         defualtAvatarURL: defaultAvatar,
//         chatFeed: {
//             messages: [
//                 {
//                     isText: true,
//                     time: '11:55',
//                     text: 'Привет!',
//                     url: '../../image.png',
//                     width: '320',
//                     height: '240',
//                     isMine: false,
//                     readed: true
//                 },
//                 {
//                     isText: true,
//                     time: '12:05',
//                     text: 'Привет!',
//                     url: '../../image.png',
//                     width: '320',
//                     height: '240',
//                     isMine: true,
//                     readed: true
//                 },
//                 {
//                     isText: true,
//                     time: '12:06',
//                     text: 'Hello!!!',
//                     isMine: false
//                 },
//                 {
//                     isText: true,
//                     time: '12:07',
//                     text: 'Hello, my friend!',
//                     isMine: true,
//                     readed: true
//                 },
//                 {
//                     isText: true,
//                     time: '12:17',
//                     text: 'Hello!!!',
//                     isMine: false
//                 },
//                 {
//                     isText: true,
//                     time: '12:05',
//                     text: 'Hello, my friend!',
//                     isMine: true,
//                     readed: true
//                 }
//             ]
//         }
//     },
//     chatItems: [
//       {
//         name: 'HELLO_WORLD_BOT',
//         lastActivity: '20:17',
//         isMine: false,
//         text: 'Hello world!',
//         counter: '10',
//         defualtAvatarURL: defaultAvatar
//       },
//       {
//         name: 'Марина',
//         avatarURL: catAvatar,
//         lastActivity: 'Вт',
//         isMine: false,
//         text: 'Oh my gosh!',
//         defualtAvatarURL: defaultAvatar
//       },
//       {
//         name: 'Вадим',
//         lastActivity: '19 июня',
//         isMine: true,
//         text: 'Hello, my friend!',
//         defualtAvatarURL: defaultAvatar
//       }
//     ]
//   })


//   switch (window.location.pathname) {
//     case '/login':
//         renderDOM(loginPage);
//         break;
//     case '/signin':
//         renderDOM(signinPage);
//         break;
//     case '/404':
//         renderDOM(errorPage404);
//         break;
//     case '/500':
//         renderDOM(errorPage500);
//         break;
//     case '/chat':
//         renderDOM(chatPage);
//         break;
//     case '/profile':
//         renderDOM(profilePage);
//         break;
//     case '/edit-profile':
//         renderDOM(editProfilePage);
//         break;
//     case '/change-password':
//         renderDOM(changePasswordPage);
//         break;
//     default:
//         renderDOM(navigationPage);
//         break;
// }
// });


// import { HashRouter } from './core/HashRouter';
// import { Store } from './core/Store';
// import { initApp } from './services/initApp';
// import { AppState, defaultState } from './store';
// import { initRouter } from './router';

// declare global {
//     interface Window {
//         store: Store<AppState>;
//         router: HashRouter;
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const store = new Store<AppState>(defaultState);
//     const router = new HashRouter();

//     /**
//      * Помещаем роутер и стор в глобальную область для доступа в хоках with*
//      * @warning Не использовать такой способ на реальный проектах
//      */
//     window.router = router;
//     window.store = store;

//     store.on('changed', (prevState, nextState) => {
//         console.log(
//           '%cstore updated',
//           'background: #222; color: #bada55',
//           nextState,
//         );
//     });

//     /**
//      * Инициализируем роутер
//      */
//     initRouter(router, store);

//     /**
//      * Загружаем данные для приложения
//      */
//     store.dispatch(initApp);
//   });

import AuthController from "./controllers/AuthController"
import Router from "./core/Router"
import ChangePasswordPage from "./pages/change-password"
import { ChatPage } from "./pages/chat"
import EditProfilePage from "./pages/edit-profile"
import { LoginPage } from "./pages/login"
import ProfilePage from "./pages/profile"
import { SigninPage } from "./pages/signin"

enum Routes {
    Index = "/",
    SignUp = "/sign-up",
    Messenger = "/messenger",
    Profile = "/settings",
    EditProfile = '/settings/changeData',
    ChangePassword = '/settings/changePassword'
}

window.addEventListener('DOMContentLoaded', async () => {
    Router
        .use(Routes.Index, LoginPage)
        .use(Routes.SignUp, SigninPage)
        .use(Routes.Messenger, ChatPage)
        .use(Routes.Profile, ProfilePage)
        .use(Routes.EditProfile, EditProfilePage)
        .use(Routes.ChangePassword, ChangePasswordPage);

    let isProtectedRoute = true;

    switch (window.location.pathname) {
        case Routes.Index:
        case Routes.SignUp:
        isProtectedRoute = false;
        break;
    }

    try {
        await AuthController.fetchUser();
        Router.start();
        // if (isProtectedRoute) {
        //     Router.go(Routes.Profile)
        // }
    } catch (e) {
        Router.start();
        if (!isProtectedRoute) {
            Router.go(Routes.Index);
        }
    }
});
