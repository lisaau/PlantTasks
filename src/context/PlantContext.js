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

    const addNewPlant = async (name, species) => {
        try {
            console.log('addNewPlant params', name, species);
            const apiPlants = await fetch(
                'https://planttasks.herokuapp.com/plant',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        plantName: name,
                        plantSpecies: species
                    })
                }
            );
            const json = await apiPlants.json();
            console.log('addNewPlant json', json);
            setPlants([...plants, json]);
        } catch (e) {
            if (e) {
                console.log(e.message, 'Something went wrong');
            }
        }
    };

    const deletePlant = async id => {
        try {
            const apiPlant = await fetch(
                'https://planttasks.herokuapp.com/plant',
                {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        plantId: id
                    })
                }
            );
            const json = await apiPlant.json();
            console.log('deletePlant json', json);
            setPlants(plants.filter(plant => plant.id !== json.id));
            console.log('deletePlant plants', plants);
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
        <PlantContext.Provider value={{ plants, addNewPlant, deletePlant }}>
            {children}
        </PlantContext.Provider>
    );
};

export default PlantContext;
