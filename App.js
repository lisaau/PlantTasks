import React from 'react';
import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity, Button, View, Text, StyleSheet } from "react-native";

import PlantContext, { PlantProvider } from './src/context/PlantContext';
import { TaskProvider } from './src/context/TaskContext';
import CreatePlantScreen from './src/screens/CreatePlantScreen';
import EditPlantScreen from './src/screens/EditPlantScreen';
import PlantsScreen from './src/screens/PlantsScreen';
import TasksScreen from './src/screens/TasksScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';
import ViewPlantScreen from './src/screens/ViewPlantScreen';
import ViewTasksScreen from './src/screens/ViewTasksScreen';
import LoginScreen from './src/screens/LoginScreen';

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
    const [user, setUser] = React.useState(null);
    const [token, setToken] = React.useState(null);
    
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
        setToken({ jwtToken })

        const { sub } = decoded;
        console.log('token info in handleResponse', jwtToken, decoded, sub)
        setUser({ sub });
    };

    console.log('token state:', token)

    return (
        token ?
            <PlantProvider token={token.jwtToken}>
                <TaskProvider token={token.jwtToken}>
                    <NavigationContainer>
                        <HomeTabs />
                    </NavigationContainer>
                </TaskProvider>
            </PlantProvider>
        : <LoginScreen login={login}/>
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