import { User } from "../api/AuthAPI";
import { set } from "../utils/helpers";
import { EventBus } from "./EventBus";
import Block from "./Block";

// export type Dispatch<State> = (
//         nextStateOrAction: Partial<State> | Action<State>,
//         payload?: any,
//     ) => void;

// export type Action<State> = (
//         dispatch: Dispatch<State>,
//         state: State,
//         payload: any,
//     ) => void;

// export enum StoreEvents {
//     Updated = 'updated',
// }

// export class Store<State extends Record<string, any>> extends EventBus {
//     private state: State = {} as State;

//     constructor(defaultState: State) {
//         super();

//         this.state = defaultState;
//         this.set(defaultState);
//     }

//     public getState() {
//         return this.state;
//     }

//     public set(nextState: Partial<State>) {
//         const prevState = { ...this.state };

//         this.state = { ...this.state, ...nextState };

//         this.emit(StoreEvents.Updated, prevState, nextState);
//     }

//     dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any) {
//         if (typeof nextStateOrAction === 'function') {
//         nextStateOrAction(this.dispatch.bind(this), this.state, payload);
//         } else {
//         this.set({ ...this.state, ...nextStateOrAction });
//         }
//     }
// }

export interface State {
    user: User,
}

export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    protected state: any = {};

    public getState() {
      return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated, this.getState());
    };
}

const store = new Store()

export default store;
