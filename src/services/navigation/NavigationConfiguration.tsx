import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationConstants } from "./NavigationConstants";
import LoginScreen from "../../screens/auth";
import HomeScreen from "../../screens/home";
import { Colors } from "../utils/Colors";
import CreateOrderScreen from "../../screens/createOrder/CreateOrderScreen";
import PrinterThermalScreen from "../../screens/printerThermal/PrinterThermalScreen";


const Stack = createNativeStackNavigator();
export const RootStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={NavigationConstants.AUTHENTICATE}
            screenOptions={{
                animation: 'slide_from_right'
            }}
        >
            <Stack.Screen
                name={NavigationConstants.AUTHENTICATE}
                component={Authentication}
                options={{
                    headerShown: false

                }}
            />
            <Stack.Screen
                name={NavigationConstants.HOME_SCREEN}
                component={HomeScreen}
                options={{
                    headerShown: false

                }}
            />
            <Stack.Screen
                name={NavigationConstants.CREATE_ORDER}
                component={CreateOrderScreen}
                options={{
                    title: "Tạo đơn hàng",
                    headerStyle: {
                        backgroundColor: Colors.error,
                    },

                    headerTintColor: 'white',

                }}
            />

            <Stack.Screen
                name={NavigationConstants.PRINTER_THARMAL}
                component={PrinterThermalScreen}
                options={{
                    title: "In hoá đơn",
                    headerStyle: {
                        backgroundColor: Colors.error,
                    },

                    headerTintColor: 'white',

                }}
            />
        </Stack.Navigator>
    )
}

const AuthStack = createNativeStackNavigator();
export const Authentication = () => {
    return (
        <AuthStack.Navigator
            initialRouteName={NavigationConstants.LOGIN_SCREEN}
            screenOptions={{
            }}
        >
            <AuthStack.Screen
                name={NavigationConstants.LOGIN_SCREEN}
                component={LoginScreen}
                options={{
                    headerShown: false

                }}
            />
        </AuthStack.Navigator>
    )
}