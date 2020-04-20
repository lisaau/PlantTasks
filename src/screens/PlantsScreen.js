import React, { useContext } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import PlantContext from '../context/PlantContext';

export default function PlantsScreen({ navigation }) {
    const { plants } = useContext(PlantContext);

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Your Plants</Text>
            <FlatList
                data={plants}
                keyExtractor={plant => plant.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ViewPlant', {
                                    id: item.id
                                })
                            }
                        >
                            <Text>
                                {item.name}, ID:{item.id}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}
