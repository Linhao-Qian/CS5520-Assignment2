import { Button, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Activities from '../Screens/Activities';
import Diet from '../Screens/Diet';
import Settings from '../Screens/Settings';
import { colors, commonStyles } from '../helper/helper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

// Home is a bottom tab navigator 
export default function Home({navigation}) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: commonStyles.navigatorBackground,
        headerTintColor: colors.white,
        tabBarStyle: commonStyles.navigatorBackground,
        tabBarActiveTintColor: colors.yellow,
      }}
    >
      <Tab.Screen
        name="Activities"
        component={Activities}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="directions-run" size={size} color={color} />,
          headerRight: () =>
            <Pressable
              android_ripple={{color: 'white', radius: 20}}
              style={({pressed}) => [commonStyles.headerIcons, pressed && commonStyles.pressedStyle]}
              onPress={() => navigation.navigate('AddAnActivity')}
            >
              <AntDesign name="plus" size={24} color="white" />
              <MaterialIcons name="directions-run" size={24} color="white" />
            </Pressable>
        }}
      />
      <Tab.Screen
        name="Diet"
        component={Diet}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="fastfood" size={size} color={color} />,
          headerRight: () =>
            <Pressable
              android_ripple={{color: 'white', radius: 20}}
              style={({pressed}) => [commonStyles.headerIcons, pressed && commonStyles.pressedStyle]}
              onPress={() => navigation.navigate('AddADietEntry')}
            >
              <AntDesign name="plus" size={24} color="white" />
              <MaterialIcons name="fastfood" size={24} color="white" />
            </Pressable>
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