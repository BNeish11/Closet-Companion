import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import Closet from '../screens/Closet';
import Suggestions from '../screens/Suggestions';
import Insights from '../screens/Insights';
import Shopping from '../screens/Shopping';
import colors from '../styles/colors';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.navy, borderTopColor: colors.divider },
        tabBarActiveTintColor: colors.salmon,
        tabBarInactiveTintColor: colors.textSecondary
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Closet" component={Closet} />
      <Tab.Screen name="Suggestions" component={Suggestions} />
      <Tab.Screen name="Insights" component={Insights} />
      <Tab.Screen name="Shopping" component={Shopping} />
    </Tab.Navigator>
  );
}
