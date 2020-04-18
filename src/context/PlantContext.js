import React, { useState, useEffect } from "react";

const PlantContext = React.createContext();


export const PlantProvider = ({ children }) => {
    const [plants, setPlants] = useState([]);
    const fetchPlants = async () => {
        try {
          const plants = await fetch('https://127.0.0.1:8000/plants')
          setPlants(plants)
          console.log(plants)
        } catch (e) {
          if (e) {
            console.log(e.message, 'Something went wrong')
          }
        }
    }

    useEffect(() => {
        fetchPlants()
    }, [])

    // const plants = [
    //     { id: 1, name: 'Plant #1', species: 'Air plant' },
    //     { id: 2, name: 'Plant #2', species: 'tulip' },
    // ]

    return <PlantContext.Provider value={plants}>
        {children}
    </PlantContext.Provider>
};

export default PlantContext;
