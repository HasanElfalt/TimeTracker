/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useContext} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import {Colors} from './constants/style';
import {Icon} from 'react-native-elements';

import AppContextProvider, {AppContext} from './store/app-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TasksList from './screens/TasksList';
import TaskCreation from './screens/TaskCreation';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
function Navigation() {
  const appCtx = useContext(AppContext);

  return (
    <NavigationContainer>
      {!appCtx.isAuthenticated && <AuthStack />}
      {appCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function AuthenticatedStack() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Creation') {
            iconName = 'new-label';
          } else if (route.name === 'List') {
            iconName = 'list';
          }
          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Creation" component={TaskCreation} />
      <Tab.Screen name="List" component={TasksList} />
    </Tab.Navigator>
  );
}
function App(): JSX.Element {
  return (
    <AppContextProvider>
      <Navigation />
    </AppContextProvider>
  );
}

export default App;
