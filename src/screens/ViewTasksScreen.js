import React, { useContext } from 'react';
import { Text, View, Button, TextInput, StyleSheet, FlatList } from 'react-native';
import TaskContext from '../context/TaskContext';


export default function ViewTasksScreen({ navigation, route }) {
    const { tasks } = useContext(TaskContext);
    const {id, name} = route.params;
    const plantTasks = tasks.filter(task => task.plant_id === id)
    console.log(plantTasks)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: `Tasks for ${name}`}, [navigation])
    });

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList 
                data={plantTasks}
                keyExtractor={task => task.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <Text>{item.description}</Text>
                    )
                }}
            />
    </View>
    );
}
