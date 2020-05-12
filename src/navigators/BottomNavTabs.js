import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ModalStackScreen from './ModalStackScreen';
import PlantContext from '../context/PlantContext';
import TasksScreen from '../screens/TasksScreen';

const Tab = createBottomTabNavigator();

export default function BottomNavTabs() {
    const { plants } = React.useContext(PlantContext);
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Tasks') {
                        iconName = 'format-list-bulleted';
                    } else if (route.name === 'Plants') {
                        iconName = focused
                            ? 'flower-tulip'
                            : 'flower-tulip-outline';
                    }

                    return (
                        <MaterialCommunityIcons
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    );
                }
            })}
            tabBarOptions={{
                activeTintColor: 'green',
                inactiveTintColor: 'gray'
            }}
            initialRouteName={plants.length === 0 ? 'Plants' : 'Tasks'}
        >
            <Tab.Screen name="Tasks" component={TasksScreen} />
            <Tab.Screen name="Plants" component={ModalStackScreen} />
        </Tab.Navigator>
    );
}