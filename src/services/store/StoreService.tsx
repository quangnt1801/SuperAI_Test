import { store } from "../../../App";


export const StoreService = {
    dispatch(action: any) {
        if (store) {
            store.dispatch(action);
        }
    },
}
