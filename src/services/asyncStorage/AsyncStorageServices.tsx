import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageConstants } from "./AsyncStorageConstants";
import { AUTHENTICATION_STATE, INITIAL_AUTHENTICATION_STATE } from "../store/sagas/type";


const setItem = async (key: string, value: string) => {
    try {
        if (!value) {
            console.log("Storing null value to AsyncStorage");
            return false
        }
        console.log(`Saving: ${key} with value: ${value}`);
        return AsyncStorage.setItem(key, value)

    } catch (e) {
        console.log("Storing AsyncStorage item error");
        return false
    }
}

const AsyncStorageServices = {
    saveAuthentication(configuration: AUTHENTICATION_STATE) {
        setItem(AsyncStorageConstants.AUTHENTICATION, JSON.stringify(configuration))
    },

    getAuthentication() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(AsyncStorageConstants.AUTHENTICATION).then((value: any) => {
                console.log("getAuthentication: ", value);

                if (value) {
                    let valueObj = JSON.parse(value);
                    resolve(valueObj);
                } else {
                    resolve(INITIAL_AUTHENTICATION_STATE);
                }
            }).catch((err: any) => {
                console.log("Exception while loading configuration:", err);
                reject(INITIAL_AUTHENTICATION_STATE);
            })
        })
    },

}

export default AsyncStorageServices;