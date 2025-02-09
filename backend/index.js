const dotenv = require("dotenv");
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
// Environment configuration
dotenv.config({ path: './config.env' });
const app = express();
app.use(cors());

mongoose.connect('mongodb+srv://aswaroopa2806:developer@cluster0.qes3w.mongodb.net/louderworld?retryWrites=true&w=majority&appName=Cluster0', {
    serverSelectionTimeoutMS: 5000, // Avoid connection hangs
});
console.log('Loaded API Key:', process.env.API_KEY);
const eventSchema = new mongoose.Schema({
    name: String,
    date: String,
    location: String,
    ticketLink: String,
});

const Event = mongoose.model('Event', eventSchema);

const fetchEventbriteEvents = async () => {
    try {
        console.log('Using API Key:', process.env.API_KEY); // Debugging

        const url = `https://www.eventbrite.com/d/australia--sydney/all-events/`; // Correct API path

        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${process.env.API_KEY}` },
            params: {
                'location.address': 'Sydney',
                'location.within': '50km', // Optional: Limits the search radius
                'expand': 'venue',  // Get venue details
            },
        });

        console.log('✅ Eventbrite API Response:', response.data);
    } catch (error) {
        console.error('❌ Error fetching Eventbrite events:', error.response?.data || error.message);
    }
};


fetchEventbriteEvents();


app.get('/api/events', async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

setInterval(fetchEventbriteEvents, 86400000);

app.listen(5000, () => {
    console.log('Server running on port 5000');
    fetchEventbriteEvents();
});
