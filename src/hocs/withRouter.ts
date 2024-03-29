import { BlockClass } from '../core/Block/Block';
import { Router } from '../core/Router/Router';
// eslint-disable-next-line import/no-cycle
import { router } from '../router';

type WithRouterProps = { router: Router };

export function withRouter<P extends WithRouterProps>(WrappedBlock: BlockClass<P>) {
    // @ts-expect-error No base constructor has the specified number of type arguments
    return class extends WrappedBlock<P> {
        constructor(props: P) {
            super({
                ...props,
                router,
            });
        }
    } as BlockClass<Omit<P, 'router'>>;
}
