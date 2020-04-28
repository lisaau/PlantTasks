import React, { useState, useEffect } from 'react';

const PlantContext = React.createContext();

export const PlantProvider = ({ children }) => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchPlants = async () => {
        try {
            const apiPlants = await fetch(
                'https://planttasks.herokuapp.com/plants'
            );
            const json = await apiPlants.json();
            setPlants(json);
            setLoading(false);
        } catch (e) {
            if (e) {
                console.log(e.message, 'Something went wrong');
            }
        }
    };

    const addNewPlant = async (name, species, notes) => {
        try {
            console.log('addNewPlant params', name, species, notes);
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
                        plantSpecies: species,
                        plantNotes: notes
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

    const editPlant = async (id, name, species, notes) => {
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
                        plantSpecies: species,
                        plantNotes: notes
                    })
                }
            );

            // Get the index of the plant in plants array and replace it with modified plant
            const json = await apiPlant.json();
            let modifiedPlantIndex;
            plants.filter((plant, index) => {
                if (plant.id === json.id) {
                    modifiedPlantIndex = index;
                }
            });
            plants[modifiedPlantIndex] = json;
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
            setPlants(plants.filter(plant => plant.id !== json.id));
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
        <PlantContext.Provider value={{ plants, addNewPlant, deletePlant, editPlant, loading }}>
            {children}
        </PlantContext.Provider>
    );
};

export default PlantContext;
