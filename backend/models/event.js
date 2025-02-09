const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    date: String,
    location: String,
    link: String,
});

module.exports = mongoose.model('Event', eventSchema);