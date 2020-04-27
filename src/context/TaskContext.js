import React, { useState, useEffect } from 'react';

const TaskContext = React.createContext();

export const TaskProvider = ({ children }) => {
    const [taskInstances, setTaskInstances] = useState([])
    const [tasks, setTasks] = useState([])

    const fetchTaskInstances = async () => {
        try {
            const apiTaskInstances = await fetch(
                'https://planttasks.herokuapp.com/taskinstances'
            );
            const json = await apiTaskInstances.json();
            setTaskInstances(json);
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
            setTasks([...tasks, json])
        } catch (e) {
            if (e) {
                console.log(e.message, 'Something went wrong');
            }
        }
    };

    React.useEffect(() => {
        fetchTaskInstances();
        fetchTasks()
    }, [])

    return (
        <TaskContext.Provider value={{ taskInstances, updateTaskInstanceStatus, tasks, addNewTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;
