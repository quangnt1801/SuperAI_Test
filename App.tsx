import { NavigationContainer } from "@react-navigation/native";
import { RootStack } from "./src/services/navigation/NavigationConfiguration";

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  )
}

export default App;