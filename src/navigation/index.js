import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Animated, Pressable } from 'react-native';
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

// Custom tab icon component with animation
function TabIcon({ name, color, size, isFocused }) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isFocused ? 1.15 : 1,
      tension: 300,
      friction: 10,
      useNativeDriver: true
    }).start();
  }, [isFocused]);

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
      <MaterialCommunityIcons name={name} color={color} size={size || 24} />
    </Animated.View>
  );
}

export default function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 56,
          paddingTop: 4,
          paddingBottom: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4
        },
        tabBarActiveTintColor: colors.accentSecondary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: [
          typography.tabLabel,
          {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 2
          }
        ],
        tabBarIconStyle: { marginTop: 2, marginBottom: 2 }
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="home" color={color} size={size || 24} isFocused={focused} />
          )
        }}
      />
      <Tab.Screen
        name="ClosetNav"
        component={ClosetStack}
        options={{
          tabBarLabel: 'Closet',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="hanger" color={color} size={size || 24} isFocused={focused} />
          )
        }}
      />
      <Tab.Screen
        name="Suggestions"
        component={SuggestionsStack}
        options={{
          tabBarLabel: 'Suggest',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="lightbulb-on" color={color} size={size || 24} isFocused={focused} />
          )
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsStack}
        options={{
          tabBarLabel: 'Insights',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="chart-bar" color={color} size={size || 24} isFocused={focused} />
          )
        }}
      />
      <Tab.Screen
        name="Shopping"
        component={ShoppingStack}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="shopping-bag" color={color} size={size || 24} isFocused={focused} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
