import * as React from 'react';
import { Text, View, Button } from 'react-native';

export default function ViewPlantScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Form to add a plant</Text>
            <Button onPress={() => navigation.goBack()} title="Back" />
            <Button onPress={() => navigation.navigate('EditPlant')} title="Edit Plant" />
        </View>
    );
}
