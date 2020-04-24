import React, { useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TasksScreen() {
    const [taskInstances, setTaskInstances] = useState([])
    const taskInstancesTestData = [
        {id: 1, description: 'Spray air plant', frequency: 3, completed: false, plantId: 1, plantName: 'Planty'},
        {id: 2, description: 'Soak air plant', frequency: 7, completed: false, plantId: 1, plantName: 'Planty'},
        {id: 3, description: 'Change water', frequency: 2, completed: false, plantId: 2, plantName: 'Planty 2'},
    ]

    React.useEffect( () => {
       setTaskInstances(taskInstancesTestData)
    }, [])

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop:"30%" }}
        >
            <Text>Tasks</Text>
            <FlatList 
                data={taskInstances}
                keyExtractor={taskInstance => taskInstance.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                // updated completed prop in UI
                                let modifiedTaskIndex;
                                taskInstances.filter((task, index) => {
                                    if (task.id === item.id) {
                                        modifiedTaskIndex = index;
                                    }
                                });
                                taskInstances[modifiedTaskIndex].completed = !item.completed;
                                setTaskInstances([...taskInstances]);
                            }}
                        >
                            <View style={styles.row}>
                                <Text style={{textDecorationLine: item.completed === false ? 'none' : 'line-through'}}>
                                    {item.plantName}: {item.description} 
                                </Text>
                                <MaterialCommunityIcons 
                                    name={item.completed === false ? 'checkbox-blank-outline' : 'checkbox-marked-outline'} 
                                    style={styles.icon}
                                />
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
        fontSize: 15,
        marginLeft: 20
    },
})
