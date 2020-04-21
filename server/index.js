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

app.use(bodyParser.urlencoded({ extended: true }));
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
    let newPlant = {'id': plants.length + 1, 'name': plantName, 'species': plantSpecies};
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
    // res.json(plants.filter(plant => plant.id !== parseInt(plantId)))
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}`);
});
