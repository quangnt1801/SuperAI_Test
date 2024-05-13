/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from "@react-navigation/native";
import { RootStack } from "./src/services/navigation/NavigationConfiguration";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from "redux";
import allReducers from "./src/services/store/reducers";
import { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(allReducers, applyMiddleware(sagaMiddleware));

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  )
}

export default App;
