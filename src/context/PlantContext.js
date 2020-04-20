import React, { useState, useEffect } from 'react';

const PlantContext = React.createContext();

export const PlantProvider = ({ children }) => {
    const [plants, setPlants] = useState([]);
    const fetchPlants = async () => {
        try {
            const apiPlants = await fetch(
                'https://planttasks.herokuapp.com/plants'
            );
            const json = await apiPlants.json();
            setPlants(json);
        } catch (e) {
            if (e) {
                console.log(e.message, 'Something went wrong');
            }
        }
    };

    const addNewPlant = async ({ name, species }) => {
        try {
            const apiPlants = await fetch(
                '/https://planttasks.herokuapp.com/plant',
                {
                    method: 'POST',
                    body: JSON.stringify({ name, species })
                }
            );
            const json = await apiPlants.json();
            console.log(json);
            setPlants([...plants, json]);
        } catch (e) {
            if (e) {
                console.log(e.message, 'Something went wrong');
            }
        }
    };

    useEffect(() => {
        fetchPlants();
    }, []);

    // const plants = [
    //     { id: 1, name: 'Plant #1', species: 'Air plant' },
    //     { id: 2, name: 'Plant #2', species: 'tulip' },
    // ]

    return (
        <PlantContext.Provider value={{ plants, addNewPlant }}>
            {children}
        </PlantContext.Provider>
    );
};

export default PlantContext;
