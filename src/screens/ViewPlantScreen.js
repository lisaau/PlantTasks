import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import PlantContext from '../context/PlantContext';
import { EvilIcons } from '@expo/vector-icons';

export default function ViewPlantScreen({ navigation, route }) {
    const { plants } = useContext(PlantContext);
    const plant = plants.find(p => p.id === route.params.id);
    console.log('ViewPlantScreen', route.params.id, plant);

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
            <Text>Name</Text>
            <TextInput
                    value={plant.name}
                    style={styles.input}
                    editable = {false}
            />
            <Text>Species:</Text>
            <TextInput
                value={plant.species}
                style={styles.input}
                editable = {false}
            />
            <Text>Notes:</Text>
            <TextInput
                value={plant.notes}
                style={styles.input}
                editable = {false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5
    }
});
