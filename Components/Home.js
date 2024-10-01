import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Activities from '../Screens/Activities';
import Diet from '../Screens/Diet';
import Settings from '../Screens/Settings';
import { colors, commonStyles } from '../helper/helper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function Home({navigation}) {
  return (
    <Tab.Navigator screenOptions={{
        headerStyle: commonStyles.navigatorBackground,
        headerTintColor: colors.white,
        tabBarStyle: commonStyles.navigatorBackground,
        tabBarActiveTintColor: colors.yellow,
    }}>
      <Tab.Screen
        name="Activities"
        component={Activities}
        options={{
            tabBarIcon: ({ color, size }) => <MaterialIcons name="directions-run" size={size} color={color} />,
            headerRight: () => <Button title='Add' onPress={() => navigation.navigate('AddAnActivity')} />,
        }}
      />
      <Tab.Screen
        name="Diet"
        component={Diet}
        options={{
            tabBarIcon: ({ color, size }) => <MaterialIcons name="fastfood" size={size} color={color} />,
            headerRight: () => <Button title='Add' onPress={() => navigation.navigate('AddADietEntry')} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ tabBarIcon: ({ color, size }) => <MaterialIcons name="settings" size={size} color={color} />}}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})