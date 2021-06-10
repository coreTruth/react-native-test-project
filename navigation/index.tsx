/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import EditAccountsScreen from '../screens/EditAccountsScreen';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, EditAccountsParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import Header from './Header';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const EditAccountsStack = createStackNavigator<EditAccountsParamList>();

function EditAccountsNavigator() {
  return (
    <EditAccountsStack.Navigator>
      <EditAccountsStack.Screen
        name="EditAccountsScreen"
        component={EditAccountsScreen}
        options={{ headerTitle: props => <Header /> }}
      />
    </EditAccountsStack.Navigator>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="EditAccounts" component={EditAccountsNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
