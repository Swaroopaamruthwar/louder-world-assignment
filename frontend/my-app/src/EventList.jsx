import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/events')
            .then(response => setEvents(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Events in Sydney</h1>
            {events.map(event => (
                <div key={event._id}>
                    <h2>{event.title}</h2>
                    <p>{event.date}</p>
                    <p>{event.location}</p>
                    <a href={event.link} target="_blank" rel="noopener noreferrer">
                        GET TICKETS
                    </a>
                </div>
            ))}
        </div>
    );
};

export default EventList;