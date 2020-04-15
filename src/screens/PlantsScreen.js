import * as React from 'react';
import { Text, View, Button } from 'react-native';

export default function PlantsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Display All Plants Here</Text>
        <Button onPress={() => navigation.navigate('CreatePlant')} title="Add New Plant" />
        <Button onPress={() => navigation.navigate('ViewPlant')} title="View Plant" />
      </View>
    );
  }