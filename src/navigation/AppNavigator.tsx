import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// Screens
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ConverterScreen from '../screens/ConverterScreen';
import JournalScreen from '../screens/JournalScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: '#0866ff',
                    tabBarInactiveTintColor: 'gray',
                }}>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Trang chủ',
                        tabBarIcon: () => <Text>🏠</Text>,
                    }}
                />
                <Tab.Screen
                    name="Calendar"
                    component={CalendarScreen}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Lịch',
                        tabBarIcon: () => <Text>📅</Text>,
                    }}
                />
                <Tab.Screen
                    name="Converter"
                    component={ConverterScreen}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Chuyển đổi',
                        tabBarIcon: () => <Text>🔄</Text>,
                    }}
                />
                <Tab.Screen
                    name="Journal"
                    component={JournalScreen}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Nhật ký',
                        tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }}>📝</Text>,
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarLabel: 'Cài đặt',
                        tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }}>⚙️</Text>,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
