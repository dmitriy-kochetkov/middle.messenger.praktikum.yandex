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

export function initRouter(store: Store<AppState>) {
    router
      .use({
        pathname: ROUTES.Index,
        // @ts-expect-error
        block: LoginPage,
      })
      .use({
        pathname: ROUTES.Signup,
        // @ts-expect-error
        block: SigninPage,
      })
      .use({
        pathname: ROUTES.Page404,
        // @ts-expect-error
        block: Page404,
      })
      .use({
        pathname: ROUTES.Profile,
        // @ts-expect-error
        block: ProfilePage,
        needAuth: true,
        redirectPath: ROUTES.Index,
        onUnautorized: () => Boolean(store.getState().user),
      })
      .use({
        pathname: ROUTES.EditProfile,
        // @ts-expect-error
        block: EditProfilePage,
        needAuth: true,
        redirectPath: ROUTES.Index,
        onUnautorized: () => Boolean(store.getState().user),
      })
      .use({
        pathname: ROUTES.ChangePassword,
        // @ts-expect-error
        block: ChangePasswordPage,
        needAuth: true,
        redirectPath: ROUTES.Index,
        onUnautorized: () => Boolean(store.getState().user),
      })
      .use({
        pathname: ROUTES.Chat,
        // @ts-expect-error
        block: ChatPage,
        needAuth: true,
        redirectPath: ROUTES.Index,
        onUnautorized: () => Boolean(store.getState().user),
      })
      .start();
  }
