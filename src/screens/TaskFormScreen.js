import React, { useState, useContext } from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { EvilIcons } from '@expo/vector-icons';
import TaskContext from '../context/TaskContext';

export default function TaskFormScreen({ navigation, route }) {
    const { addNewTask } = useContext(TaskContext);
    const [description, setDescription] = useState('');
    const [frequency, setFrequency] = useState('');
    const plantId = route.params.id;

    // frequency values for RNPickerSelect
    const daysSelection = [];
    for (let i = 1; i < 31; i++) {
        daysSelection.push({label: i.toString(), value: i})
    }

    console.log('TaskFormScreen', description, frequency, route.params.id)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: `Add Task for ${route.params.name}`}, [navigation])
    });

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
                style={pickerSelectStyles}
                Icon={() => {
                    return <EvilIcons name='chevron-down' style={{fontSize: 44}} />;
                }}
                onValueChange={(value) => setFrequency(value)}
                items={daysSelection}
            />
            <Button
                onPress={() => {
                    if (description === '') {
                        alert('Please enter the description of the task')
                    } else if(frequency === null || frequency === '') {
                        alert('Please enter number of days');
                    } else {
                        addNewTask(description, frequency, plantId)
                    }
                    navigation.goBack()
                }}
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
  