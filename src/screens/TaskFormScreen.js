import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

import TaskContext from '../context/TaskContext';
import DismissKeyboard from './components/DismissKeyboard';

export default function TaskFormScreen({ navigation, route }) {
  const { addNewTask } = React.useContext(TaskContext);
  const [description, setDescription] = React.useState('');
  const [frequency, setFrequency] = React.useState('');
  const plantId = route.params.id;

  // frequency values for RNPickerSelect
  const daysSelection = [];
  for (let i = 1; i < 31; i++) {
    daysSelection.push({ label: i.toString(), value: i });
  }

  console.log('TaskFormScreen', description, frequency, route.params.id);

  React.useLayoutEffect(() => {
    navigation.setOptions(
      {
        title: `Add Task for ${route.params.name}`
      },
      [navigation]
    );
  });

  return (
    <DismissKeyboard>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={styles.text}>Add description:</Text>
        <TextInput
          value={description}
          onChangeText={text => setDescription(text)}
          style={styles.input}
          multiline={true}
          maxLength={140}
          placeholder="required"
        />
        <Text style={styles.text}>Frequency (in days):</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          Icon={() => {
            return <EvilIcons name="chevron-down" style={styles.icon} />;
          }}
          onValueChange={value => setFrequency(value)}
          items={daysSelection}
        />
        <Button
          onPress={() => {
            if (description === '') {
              alert('Please enter the description of the task');
            } else if (frequency === null || frequency === '') {
              alert('Please enter number of days');
            } else {
              addNewTask(description, frequency, plantId);
              navigation.goBack();
            }
          }}
          title="Save Task"
        />
      </View>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: '10%',
    padding: 5,
    width: '80%'
  },
  text: {
    margin: 5
  },
  icon: {
    fontSize: 44,
    marginRight: '10%',
    marginTop: '5%'
  }
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
    textAlign: 'center',
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '10%'
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
    textAlign: 'center',
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '10%'
  }
});
