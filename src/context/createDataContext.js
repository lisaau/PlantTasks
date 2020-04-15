import React, { useReducer } from 'react';

// a resuable function to automate the process of setting up context and provider
export default (reducer, actions, intialState) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, intialState);

        // actions === { actionName: (dispatch) => { return () => {} } }
        // loop through the object and for every key, 
        // call that function with the dispatch which will return a function 
        // that we're then going to pass down on the value prop
        const boundActions = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return <Context.Provider value={{ state, ...boundActions  }}>
            {children}
        </Context.Provider>
    }

    return { Context, Provider }
};
