import { ActionType } from "../sagas/ActionType";
import { AUTHENTICATION_STATE } from "./type";


export const updateAuthentication = (authen: AUTHENTICATION_STATE) => {
    return {
        type: ActionType.UPDATE_AUTHENTICATION,
        payload: authen
    }
}

export const resetAuthentication = () => {
    return {
        type: ActionType.RESET_AUTHENTICATION
    }
}