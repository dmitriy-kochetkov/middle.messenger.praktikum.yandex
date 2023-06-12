import Block from "../core/Block";
import store, {StoreEvents, State} from "../core/Store";

/*
export function withStore<SP>(mapStateToProps: (state: State) => SP) {
    return function wrap<P>(Component: typeof Block | any){
        return class WithStore extends Component {
            constructor(props: Omit<P, keyof SP>) {
                let previousState = mapStateToProps(store.getState());
                super({...(props as P), ...previousState});
                store.on(StoreEvents.Updated, ()=> {
                const stateProps = mapStateToProps(store.getState());
                previousState = stateProps;
                this.setProps({...stateProps})
                })
            }
        }
    }
}*/

// type WithStateProps = { store: Store<AppState> };

export function withStore<P>(Component: typeof Block) {
    type Props = any

    return class extends Component {
        constructor(props: Props) {
            super({ ...props, store: store });
        }

        __onChangeStoreCallback = () => {
            // @ts-expect-error this is not typed
            this.setProps({ ...this.props, store: window.store });
        }

        componentDidMount() {
            super.componentDidMount();
            store.on(StoreEvents.Updated, this.__onChangeStoreCallback);
        }

        componentWillUnmount() {
            super.componentWillUnmount();
            store.off(StoreEvents.Updated, this.__onChangeStoreCallback);
        }
    }
}
