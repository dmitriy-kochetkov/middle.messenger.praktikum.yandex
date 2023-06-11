import { LoginPage } from '../pages/login';
import { SigninPage } from '../pages/signin';
import { ErrorPage } from '../pages/error';
import { ProfilePage } from '../pages/profile';
import { EditProfilePage } from '../pages/edit-profile';
import { ChangePasswordPage } from '../pages/change-password';
import { ChatPage } from '../pages/chat';
import Block from '../core/Block';

export enum Screens {
  Login = 'login',
  Signin = 'signin',
  Error = 'error',
  Profile = 'profile',
  EditProfile = 'edit-profile',
  ChangePassword = 'change-password',
  Chat = 'chat',
}

const map: Record<Screens, any> = {
  [Screens.Login]: LoginPage,
  [Screens.Signin]: SigninPage,
  [Screens.Error]: ErrorPage,
  [Screens.Profile]: ProfilePage,
  [Screens.EditProfile]: EditProfilePage,
  [Screens.ChangePassword]: ChangePasswordPage,
  [Screens.Chat]: ChatPage,
};

export const getScreenComponent = (screen: Screens): Block => {
  return map[screen];
};
