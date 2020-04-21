import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';

export default function PlantForm({ navigation, onSave }) {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    console.log(name, species, onSave);
    return (
        <View>
            <Text>Enter name of plant:</Text>
            <TextInput
                value={name}
                onChangeText={text => setName(text)}
                style={styles.input}
            />
            <Text>Enter name of species:</Text>
            <TextInput
                value={species}
                onChangeText={text => setSpecies(text)}
                style={styles.input}
            />
            <Button
                onPress={() => {
                    console.log('PlantForm.js', { name, species });
                    onSave({ name, species }).then(
                        navigation.goBack()
                    );
                }}
                title="Save Plant"
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
