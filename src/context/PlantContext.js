import React from 'react';
import TaskContext from '../context/TaskContext';

const PlantContext = React.createContext();

export const PlantProvider = ({ children, token }) => {
    const { fetchTaskInstances } = React.useContext(TaskContext);
    const [plants, setPlants] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const fetchPlants = async () => {
        try {
            const apiPlants = await fetch(
                'https://planttasks.herokuapp.com/plants',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const json = await apiPlants.json();
            setPlants(json);
            setIsLoading(false);
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
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
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
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
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
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        plantId: id
                    })
                }
            );
            const json = await apiPlant.json();
            console.log('deletePlant json', json);
            setPlants(plants.filter(plant => plant.id !== json.id));
            fetchTaskInstances()
        } catch (e) {
            if (e) {
                console.log(e.message, 'Something went wrong');
            }
        }
    };

    React.useEffect(() => {
        fetchPlants();
    }, []);

    return (
        <PlantContext.Provider value={{ plants, addNewPlant, deletePlant, editPlant, isLoading, fetchPlants }}>
            {children}
        </PlantContext.Provider>
    );
};

export default PlantContext;
