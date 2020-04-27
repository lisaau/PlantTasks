import React, { useState, useContext } from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TaskContext from '../context/TaskContext';

export default function TasksScreen() {
    const { taskInstances, updateTaskInstanceStatus } = useContext(TaskContext);

    // temp filtered data. change comparison to current date after adding auto-generated task instances feature
    let filteredTaskInstances = taskInstances.filter(ti => ti.due_date.substring(0,10) === '2020-04-25')

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop:"30%" }}
        >
            <Text>Tasks</Text>
            <FlatList 
                data={filteredTaskInstances}
                keyExtractor={taskInstance => (taskInstance['task_instance_id']).toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                updateTaskInstanceStatus(!item.completed, item.task_instance_id)
                            }}
                        >
                            <View style={styles.row}>
                                <Text style={{textDecorationLine: item.completed === false ? 'none' : 'line-through'}}>
                                    {item.name}: {item.description}
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
