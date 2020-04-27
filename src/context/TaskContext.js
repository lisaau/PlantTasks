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
    React.useEffect(() => {
        fetchTaskInstances()
    }, [])

    return (
        <TaskContext.Provider value={{ taskInstancesContext }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;
