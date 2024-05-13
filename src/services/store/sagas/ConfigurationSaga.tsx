import { takeEvery } from "redux-saga/effects";
import { ActionType } from "./ActionType";

function* updateAuthentication(action: any) {
    console.log("This is increament saga", action.payload);
}

export function* watchUpdateAuthentication() {
    yield takeEvery(ActionType.UPDATE_AUTHENTICATION, updateAuthentication);
}