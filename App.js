import React, { useState } from 'react';
import { TouchableOpacity, Button, View, Text, StyleSheet } from "react-native";
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

import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';

const auth0ClientId = 'CP2k1WKt3V5r4J8XbVt9gzScxE3s2gTI';
const auth0Domain = 'https://dev-skxc8k2i.auth0.com';

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
    const [user, setUser] = useState(null)
    
    const login = async () => {
        // Retrieve the redirect URL, add this to the callback URL list
        // of your Auth0 application.
        const redirectUrl = AuthSession.getRedirectUrl();
        console.log(`Redirect URL: ${redirectUrl}`);

        // Structure the auth parameters and URL
        const queryParams = toQueryString({
            client_id: auth0ClientId,
            redirect_uri: redirectUrl,
            response_type: 'id_token', // id_token will return a JWT token
            scope: 'openid profile', // retrieve the user's profile
            nonce: 'nonce', // ideally, this will be a random value
        });
        const authUrl = `${auth0Domain}/authorize` + queryParams;
        console.log('authURL', authUrl)

        // Perform the authentication
        const response = await AuthSession.startAsync({ authUrl });
        console.log('Authentication response', response);

        if (response.type === 'success') {
            handleResponse(response.params);
        }
    };

    const handleResponse = (response) => {
        if (response.error) {
            Alert('Authentication error', response.error_description || 'something went wrong');
            return;
        }

        // Retrieve the JWT token and decode it
        const jwtToken = response.id_token;
        const decoded = jwtDecode(jwtToken);

        const { name } = decoded;
        console.log('token info in handleResponse', jwtToken, decoded, name)
        setUser({ name });
    };

    return (
        user ?
            <PlantProvider>
                <TaskProvider>
                    <NavigationContainer>
                        <HomeTabs />
                    </NavigationContainer>
                </TaskProvider>
            </PlantProvider>
        : <View style={styles.container}><Button title="Log in with Auth0" onPress={login} /></View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    },
    title: {
      fontSize: 20,
      textAlign: "center",
      marginTop: 40
    }
  });
  
  /**
   * Converts an object to a query string.
   */
  function toQueryString(params) {
    return (
      "?" +
      Object.entries(params)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&")
    );
  }