import React from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';

export default function PlantForm({ onSave, initialValues }) {
  const [name, setName] = React.useState(initialValues.name);
  const [species, setSpecies] = React.useState(initialValues.species);
  const [notes, setNotes] = React.useState(initialValues.notes);
  const [nameError, setNameError] = React.useState(null);
  const [speciesError, setSpeciesError] = React.useState(null);

  return (
    <View style={{ width: '70%' }}>
      <Text style={{ color: nameError }}>Enter name of plant:</Text>
      <TextInput
        value={name}
        onChangeText={(text) => {
          setNameError(null);
          setName(text);
        }}
        style={styles.input}
        placeholder="required"
        onBlur={() => {
          if (!name) setNameError('red');
        }}
      />
      <Text style={{ color: speciesError }}>Enter name of species:</Text>
      <TextInput
        value={species}
        onChangeText={(text) => {
          setSpeciesError(null);
          setSpecies(text);
        }}
        style={styles.input}
        placeholder="required"
        onBlur={() => {
          if (!species) setSpeciesError('red');
        }}
      />
      <Text>Notes:</Text>
      <TextInput
        value={notes}
        onChangeText={(text) => setNotes(text)}
        style={styles.input}
        multiline={true}
        maxLength={140}
      />
      <Button
        onPress={() => onSave(name, species, notes)}
        title="Save Plant"
        disabled={!name || !species}
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
  },
});
