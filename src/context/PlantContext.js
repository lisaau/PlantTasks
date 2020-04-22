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

    const editPlant = async (id, name, species) => {
        try {
            const apiPlant = await fetch(
                'https://planttasks.herokuapp.com/plant',
                {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        plantId: id,
                        plantName: name,
                        plantSpecies: species
                    })
                }
            );
            const json = await apiPlant.json(); // json is an array with the 1st element as the modified plant object and the 2nd element is the plant's index in plants array
            plants[json[1]] = json[0] // replace the plant in index json[1] with the modifed plant json[0]
            setPlants([...plants]);
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
            setPlants(plants.filter(plant => plant.id !== json[0].id));
        } catch (e) {
            if (e) {
                console.log(e.message, 'Something went wrong');
            }
        }
    };

    useEffect(() => {
        fetchPlants();
    }, []);

    return (
        <PlantContext.Provider value={{ plants, addNewPlant, deletePlant, editPlant }}>
            {children}
        </PlantContext.Provider>
    );
};

export default PlantContext;
