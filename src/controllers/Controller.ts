import { store } from '../store';
import { router } from '../router';

export class Controller {
    protected store: typeof store;
    protected router: typeof router;

    constructor() {
        this.store = store;
        this.router = router;
    }

}
