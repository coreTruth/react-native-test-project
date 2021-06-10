/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeTabScreen from '../screens/HomeTabScreen';
import WholeTabScreen from '../screens/WholeTabScreen';
import { BottomTabParamList, HomeTabParamList, WholeTabParamList } from '../types';
import Header from './Header';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeTab"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint,
        style: { paddingBottom: 5, paddingTop: 5 } }}>
      <BottomTab.Screen
        name="HomeTab"
        component={HomeTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          title: "Home"
        }}
      />
      <BottomTab.Screen
        name="WholeTab"
        component={WholeTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="menufold" color={color} />,
          title: "Whole"
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof AntDesign>['name']; color: string }) {
  return <AntDesign size={20} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeTabStack = createStackNavigator<HomeTabParamList>();

function HomeTabNavigator() {
  return (
    <HomeTabStack.Navigator>
      <HomeTabStack.Screen
        name="HomeTabScreen"
        component={HomeTabScreen}
        options={{ headerTitle: props => <Header /> }}
      />
    </HomeTabStack.Navigator>
  );
}

const WholeTabStack = createStackNavigator<WholeTabParamList>();

function WholeTabNavigator() {
  return (
    <WholeTabStack.Navigator>
      <WholeTabStack.Screen
        name="WholeTabScreen"
        component={WholeTabScreen}
        options={{ title: 'Whole menus' }}
      />
    </WholeTabStack.Navigator>
  );
}
