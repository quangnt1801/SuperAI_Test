import { NavigationContainer } from "@react-navigation/native";
import { RootStack } from "./src/services/navigation/NavigationConfiguration";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from "redux";
import allReducers from "./src/services/store/reducers";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(allReducers, applyMiddleware(sagaMiddleware));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>

  )
}

export default App;