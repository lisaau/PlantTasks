import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';

export default function PlantForm({ onSave, initialValues }) {
    const [name, setName] = useState(initialValues.name);
    const [species, setSpecies] = useState(initialValues.species);
    const [notes, setNotes] = useState(initialValues.notes);

    return (
        <View style={{ width:"70%" }}>
            <Text>Enter name of plant:</Text>
            <TextInput
                value={name}
                onChangeText={text => setName(text)}
                style={styles.input}
                placeholder='required'
            />
            <Text>Enter name of species:</Text>
            <TextInput
                value={species}
                onChangeText={text => setSpecies(text)}
                style={styles.input}
                placeholder='required'
            />
            <Text>Notes:</Text>
            <TextInput
                value={notes}
                onChangeText={text => setNotes(text)}
                style={styles.input}
                multiline={true}
                maxLength={140}
            />
            <Button
                onPress={() => onSave(name, species, notes)}
                title="Save Plant"
            />
    </View>
    );
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderBottomWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5,
    }
});
