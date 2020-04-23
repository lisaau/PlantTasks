import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import PlantForm from '../components/PlantForm';
import DismissKeyboard from '../components/DismissKeyboard';
import PlantContext from '../context/PlantContext';

export default function CreatePlantScreen({ navigation }) {
    const { addNewPlant } = useContext(PlantContext);

    return (
      <DismissKeyboard>
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Form to add a plant</Text>
            <PlantForm
                navigation={navigation}
                initialValues={{ name: '', species: '', notes: '' }}
                onSave={(name, species, notes) =>
                    addNewPlant(name, species, notes).then(() => navigation.goBack())
                }
            />
        </View>
      </DismissKeyboard>
    );
}
