import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';

import EditPlantScreen from '../screens/EditPlantScreen';
import PlantsScreen from '../screens/PlantsScreen';
import TaskFormScreen from '../screens/TaskFormScreen';
import ViewPlantScreen from '../screens/ViewPlantScreen';
import ViewTasksScreen from '../screens/ViewTasksScreen';

const MainStack = createStackNavigator();

export default function MainStackScreen({ navigation }) {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Plants"
        component={PlantsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('CreatePlant')}
            >
              <Ionicons
                name="ios-add"
                style={{ fontSize: 44, paddingRight: 20 }}
              />
            </TouchableOpacity>
          )
        }}
      />
      <MainStack.Screen
        name="TaskFormScreen"
        component={TaskFormScreen}
        options={{ title: 'Add a Task' }}
      />
      <MainStack.Screen
        name="ViewTasksScreen"
        component={ViewTasksScreen}
        options={{ title: 'Tasks' }}
      />
      <MainStack.Screen
        name="ViewPlant"
        component={ViewPlantScreen}
        options={{ title: 'Details' }}
      />
      <MainStack.Screen
        name="EditPlant"
        component={EditPlantScreen}
        options={{ headerBackTitle: 'Back', title: 'Edit' }}
      />
    </MainStack.Navigator>
  );
}
