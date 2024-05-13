import { CommonActions, NavigationContainerRef } from "@react-navigation/native";

export const navigateThenReset = (navigation: NavigationContainerRef<any>, name: string, params?: object | undefined): void => {
    navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{
            name: name,
            params: params
        }]
    }));
}