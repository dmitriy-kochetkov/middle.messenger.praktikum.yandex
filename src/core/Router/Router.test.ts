import sinon from "sinon";
import { assert } from "chai";
import Block from "../Block";
import { Router, TRouteConstructor } from "./Router";
import Route from "./Route";

const routerFactory = () => new Router('#app');

describe('Router', () => {
    let BlockMock: Block;

    let getContentFake = sinon.fake.returns(document.createElement('div'));

    let destroyFake = sinon.fake();

    let routeParams: TRouteConstructor;

    beforeEach(() => {
        getContentFake = sinon.fake.returns(document.createElement('div'));
        destroyFake = sinon.fake();

        BlockMock = class {
            getContent = getContentFake;
            destroy = destroyFake;
        } as unknown as Block

        routeParams = {
            block:  BlockMock,
            exact: true,
            needAuth: false,
            onUnautorized: () => true,
            pathname: '/',
            props: {},
            redirectPath: '/'
        }
    })

    it('Метод use() должен вернуть инстанс роутера', () => {
        const router = routerFactory();

        const result = router.use(routeParams);

        assert.equal(result, router);
    });

    it('Должен отрисовать страницу после запуска роутера', () => {
        const router = routerFactory();

        router.use(routeParams).start();

        assert.equal(getContentFake.callCount, 1);
    });

    it('Метод back() должен осуществить возврат на предыдущую страницу с помощью History API', () => {
        const backFake = sinon.fake();
        window.history.back = backFake;
        const router = routerFactory();

        router.use(routeParams).start();
        router.back();

        assert.equal(backFake.callCount, 1);
    });

    it('Должен отрисовать страницу после перехода "назад" через History API', () => {
        const router = routerFactory();

        router.use(routeParams).start();
        router.back();

        assert.equal(getContentFake.callCount, 1);
    });

    it('Метод forward() должен осуществить возврат на предыдущую страницу с помощью History API', () => {
        const forwardFake = sinon.fake();
        window.history.forward = forwardFake;
        const router = routerFactory();

        router.use(routeParams).start();
        router.forward();

        assert.equal(forwardFake.callCount, 1);
    });

    it('Должен отрисовать страницу после перехода "вперед" через History API', () => {
        const router = routerFactory();

        router.use(routeParams).start();
        router.forward();

        assert.equal(getContentFake.callCount, 1);
    });

    it('Должен перенаправлять пользователя со страницы, требующей авторизации если пользователь не авторизован', () => {
        const router = routerFactory();
        const onUnautorizedFalse = () => false;

        const routeParams2: TRouteConstructor = {
            block:  BlockMock,
            exact: true,
            needAuth: true,
            onUnautorized: onUnautorizedFalse,
            pathname: '/authtest',
            props: {},
            redirectPath: '/'
        };

        router.use(routeParams).use(routeParams2).start();
        router.go('/authtest')

        assert.equal(window.location.pathname, '/');
    });

    describe('Метод getRoute()', () => {
        it('Должен возвращать инстант Route по зарегистрированному пути', () => {
            const router = routerFactory();

            router.use(routeParams);

            const route = router.getRoute('/');

            assert.isTrue(route instanceof Route);
        });

        it('Должен возвращать undefined по не зарегистрированному пути', () => {
            const router = routerFactory();

            router.use(routeParams);

            const route = router.getRoute('/inregistered');

            assert.isUndefined(route);
        });
    })

    describe('Метод go()', () => {
        it('Должен добавить новую страницу в History', () => {
            const pushStateFake = sinon.fake();
            window.history.pushState = pushStateFake;
            const router = routerFactory();

            router.use(routeParams).start();
            router.go('/test');

            assert.equal(pushStateFake.callCount, 1);
        });

        it('Должен вызвать destroy у текущего компонента страницы при переходе по зарегистрированному пути', () => {
            const router = routerFactory();

            const params2: TRouteConstructor = {
                block:  BlockMock,
                exact: true,
                needAuth: true,
                onUnautorized: () => true,
                pathname: '/test',
                props: {},
                redirectPath: '/'
            };

            router.use(routeParams).use(params2).start();
            router.go('/test');

            assert.equal(destroyFake.callCount, 1);
        });

        it('Не должен вызвать destroy у текущего компонента страницы при переходе по не зарегистрированному пути', () => {
            const router = routerFactory();

            const params2: TRouteConstructor = {
                block:  BlockMock,
                exact: true,
                needAuth: true,
                onUnautorized: () => true,
                pathname: '/test',
                props: {},
                redirectPath: '/'
            };

            router.use(routeParams).use(params2).start();
            router.go('/test-unregistered');

            assert.equal(destroyFake.callCount, 0);
        });
    });
});
