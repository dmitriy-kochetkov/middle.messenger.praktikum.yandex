import { User } from "./api/AuthAPI";
import { HashRouter } from "./core/HashRouter";
import { Store, StoreEvents } from "./core/Store";
import { Screens, getScreenComponent } from "./utils/screenList";
import renderDOM from './core/renderDOM';

const routes = [
    {
        path: '#login',
        block: Screens.Login,
        shouldAuthorized: false,
    },
    {
        path: '#chat',
        block: Screens.Chat,
        shouldAuthorized: true,
    },
    {
        path: '#profile',
        block: Screens.Profile,
        shouldAuthorized: true,
    },
    {
        path: '*',
        block: Screens.Chat,
        shouldAuthorized: true,
    },
];

export interface AppState {
    loginFormError: string | null;
    user: User | null;
}

export function initRouter(router: HashRouter, store: Store<AppState>) {
    routes.forEach(route => {
        router.use(route.path, () => {
            const isAuthorized = Boolean(store.getState().user);
            const currentScreen = Boolean(store.getState().screen);

            if (isAuthorized || !route.shouldAuthorized) {
                store.dispatch({ screen: route.block });
                return;
            }

            if (!currentScreen) {
                console.log('go to home');
                store.dispatch({ screen: Screens.Login });
            }
        });
    });

    /**
     * Глобальный слушатель изменений в сторе
     * для переключения активного экрана
     */
    store.on(StoreEvents.Updated, (prevState, nextState) => {
        if (!prevState.appIsInited && nextState.appIsInited) {
            router.start();
        }

        if (prevState.screen !== nextState.screen) {
            const Page = getScreenComponent(nextState.screen);
            renderDOM(new Page({}));
        }
    });
    }
