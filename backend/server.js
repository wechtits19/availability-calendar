// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// Connect to MongoDB
const connectionString = process.env.REACT_APP_MONGODB_PRIMARY_CONNECTION_STRING || 'mongodb://user:pass@localhost:27017?directConnection=true';

mongoose.connect(connectionString)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const availabilitySchema = new mongoose.Schema({
    house: Number,
    date: Date,
    type: String
});

const Availability = mongoose.model('Availability', availabilitySchema);

app.get('/api/availability', async (req, res) => {
    const availabilities = await Availability.find();
    res.json(availabilities);
});

app.get('/api/availability/:house', async (req, res) => {
    const house = parseInt(req.params.house, 10);
    const houseAvailabilities = await Availability.find({ house });
    res.json(houseAvailabilities);
});

app.post('/api/availability/:house', async (req, res) => {
    const house = parseInt(req.params.house, 10);
    const entries = req.body;

    await Availability.deleteMany({ house });
    await Availability.insertMany(entries);

    res.status(200).send('Availabilities saved');
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });