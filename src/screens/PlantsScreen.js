import React, { useContext } from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import PlantContext from '../context/PlantContext';
import { Feather, MaterialIcons} from '@expo/vector-icons';

export default function PlantsScreen({ navigation }) {
    const { plants, deletePlant } = useContext(PlantContext);

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <FlatList
                data={plants}
                keyExtractor={plant => plant.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ViewPlant', {
                                    id: item.id
                                })
                            }
                        >
                            <View style={styles.row}>
                                <TouchableOpacity onPress={() => navigation.navigate('TaskFormScreen', {id: item.id})}>
                                    <MaterialIcons name='playlist-add' style={styles.icon}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('ViewTasksScreen', {id: item.id, name: item.name})}>
                                    <MaterialIcons name='playlist-add-check' style={styles.icon}/>
                                </TouchableOpacity>
                                <Text>{item.name}, ID:{item.id}</Text>
                                <TouchableOpacity onPress={() => deletePlant(item.id)}>
                                    <Feather name='trash' style={styles.icon}/>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 20,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderColor: 'gray'
    },
    icon: {
        fontSize: 24,
        marginLeft:20
      },
  });