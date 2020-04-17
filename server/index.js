const express = require('express');

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

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}`);
});
