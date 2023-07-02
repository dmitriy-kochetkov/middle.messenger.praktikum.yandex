export enum EVENTS {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_CWU = 'flow:component-did-unmount',
    FLOW_RENDER = 'flow:render',
}

export enum ROUTES {
    Index = '/',
    Profile = '/settings',
    ChangePassword = '/settings/change-password',
    EditProfile = '/settings/edit',
    Signup = '/sign-up',
    Chat = '/messenger',
    Page404 = '/404',
    Page500 = '/500'
}
