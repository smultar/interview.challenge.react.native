import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


// Screens
import SplashScreen from './screens/index';
import Browse from './screens/browse';
import Details from './screens/details';

const Screens = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Browse' component={Browse} options={{ headerShown: false }} />
            <Stack.Screen name='Details' component={Details} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default Screens;