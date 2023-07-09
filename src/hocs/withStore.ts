import Block from '../core/Block/Block';
import { StoreEvents } from '../core/Store';
import { AppState, store } from '../store';

export function withStore<SP>(mapStateToProps: (state: AppState) => SP) {
    return function wrap<P>(Component: typeof Block<any>) {
        return class WithStore extends Component {
            constructor(props: Omit<P, keyof SP>) {
                let previousState = mapStateToProps(store.getState());
                super({ ...(props as P), ...previousState });
                store.on(StoreEvents.Updated, () => {
                    const stateProps = mapStateToProps(store.getState());
                    previousState = stateProps;
                    this.setProps({ ...stateProps });
                });
            }
        };
    };
}
