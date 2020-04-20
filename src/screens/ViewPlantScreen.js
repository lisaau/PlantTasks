import React, { useContext } from 'react';
import { Text, View, Button } from 'react-native';
import PlantContext from '../context/PlantContext';

export default function ViewPlantScreen({ navigation, route }) {
    const { plants } = useContext(PlantContext);
    console.log(route.params.id);
    const plant = plants.find(p => p.id === route.params.id);

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>
                {plant.name}, {plant.species}
            </Text>
        </View>
    );
}
