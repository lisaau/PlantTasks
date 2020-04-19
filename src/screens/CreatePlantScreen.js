import * as React from 'react';
import { Text, View, Button } from 'react-native';
import PlantForm from '../components/PlantForm'

export default function CreatePlantScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Form to add a plant</Text>
      <PlantForm navigation={navigation}/>
      
    </View>
  );
}
