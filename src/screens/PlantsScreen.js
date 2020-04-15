import React, { useContext } from 'react';
import { Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import PlantContext from '../context/PlantContext'

export default function PlantsScreen({ navigation }) {
    const plants = useContext(PlantContext);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Display All Plants Here</Text>
            <FlatList
                data={plants}
                keyExtractor={plant => plant.id.toString()}
                renderItem={({item}) => {
                    return <TouchableOpacity onPress={() => navigation.navigate('ViewPlant', { id: item.id })}>
                        <Text>{item.name} - tap to view</Text>
                    </TouchableOpacity>
                }}
            />
            <Button onPress={() => navigation.navigate('CreatePlant')} title="Add New Plant" />
        </View>
    );
}
