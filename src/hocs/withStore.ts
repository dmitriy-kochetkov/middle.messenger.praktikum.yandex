import { BlockClass } from "../core/Block";
import { Store, StoreEvents } from "../core/Store";
import { AppState } from "../store";
// import store from "../core/Store";
import { store } from "../store";

type WithStateProps = { store: Store<AppState> };

export function withStore<P extends WithStateProps>(WrappedBlock: BlockClass<P>) {
    // @ts-expect-error No base constructor has the specified
    return class extends WrappedBlock<P> {

        constructor(props: P) {
            super({ ...props,store: store });
        }

        __onChangeStoreCallback = () => {
            // @ts-expect-error this is not typed
            this.setProps({ ...this.props, store: store });
        }

        componentDidMount(props: P) {
            super.componentDidMount(props);
            store.on(StoreEvents.Updated, this.__onChangeStoreCallback);
        }

        componentWillUnmount() {
            super.componentWillUnmount();
            store.off(StoreEvents.Updated, this.__onChangeStoreCallback);
        }

    } as BlockClass<Omit<P, 'store'>>;
}
