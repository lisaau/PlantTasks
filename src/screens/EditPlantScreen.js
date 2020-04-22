import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import PlantForm from '../components/PlantForm';
import PlantContext from '../context/PlantContext';

export default function EditPlantScreen({ navigation,route }) {
    const { plants, editPlant } = useContext(PlantContext);
    const plant = plants.find(p => p.id === route.params.id);
    const id = route.params.id;

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Edit the Plant</Text>
            <PlantForm
                navigation={navigation}
                initialValues={{ name: plant.name, species: plant.species }}
                onSave={(name, species) =>
                    editPlant(id, name, species).then(() => navigation.goBack())
                }
            />
        </View>
    );
}
