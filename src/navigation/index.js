import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import Closet from '../screens/Closet';
import Suggestions from '../screens/Suggestions';
import Insights from '../screens/Insights';
import Shopping from '../screens/Shopping';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Closet" component={Closet} />
      <Tab.Screen name="Suggestions" component={Suggestions} />
      <Tab.Screen name="Insights" component={Insights} />
      <Tab.Screen name="Shopping" component={Shopping} />
    </Tab.Navigator>
  );
}
