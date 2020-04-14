import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

function TasksScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tasks</Text>
    </View>
  );
}

function PlantsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Display All Plants Here</Text>
      <Button onPress={() => navigation.navigate('CreatePlant')} title="Add New Plant" />
      <Button onPress={() => navigation.navigate('ViewPlant')} title="View Plant" />
    </View>
  );
}

function CreatePlantScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Form to add a plant</Text>
      <Button onPress={() => navigation.goBack()} title="Back" />
      <Button onPress={() => navigation.goBack()} title="Save Plant" />
    </View>
  );
}

function ViewPlantScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Form to add a plant</Text>
      <Button onPress={() => navigation.goBack()} title="Back" />
      <Button onPress={() => navigation.navigate('EditPlant')} title="Edit Plant" />
    </View>
  );
}

function EditPlantScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Edit the Plant</Text>
      <Button onPress={() => navigation.goBack()} title="Back" />
      <Button onPress={() => navigation.navigate('ViewPlant')} title="Save Plant" />
    </View>
  );
}

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

            // You can return any component that you like here!
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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PlantTasks" component={HomeTabs} />
        <Stack.Screen name="ViewPlant" component={ViewPlantScreen} />
        <Stack.Screen name="CreatePlant" component={CreatePlantScreen} />
        <Stack.Screen name="EditPlant" component={EditPlantScreen} />
      </Stack.Navigator>
  </NavigationContainer>
  )
}