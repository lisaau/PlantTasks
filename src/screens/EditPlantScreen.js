import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import PlantForm from '../components/PlantForm';
import PlantContext from '../context/PlantContext';

export default function EditPlantScreen({ navigation,route }) {
    const { plants } = useContext(PlantContext);
    const plant = plants.find(p => p.id === route.params.id);
    console.log('EditPlantScreen', plant)
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Edit the Plant</Text>
            <PlantForm
                navigation={navigation}
                initialValues={{ name: plant.name, species: plant.species }}
            />
        </View>
    );
}
