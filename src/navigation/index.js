import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard';
import Closet from '../screens/Closet';
import Suggestions from '../screens/Suggestions';
import Insights from '../screens/Insights';
import Shopping from '../screens/Shopping';
import AddItem from '../screens/AddItem';
import ItemDetail from '../screens/ItemDetail';
import colors from '../styles/colors';
import typography from '../styles/typography';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: colors.primary }
    }}
  >
    <Stack.Screen name="DashboardScreen" component={Dashboard} />
    <Stack.Screen name="AddItem" component={AddItem} />
  </Stack.Navigator>
);

const ClosetStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: colors.primary }
    }}
  >
    <Stack.Screen name="ClosetScreen" component={Closet} />
    <Stack.Screen name="AddItem" component={AddItem} />
    <Stack.Screen name="ItemDetail" component={ItemDetail} />
  </Stack.Navigator>
);

const SuggestionsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: colors.primary }
    }}
  >
    <Stack.Screen name="SuggestionsScreen" component={Suggestions} />
  </Stack.Navigator>
);

const InsightsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: colors.primary }
    }}
  >
    <Stack.Screen name="InsightsScreen" component={Insights} />
  </Stack.Navigator>
);

const ShoppingStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: colors.primary }
    }}
  >
    <Stack.Screen name="ShoppingScreen" component={Shopping} />
  </Stack.Navigator>
);

export default function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.divider,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8
        },
        tabBarActiveTintColor: colors.accentAction,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: [typography.tabLabel, { fontSize: 11 }],
        tabBarIconStyle: { marginTop: 4 }
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏠</Text>
        }}
      />
      <Tab.Screen
        name="ClosetNav"
        component={ClosetStack}
        options={{
          tabBarLabel: 'Closet',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👕</Text>
        }}
      />
      <Tab.Screen
        name="Suggestions"
        component={SuggestionsStack}
        options={{
          tabBarLabel: 'Suggest',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>✨</Text>
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsStack}
        options={{
          tabBarLabel: 'Insights',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📊</Text>
        }}
      />
      <Tab.Screen
        name="Shopping"
        component={ShoppingStack}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🛍️</Text>
        }}
      />
    </Tab.Navigator>
  );
}
