import React from "react";

const PlantContext = React.createContext();


export const PlantProvider = ({ children }) => {
    const plants = [
        { id: 1, name: 'Plant #1' },
        { id: 2, name: 'Plant #2' },
    ]

    return <PlantContext.Provider value={plants}>
        {children}
    </PlantContext.Provider>
};

export default PlantContext;
