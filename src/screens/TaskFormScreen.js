import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { EvilIcons } from '@expo/vector-icons';

export default function TaskFormScreen({ navigation, route }) {
    const [description, setDescription] = useState('');
    const [frequency, setFrequency] = useState('');
    console.log(description,frequency)
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Add description:</Text>
            <TextInput
                value={description}
                onChangeText={text => setDescription(text)}
                style={styles.input}
                placeholder='required'
            />
            <Text>Frequency (in days):</Text>
            <RNPickerSelect
                placeholder={{}}
                style={pickerSelectStyles}
                Icon={() => {
                    return <EvilIcons name='chevron-down' style={{fontSize: 44}} />;
                }}
                onValueChange={(value) => setFrequency(value)}
                items={[
                    { label: '1', value: 1 },
                    { label: '2', value: 3 },
                    { label: '3', value: 3 },
                ]}
            />
            <Button
                // onPress={() => onSave(description, frequency)}
                title="Save Task"
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      textAlign: 'center'
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      textAlign: 'center'
    },
  });
  