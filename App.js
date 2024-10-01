import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import AddAnActivity from './Screens/AddAnActivity';
import AddADietEntry from './Screens/AddADietEntry';
import Home from './Components/Home';
import { colors, commonStyles } from './helper/helper';
import { ContextProvider } from './helper/context';

const Stack = createNativeStackNavigator ();

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerStyle: commonStyles.navigatorBackground, headerTintColor: colors.white }}>
          <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
          <Stack.Screen name='AddAnActivity' component={AddAnActivity} options={{ title: 'Add An Activity'}} />
          <Stack.Screen name='AddADietEntry' component={AddADietEntry} options={{ title: 'Add A Diet Entry'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
