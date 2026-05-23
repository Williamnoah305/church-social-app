import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Church Events</h1>
      
      {loading ? (
        <p className="text-gray-500">Loading events...</p>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event: any) => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-blue-600 h-32"></div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <p className="text-sm text-gray-500 mb-4">📅 {event.date}</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  RSVP Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No events scheduled yet.</p>
      )}
    </div>
  );
};

export default EventsPage;
