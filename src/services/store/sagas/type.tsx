export interface AUTHENTICATION_STATE {
    email: string,
    password: string
}

export const INITIAL_AUTHENTICATION_STATE: AUTHENTICATION_STATE = {
    email: '',
    password: ''
}