import * as React from 'react';
import { Text, View, Button } from 'react-native';
import PlantForm from '../components/PlantForm';

export default function EditPlantScreen({ navigation }) {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Edit the Plant</Text>
            <PlantForm navigation={navigation}/>
        </View>
    );
}
