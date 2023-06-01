export type TEventHandler = (...payload: Array<unknown>) => void

export type TListeners = {
    [key: string]: Array<TEventHandler>,
}

export type TProps = Record<string, any>
