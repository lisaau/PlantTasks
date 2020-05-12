import React from 'react';
import {
    Alert,
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TaskContext from '../context/TaskContext';

export default function TasksScreen() {
    const {
        taskInstances,
        updateTaskInstanceStatus,
        isLoading
    } = React.useContext(TaskContext);

    const taskInstanceFlatList = (
        <View>
            <Text style={{ textAlign: 'center' }}>Tasks for Today:</Text>
            <FlatList
                data={taskInstances}
                keyExtractor={taskInstance =>
                    taskInstance['task_instance_id'].toString()
                }
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                updateTaskInstanceStatus(
                                    !item.completed,
                                    item.task_instance_id
                                );
                            }}
                        >
                            <View style={styles.row}>
                                <Text
                                    style={{
                                        width: '80%',
                                        textDecorationLine:
                                            item.completed === false
                                                ? 'none'
                                                : 'line-through'
                                    }}
                                >
                                    {item.name}: {item.description}
                                </Text>
                                <MaterialCommunityIcons
                                    name={
                                        item.completed === false
                                            ? 'checkbox-blank-outline'
                                            : 'checkbox-marked-outline'
                                    }
                                    style={styles.icon}
                                />
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );

    const taskInstanceDisplay =
        taskInstances.length === 0 ? (
            <Text style={styles.noTaskMessage}>🌼No Tasks For Today!🌼</Text>
        ) : (
            taskInstanceFlatList
        );

    // alert when user completes all tasks
    React.useEffect(() => {
        if (
            taskInstances.length !== 0 &&
            taskInstances.filter(ti => ti.completed === true).length ===
                taskInstances.length &&
            isLoading === false
        ) {
            Alert.alert('All tasks completed! 🎉');
        }
    }, [taskInstances]);

    return isLoading ? (
        <ActivityIndicator style={styles.indicator} size="large" />
    ) : (
        <View style={styles.view}>{taskInstanceDisplay}</View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%',
        marginLeft: '10%',
        marginRight: '10%'
    },
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
        marginLeft: 20,
        marginRight: '10%',
        width: '20%'
    },
    indicator: {
        padding: 200
    },
    noTaskMessage: {
        color: 'green',
        fontSize: 24
    }
});
