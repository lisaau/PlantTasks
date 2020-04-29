import React, { useState, useEffect } from 'react';

const TaskContext = React.createContext();

export const TaskProvider = ({ children }) => {
    const [taskInstances, setTaskInstances] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTaskInstances = async () => {
        try {
            const apiTaskInstances = await fetch(
                'https://planttasks.herokuapp.com/taskinstances/today'
            );
            const json = await apiTaskInstances.json();
            setTaskInstances(json);
            setLoading(false);
        } catch (e) {
            if (e) {
                console.log(e.message, 'Something went wrong');
            }
        }
    };

    const updateTaskInstanceStatus = async (status, taskInstanceId) => {
        try {
            const apiTaskInstance = await fetch(
                'https://planttasks.herokuapp.com/taskinstance',
                {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        status: status,
                        taskInstanceId: taskInstanceId
                    })
                }
            );
            const json = await apiTaskInstance.json();
            let modifiedTaskIndex;
            taskInstances.filter((task, index) => {
                if (task.task_instance_id === json.id) {
                    modifiedTaskIndex = index;
                }
            });
            taskInstances[modifiedTaskIndex].completed = json.completed;

            setTaskInstances([...taskInstances]);
        } catch (e) {
            if (e) {
                console.log(e.message, 'Something went wrong');
            }
        }
    };

    const fetchTasks = async () => {
        try {
            const apiTaskInstances = await fetch(
                'https://planttasks.herokuapp.com/tasks'
            );
            const json = await apiTaskInstances.json();
            setTasks(json);
        } catch (e) {
            if (e) {
                console.log(e.message, 'Something went wrong');
            }
        }
    };

    const addNewTask = async (description, frequency, plantId) => {
        try {
            console.log('addNewTask params', description, frequency, plantId);
            const apiTaskInstance = await fetch(
                'https://planttasks.herokuapp.com/task',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        description: description,
                        frequency: frequency,
                        plantId: plantId
                    })
                }
            );
            const json = await apiTaskInstance.json();
            console.log('addNewTask json', json);
            setTasks([...tasks, json]);
        } catch (e) {
            if (e) {
                console.log(e.message, 'Something went wrong');
            }
        }
    };

    const deleteTask = async taskId => {
        try {
            const apiTask = await fetch(
                'https://planttasks.herokuapp.com/task',
                {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        taskId: taskId
                    })
                }
            );
            const json = await apiTask.json();
            console.log('deleteTask json', json);
            setTasks(tasks.filter(task => task.id !== json.id));
        } catch (e) {
            if (e) {
                console.log(e.message, 'Something went wrong');
            }
        }
    };

    React.useEffect(() => {
        fetchTaskInstances();
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider
            value={{
                taskInstances,
                updateTaskInstanceStatus,
                tasks,
                addNewTask,
                deleteTask,
                loading
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;
