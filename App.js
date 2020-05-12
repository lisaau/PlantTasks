import React from 'react';
import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, ActivityIndicator } from 'react-native';

import BottomNavTabs from './src/navigators/BottomNavTabs'
import LoginScreen from './src/screens/LoginScreen';
import PlantContext, { PlantProvider } from './src/context/PlantContext';
import { TaskProvider } from './src/context/TaskContext';

const auth0ClientId = 'CP2k1WKt3V5r4J8XbVt9gzScxE3s2gTI';
const auth0Domain = 'https://dev-skxc8k2i.auth0.com';


function AppInitializer() {
    const { fetchPlants } = React.useContext(PlantContext);
    const [isInitializing, setIsInitializing] = React.useState(true);

    React.useEffect(() => {
        fetchPlants().then(() => setIsInitializing(false));
    }, []);

    return isInitializing ? (
        <ActivityIndicator style={styles.indicator} size="large" />
    ) : (
        <NavigationContainer>
            <BottomNavTabs />
        </NavigationContainer>
    );
}

//Converts an object to a query string.
function toQueryString(params) {
    return (
        '?' +
        Object.entries(params)
            .map(
                ([key, value]) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            )
            .join('&')
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
            nonce: 'nonce' // ideally, this will be a random value
        });
        const authUrl = `${auth0Domain}/authorize` + queryParams;
        console.log('authURL', authUrl);

        // Perform the authentication
        const response = await AuthSession.startAsync({ authUrl });
        console.log('Authentication response', response);

        if (response.type === 'success') {
            handleResponse(response.params);
        }
    };

    const handleResponse = response => {
        if (response.error) {
            Alert(
                'Authentication error',
                response.error_description || 'something went wrong'
            );
            return;
        }

        // Retrieve the JWT token and decode it
        const jwtToken = response.id_token;
        const decoded = jwtDecode(jwtToken);
        setToken({ jwtToken });

        // sub is the unique identifier for the user extracted from the token
        const { sub } = decoded;
        setUser({ sub });
    };

    console.log('token state:', token);

    return token ? (
        <TaskProvider token={token.jwtToken}>
            <PlantProvider token={token.jwtToken}>
                <AppInitializer />
            </PlantProvider>
        </TaskProvider>
    ) : (
        <LoginScreen login={login} />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 40
    },
    indicator: {
        padding: 200
    }
});
