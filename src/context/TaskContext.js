import React, { useState, useEffect } from 'react';

const TaskContext = React.createContext();

export const TaskProvider = ({ children }) => {
    const [taskInstancesContext, setTaskInstances] = useState([])
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
            taskInstancesContext.filter((task, index) => {
                if (task.task_instance_id === json.id) {
                    modifiedTaskIndex = index;
                }
            });
            taskInstancesContext[modifiedTaskIndex].completed = json.completed;

            setTaskInstances([...taskInstancesContext]);
        } catch (e) {
            if (e) {
                console.log(e.message, 'Something went wrong');
            }
        }
    };

    React.useEffect(() => {
        fetchTaskInstances()
    }, [])

    return (
        <TaskContext.Provider value={{ taskInstancesContext, updateTaskInstanceStatus }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;
