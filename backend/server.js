// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/availability', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://user:pass@localhost:27017?directConnection=true')
    .then(() => {
        console.log('Verbunden mit MongoDB');
    })
    .catch((error) => {
        console.error('Fehler beim Verbinden mit MongoDB:', error);
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});