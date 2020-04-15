import * as React from 'react';
import { Text, View, Button } from 'react-native';

export default function EditPlantScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Edit the Plant</Text>
        <Button onPress={() => navigation.goBack()} title="Back" />
        <Button onPress={() => navigation.navigate('ViewPlant')} title="Save Plant" />
        </View>
    );
}
