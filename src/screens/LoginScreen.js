import React from 'react';
import {
    Button,
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

export default function LoginScreen({ login }) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>PlantTasks</Text>
            <Image source={require('../../assets/flower-icon.png')} style={styles.image} />
            {/* <Button
                title="Log in"
                onPress={login}
                accessibilityLabel="Log in to PlantTasks"
            /> */}
            <TouchableOpacity onPress={login}>
                <Text style={styles.login}>Log in</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        color: 'green'
    },
    login: {
        fontSize: 18,
        color: 'green',
        marginBottom: 100,
        borderWidth: 1, borderColor: '#000', borderRadius: 12, padding: 8, 
    },
    image: {
        marginBottom: 50
    }
});
