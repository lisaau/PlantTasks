import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CreatePlantScreen from '../screens/CreatePlantScreen';
import MainStackScreen from './MainStackScreen';

const Stack = createStackNavigator();

export default function ModalStackScreen() {
    return (
        <Stack.Navigator mode="modal">
            <Stack.Screen
                name="Main"
                component={MainStackScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CreatePlant"
                component={CreatePlantScreen}
                options={{ headerBackTitle: 'Back', title: 'Add a Plant' }}
            />
        </Stack.Navigator>
    );
}