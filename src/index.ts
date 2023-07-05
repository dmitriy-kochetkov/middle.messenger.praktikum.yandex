import './styles/styles.pcss';

import { initApp } from "./controllers/initApp";
import { StoreEvents } from "./core/Store";
import { initRouter } from "./router";
import { store } from "./store";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

window.addEventListener('DOMContentLoaded', async () => {
    store.on(StoreEvents.Updated, (prevState, nextState) => {
        if(!prevState.appIsInited && nextState.appIsInited) {
            initRouter(store);
        }
        // console.log(
        //     '%cstore updated',
        //     'background: #222; color: #bada55',
        //     nextState,
        // );
    });

    store.dispatch(initApp);
});
