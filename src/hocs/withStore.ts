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

// export function withStore<SP extends Record<string,any>>(mapStateToProps: (state: AppState) => SP) {
//     return function wrap<P extends Record<string,any>>(Component: typeof Block<SP>) {
//         return class WithStore extends Component {

//             constructor(props: Omit<P, keyof SP>) {
//                 let previousState = mapStateToProps(store.getState());

//                 super({ ...(props as P), ...previousState });

//                 store.on(StoreEvents.Updated, () => {
//                     const stateProps = mapStateToProps(store.getState());

//                     previousState = stateProps;

//                     this.setProps({ ...stateProps });
//                 });
//             }
//         };
//     };
// }

// export function withStore2<SP>(mapStateToProps: (state: AppState) => SP ) {
//     return function wrap<P>(Component: typeof Block<SP & P>){

//       return class WithStore extends Component {

//         constructor(props: Omit<P, keyof SP>) {
//           let previousState = mapStateToProps(store.getState());

//           super({ ...(props as P), ...previousState });

//           store.on(StoreEvents.Updated, () => {
//             const stateProps = mapStateToProps(store.getState());

//             previousState = stateProps;

//             this.setProps({ ...stateProps });
//           });

//         }

//       }

//     }
//   }

// const withStore = (
//     mapStateToProps: (state: AppState) => SP,
// ) => (Component: typeof Block) => class extends Component {
//     constructor(props: TProps) {
//         let state = mapStateToProps(store.getState());

//         super({ ...props, ...state });

//         store.on(StoreEvents.Updated, () => {
//             const newState = mapStateToProps(store.getState());

//             if (!deepEquals(state, newState)) {
//                 this.setProps({ ...newState });
//             }

//             state = newState;
//         });
//     }
// };
