const express = require('express');

// TEST DATA
const plants = [
    { id: 1, name: 'Plant #1', species: 'Air plant' },
    { id: 2, name: 'Plant #2', species: 'tulip' }
];

// MIDDLEWARE
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // needed for Postman
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.get('/test', (req, res) => {
    res.send('hello');
});

app.get('/plants', (req, res) => {
    res.json(plants);
});

app.get('/plants/:id', (req, res) => {
    let id = parseInt(req.params.id)
    res.json(plants.filter(plant => plant['id'] === id));
});

app.post('/plant', (req, res) => {
    let { plantName, plantSpecies } = req.body;
    let newPlant = {'id': Math.floor(Math.random() * 99999), 'name': plantName, 'species': plantSpecies};
    plants.push(newPlant);
    res.json(newPlant)
});

app.delete('/plant', (req, res) => {
    let { plantId } = req.body;
    // find the index of the plant of a particular ID and if it's there, remove it
    const index = plants.indexOf(plants.find( plant => plant.id === parseInt(plantId)));
    if (index > -1) {
        res.json(plants.splice(index, 1));
    }
});

// returns array with first element as modified plant and second element the index in the plants array
// use the plant object and index to re-render UI
app.put('/plant', (req, res) => {
    let { plantId, plantName, plantSpecies } = req.body;
    plantId = parseInt(plantId);
    // take ID, modify plant with that id
    plants.forEach(plant => {
        if (plant.id === plantId) {
            plant.name = plantName;
            plant.species = plantSpecies;
        }
    })

    // return that modified plant object with plants.find(p => p.id === plantId) and its corresponding index in plants array
    let editedPlant = plants.find(p => p.id === plantId);
    console.log(editedPlant)
    let editedPlantIndex;
    for(let i = 0; i < plants.length; i += 1) {
        if(plants[i]['id'] === plantId) {
            editedPlantIndex = i;
        }
    }
    res.json([editedPlant, editedPlantIndex])
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}`);
});
