import Block from "../core/Block";
import Router from "../core/Router";

export function withRouter(Component: typeof Block) {
    type Props = any

    return class WithRouter extends Component {
        constructor(props: Props & PropsWithRouter) {
            super({ ...props, router: Router });
        }
    }
}

export interface PropsWithRouter {
    router: typeof Router;
}
