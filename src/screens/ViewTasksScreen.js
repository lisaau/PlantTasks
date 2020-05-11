import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import TaskContext from '../context/TaskContext';
import { Feather } from '@expo/vector-icons';

function DayFormatter(frequency) {
    return (
        frequency.frequency === 1 ? 'day' : 'days'
    )
}

export default function ViewTasksScreen({ navigation, route }) {
    const { tasks, deleteTask } = React.useContext(TaskContext);
    const {id, name} = route.params;
    const plantTasks = tasks.filter(task => task.plant_id === id)
    const displayTaskList = <FlatList 
                        data={plantTasks}
                        keyExtractor={task => task.id.toString()}
                        renderItem={({ item }) => {
                            return (
                            <View style={styles.row}>
                                    <Text style={styles.text}>{item.description}, every {item.frequency} <DayFormatter frequency={item.frequency}/></Text>
                                    <TouchableOpacity onPress={() => deleteTask(item.id)}>
                                        <Feather name='trash' style={styles.icon}/>
                                    </TouchableOpacity>
                            </View>
                            )
                        }}
                    />

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: `Tasks for ${name}`}, [navigation])
    });

    return (
        <View style={styles.container}>
            {plantTasks.length === 0 ? <Text>No tasks</Text> : displayTaskList}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginLeft: "5%",
        marginRight: "5%"
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 20,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderColor: 'gray',
    },
    icon: {
        fontSize: 24,
    },
    text: {
        width: "80%",
    }
});