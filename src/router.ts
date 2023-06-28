import { Router } from "./core/Router/Router";
import { Store } from "./core/Store";
import { AppState } from "./store";
import LoginPage from "./pages/login";
import ProfilePage from './pages/profile';
import SigninPage from './pages/signin';
import EditProfilePage from './pages/edit-profile';
import ChangePasswordPage from './pages/change-password';
import ChatPage from './pages/chat';

export const router = new Router('#app')

enum Routes {
    Index = "/",
    SignUp = "/sign-up",
    Messenger = "/messenger",
    Profile = "/settings",
    EditProfile = '/settings/changeData',
    ChangePassword = '/settings/changePassword' // ChangePasswordPage
}

export function initRouter(store: Store<AppState>) {
    router
      .use({
        pathname: '/',
        block: LoginPage,
      })
      .use({
        pathname: '/sign-up',
        block: SigninPage,
      })
      .use({
        pathname: '/settings',
        block: ProfilePage,
        needAuth: true,
        redirectPath: Routes.Index,
        onUnautorized: () => Boolean(store.getState().user),
      })
      .use({
        pathname: '/settings/changeData',
        block: EditProfilePage,
        needAuth: true,
        redirectPath: Routes.Index,
        onUnautorized: () => Boolean(store.getState().user),
      })
      .use({
        pathname: '/settings/changePassword',
        block: ChangePasswordPage,
        needAuth: true,
        redirectPath: Routes.Index,
        onUnautorized: () => Boolean(store.getState().user),
      })
      .use({
        pathname: '/messenger',
        block: ChatPage,
        needAuth: true,
        redirectPath: Routes.Index,
        onUnautorized: () => Boolean(store.getState().user),
      })
      .start();
  }
