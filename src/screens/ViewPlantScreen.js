import React, { useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PlantContext from '../context/PlantContext';
import { EvilIcons } from '@expo/vector-icons';

export default function ViewPlantScreen({ navigation, route }) {
    const { plants } = useContext(PlantContext);
    const plant = plants.find(p => p.id === route.params.id);
    console.log('ViewPlantScreen', route.params.id, plant, navigation);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('EditPlant', {
                            id: route.params.id
                        });
                    }}
                >
                    <EvilIcons name="pencil" style={{ fontSize: 35 }} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

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
