import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import PlantForm from '../components/PlantForm';
import PlantContext from '../context/PlantContext';

export default function CreatePlantScreen({ navigation }) {
    const { addPlant } = useContext(PlantContext);

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Form to add a plant</Text>
            <PlantForm navigation={navigation} onSave={addPlant} />
        </View>
    );
}
