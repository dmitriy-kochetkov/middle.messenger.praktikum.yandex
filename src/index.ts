import { initApp } from "./controllers/initApp";
import { StoreEvents } from "./core/Store";
import { initRouter } from "./router";
import { store } from "./store";

window.addEventListener('DOMContentLoaded', async () => {
    store.on(StoreEvents.Updated, (prevState, nextState) => {
        if(!prevState.appIsInited && nextState.appIsInited) {
            initRouter(store);
        }
        console.log(
            '%cstore updated',
            'background: #222; color: #bada55',
            nextState,
        );
    });

    store.dispatch(initApp);
});
