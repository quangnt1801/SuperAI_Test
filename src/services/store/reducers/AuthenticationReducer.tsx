
import AsyncStorageServices from "../../asyncStorage/AsyncStorageServices";
import { ActionType } from "../sagas/ActionType";
import { AUTHENTICATION_STATE, INITIAL_AUTHENTICATION_STATE } from "../sagas/type";


interface ReducerAction {
    type: ActionType,
    payload?: any
}

const AuthenticationReducer = (state: AUTHENTICATION_STATE | undefined = INITIAL_AUTHENTICATION_STATE, action: ReducerAction):
    AUTHENTICATION_STATE | undefined => {
    switch (action.type) {
        case ActionType.UPDATE_AUTHENTICATION: {
            let newState = {
                ...state,
                ...action.payload
            }

            AsyncStorageServices.saveAuthentication(newState)

            return newState
        }

        case ActionType.RESET_AUTHENTICATION: {
            return INITIAL_AUTHENTICATION_STATE
        }

        default:
            return state;
    }
}

export default AuthenticationReducer
