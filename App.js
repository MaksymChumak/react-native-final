import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from './components/HomeScreen'
import GalleryComponent from './components/GalleryComponent'
import AnimationComponent from './components/AnimationComponent'
import MapComponent from './components/MapComponent';

console.disableYellowBox = true;
const RootStack = createStackNavigator({
    Home: {
      screen: HomeScreen
    },
    Maps: {
      screen: MapComponent
    },
    Photos: {
      screen: GalleryComponent
    },
    Animation: {
      screen: AnimationComponent
    }
  },
  {
    initialRouteName: "Home"
  }
);

const App = createAppContainer(RootStack);

export default App;
