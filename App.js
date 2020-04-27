import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { PlantProvider } from './src/context/PlantContext';
import { TaskProvider } from './src/context/TaskContext';
import PlantsScreen from './src/screens/PlantsScreen';
import TasksScreen from './src/screens/TasksScreen';
import CreatePlantScreen from './src/screens/CreatePlantScreen';
import ViewPlantScreen from './src/screens/ViewPlantScreen';
import EditPlantScreen from './src/screens/EditPlantScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';
import ViewTasksScreen from './src/screens/ViewTasksScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MainStack = createStackNavigator();

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
        >
            <Tab.Screen name="Tasks" component={TasksScreen} />
            <Tab.Screen name="Plants" component={ModalStackScreen} />
        </Tab.Navigator>
    );
}

function ModalStackScreen() {
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
function MainStackScreen({ navigation }) {
    return (
        <MainStack.Navigator>
            <MainStack.Screen
                name="Plants"
                component={PlantsScreen}
                options={{
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('CreatePlant')}>
                            <Ionicons name='ios-add' style={{ fontSize: 44, paddingRight: 20 }}/>
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

export default function App() {
    return (
        <PlantProvider>
            <TaskProvider>
                <NavigationContainer>
                    <HomeTabs />
                </NavigationContainer>
            </TaskProvider>
        </PlantProvider>
    );
}
