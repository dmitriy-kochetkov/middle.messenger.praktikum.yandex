import { BlockClass } from "../core/Block";
import { Router } from '../core/Router/Router';
import { router } from '../router'

type WithRouterProps = { router: Router }

export function withRouter<P extends WithRouterProps>(WrappedBlock: BlockClass<P>) {
    // @ts-expect-error No base constructor has the specified number of type arguments
    return class extends WrappedBlock<P> {
        public static componentName = WrappedBlock.componentName || WrappedBlock.name;

        constructor(props: P) {
            super({ ...props, router: router });
        }
    } as BlockClass<Omit<P, 'router'>>;
}
