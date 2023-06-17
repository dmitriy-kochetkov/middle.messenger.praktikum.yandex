import { v4 as uuidv4 } from 'uuid';
import { EventBus } from './EventBus';
import { EVENTS } from './constants';
// import { deepEqual } from '../utils/deepEqual';
import isEqual from '../utils/isEqual';

export interface BlockClass<P extends Record<string, any>> extends Function {
    new (props: P): Block<P>;
    componentName?: string;
}

class Block<P extends Record<string, any> = any> {
    private id: string;

    protected readonly props: P;

    protected children: Record<string, Block | Block[]>;

    private eventBus: () => EventBus;

    private _element!: HTMLElement;

    constructor(propsWithChildren: P) {
        const eventBus = new EventBus();

        const { props, children } = this._getChildrenAndProps(propsWithChildren);

        this.children = children;
        this.id = uuidv4();
        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(EVENTS.INIT);
    }

    private _getChildrenAndProps(childrenAndProps: P):
    { props: P, children: Record<string, Block | Block[]> } {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { props: props as P, children };
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(EVENTS.INIT, this._init.bind(this));
        eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
        eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _addEvents(): void {
        const { events } = this.props;

        if (events) {
            Object.entries(events as Record<string, () => void>)
                .forEach(([eventName, callback]) => {
                    this._element.addEventListener(eventName, callback);
                });
        }
    }

    private _checkInDOM(): void {
        const elementInDOM = document.body.contains(this._element);

        if (elementInDOM) {
            setTimeout(() => this._checkInDOM(), 1000);
            return;
        }

        this.eventBus().emit(EVENTS.FLOW_CWU, this.props);
    }

    private _removeEvents(): void {
        const { events } = this.props;

        if (events) {
            Object.entries(events as Record<string, () => void>)
                .forEach(([eventName, callback]) => {
                    this._element.removeEventListener(eventName, callback);
                });
        }
    }

    private _createResources(): void {
        const tagName = 'div';
        this._element = this._createDocumentElement(tagName);
    }

    private _init(): void {
        this._createResources();

        this.init();

        this.eventBus().emit(EVENTS.FLOW_RENDER);
    }

    protected init(): void {}

    private _componentDidMount(): void {
        this._checkInDOM();
        this.componentDidMount();
    }

    protected componentDidMount(): void {}

    public dispatchComponentDidMount() {
        this.eventBus().emit(EVENTS.FLOW_CDM);

        Object.values(this.children).forEach(child => {
            if (Array.isArray(child)) {
                child.forEach(ch => ch.dispatchComponentDidMount());
            } else {
                child.dispatchComponentDidMount()
            }
        });
    }

    private _componentDidUpdate(oldProps: P, newProps: P): void {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(oldProps: P, newProps: P): boolean {
        return true;
        //return !isEqual(oldProps, newProps);
    }

    private _componentWillUnmount(): void {
        this.eventBus().destroy();
        this.componentWillUnmount();
    }

    public componentWillUnmount(): void {}

    public setProps = (nextProps: P) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    private _render(): void {
        const fragment = this.render();

        this._removeEvents();

        const newElement = fragment.firstElementChild as HTMLElement;
        this._element!.replaceWith(newElement);
        this._element! = newElement;

        this._addEvents();
    }

    protected compile(template: (contex: any) => string, contex: any) {
        const contextAndStubs = { ...contex };

        Object.entries(this.children).forEach(([name, component]) => {
            if (Array.isArray(component)) {
                contextAndStubs[name] = component
                    .map((componentItem) => `<div data-id="${componentItem.id}"></div>`);
            } else {
                contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
            }
        });

        const html = template(contextAndStubs);
        const temp = document.createElement('template');
        temp.innerHTML = html;

        const replaceStubToComponent = (component: Block) => {
            const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

            if (!stub) {
                return;
            }

            component.getContent()?.append(...Array.from(stub.childNodes));

            stub.replaceWith(component.getContent()!);
        };

        Object.entries(this.children).forEach(([_, component]) => {
            if (Array.isArray(component)) {
                component.forEach((componentItem) => replaceStubToComponent(componentItem));
            } else {
                replaceStubToComponent(component);
            }
        });

        return temp.content;
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    getContent(): HTMLElement {
        // Хак, чтобы вызвать CDM только после добавления в DOM
        if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                if (
                    this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
                ) {
                    this.eventBus().emit(EVENTS.FLOW_CDM);
                }
            }, 100);
        }

        return this.element!;
    }

    _makePropsProxy(props: P) {
        const self = this;

        return new Proxy(props, {
            get(target: P, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: P, prop: string, value) {
                const oldTarget = { ...target };
                target[prop as keyof P] = value;

                self.eventBus().emit(EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            },
        });
    }

    private _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    public show(): void {
        this.getContent()!.style.display = 'block';
    }

    public hide(): void {
        this.getContent()!.style.display = 'none';
    }

    public destroy() {
        this._element.remove();
    }
}

export default Block;
