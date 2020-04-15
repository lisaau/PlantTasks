import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import PlantsScreen from './src/screens/PlantsScreen'
import TasksScreen from './src/screens/TasksScreen'
import CreatePlantScreen from './src/screens/CreatePlantScreen'
import ViewPlantScreen from './src/screens/ViewPlantScreen'
import EditPlantScreen from './src/screens/EditPlantScreen'
import { PlantProvider } from './src/context/PlantContext'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
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

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'green',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Tasks" component={TasksScreen} />
        <Tab.Screen name="Plants" component={PlantsScreen} />
      </Tab.Navigator>
  );
}

export default function App() {
  return (
      <PlantProvider>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="PlantTasks" component={HomeTabs} />
                <Stack.Screen name="ViewPlant" component={ViewPlantScreen} />
                <Stack.Screen name="CreatePlant" component={CreatePlantScreen} />
                <Stack.Screen name="EditPlant" component={EditPlantScreen} />
            </Stack.Navigator>
        </NavigationContainer>
      </PlantProvider>
  )
}