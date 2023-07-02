import { Router } from "./core/Router/Router";
import { Store } from "./core/Store";
import { AppState } from "./store";
import LoginPage from "./pages/login";
import ProfilePage from './pages/profile';
import SigninPage from './pages/signin';
import EditProfilePage from './pages/edit-profile';
import ChangePasswordPage from './pages/change-password';
import ChatPage from './pages/chat';
import Page404  from './pages/404';
import { ROUTES } from "./core/constants";

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
        pathname: ROUTES.Index,
        block: LoginPage,
      })
      .use({
        pathname: ROUTES.Signup,
        block: SigninPage,
      })
      .use({
        pathname: ROUTES.Page404,
        block: Page404,
      })
      .use({
        pathname: ROUTES.Profile,
        block: ProfilePage,
        needAuth: true,
        redirectPath: Routes.Index,
        onUnautorized: () => Boolean(store.getState().user),
      })
      .use({
        pathname: ROUTES.EditProfile,
        block: EditProfilePage,
        needAuth: true,
        redirectPath: Routes.Index,
        onUnautorized: () => Boolean(store.getState().user),
      })
      .use({
        pathname: ROUTES.ChangePassword,
        block: ChangePasswordPage,
        needAuth: true,
        redirectPath: Routes.Index,
        onUnautorized: () => Boolean(store.getState().user),
      })
      .use({
        pathname: ROUTES.Chat,
        block: ChatPage,
        needAuth: true,
        redirectPath: Routes.Index,
        onUnautorized: () => Boolean(store.getState().user),
      })
      .start();
  }
