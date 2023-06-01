import { TListeners, TEventHandler } from './types';

export class EventBus {
    private readonly listeners: TListeners;

    constructor() {
        this.listeners = {};
    }

    on(event:string, callback: TEventHandler): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event:string, callback: TEventHandler): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event]
            .filter((listener) => listener !== callback);
    }

    emit(event:string, ...args: Array<unknown>): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
    }
}
