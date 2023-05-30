import { EventBus } from './EventBus';
import { v4 as uuidv4 } from 'uuid';
import { TProps } from './types';
import { EVENTS } from './constants';


class Block {
  private id: string;
  protected props: TProps;
  protected children: Record<string, Block>;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;

  constructor(propsWithChildren: TProps) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.children = children;
    this.id = uuidv4();
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(EVENTS.INIT);
  }

  private _getChildrenAndProps(childrenAndProps: TProps) {
    const props: TProps = {};
    const children: Record<string, Block> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(EVENTS.INIT, this._init.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _addEvents(): void {
    const {events = {}} = this.props as {
        events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
        this._element!.addEventListener(eventName, events[eventName]);
    })
  }

  private _removeEvents(): void {
    const {events = {}} = this.props as { events: Record<string, () => void> };

    if (events) {
      Object.keys(events).forEach(eventName => {
        this._element!.removeEventListener(eventName, events[eventName]);
      })
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

  protected init(): void {
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  protected componentDidMount(): boolean {
    return true;
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) =>
      child.dispatchComponentDidMount()
    );
  }

  private _componentDidUpdate(oldProps: any, newProps: any): void {
    if (this.componentDidUpdate(oldProps, newProps)) {
        this.eventBus().emit(EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
    // TODO: deepEquals
    return true;
  }

   setProps = (nextProps: TProps) => {
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

  protected compile(template: (contex: any) => string, contex: TProps) {
    const contextAndStubs = { ...contex };

    Object.entries(this.children).forEach(([name, component]) => {
        if (Array.isArray(component)) {
            contextAndStubs[name] = component.map(
                (component) => `<div data-id="${component.id}"></div>`
            );
        } else {
            contextAndStubs[name] = `<div data-id="${component.id}"></div>`
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
            component.forEach((component) => replaceStubToComponent(component));
          } else {
            replaceStubToComponent(component);
          }
    })

    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent(): HTMLElement {
    return this.element!;
  }

  _makePropsProxy(props: TProps) {
    const self = this;

    return new Proxy(props, {
        get(target: TProps, prop: string) {
            const value = target[prop];
            return typeof value === 'function' ? value.bind(target) : value;
        },
        set(target: TProps, prop: string, value) {
            const oldTarget = {...target};
            target[prop] = value;

            self.eventBus().emit(EVENTS.FLOW_CDU, oldTarget, target);
            return true;
        },
        deleteProperty() {
            throw new Error('Нет доступа');
        }
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }


  show(): void {
    this.getContent()!.style.display = "block";
  }

  hide(): void {
    this.getContent()!.style.display = "none";
  }
}

export default Block;