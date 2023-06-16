import { initApp } from "./controllers/initApp";
import { Store, StoreEvents } from "./core/Store";
// import store from "./core/Store";
import { initRouter } from "./router";
import { AppState, defaultState } from "./store";
import { store } from "./store";

declare global {
    interface Window {
      store: Store<AppState>;
    }
  }

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
