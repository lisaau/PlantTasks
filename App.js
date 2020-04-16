import * as React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
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
import { EvilIcons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();
const Modal = createStackNavigator();
const Stack = createStackNavigator();
const Header = createStackNavigator();

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
        <Tab.Screen 
            name="Plants" 
            component={HeaderStack} 
        />
      </Tab.Navigator>
  );
}

function ModalScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
      </View>
    );
  }
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is the home screen!</Text>
      <Button
        onPress={() => navigation.navigate('MyModal')}
        title="Open Modal"
      />
    </View>
  );
}
function ModalStack() {
    return (
      <Modal.Navigator mode="modal">
        <Modal.Screen name="Home" component={HomeScreen} />
        <Modal.Screen name="MyModal" component={ModalScreen} />
      </Modal.Navigator>
    );
}

function HeaderStack() {
    return (
      <Header.Navigator>
        <Header.Screen 
          name="Plants" 
          component={PlantsScreen} 
          options={{ 
            headerShown: false,
            headerRight: () => (
              <Button 
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
              />
            )
          }}
        />
      </Header.Navigator>
    );
}

export default function App() {
  return (
      <PlantProvider>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="PlantTasks" component={HomeTabs} />
                <Stack.Screen 
                    name="ViewPlant" 
                    component={ViewPlantScreen} 
                    options={{
                        headerRight: () => (
                            <TouchableOpacity onPress={() => alert('Use this to let users edit plant')} >
                                <EvilIcons name="pencil" style={{fontSize: 35}} />
                            </TouchableOpacity>
                        )
                    }} 
                />
                <Stack.Screen name="CreatePlant" component={CreatePlantScreen} />
                <Stack.Screen name="EditPlant" component={EditPlantScreen} />
                
                {/* <Stack.Screen name="CreatePlant" component={ModalStack} options={{ headerShown: false }}/> */}
            </Stack.Navigator>
        </NavigationContainer>
      </PlantProvider>
  )
}
