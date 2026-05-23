import express from 'express';

const router = express.Router();

// Get all events
router.get('/', (req, res) => {
  // TODO: Fetch events from database
  res.status(200).json({ events: [] });
});

// Get single event
router.get('/:id', (req, res) => {
  // TODO: Fetch event by ID
  res.status(200).json({ event: {} });
});

// Create event
router.post('/', (req, res) => {
  // TODO: Create new event
  res.status(201).json({ message: 'Event created' });
});

// Update event
router.put('/:id', (req, res) => {
  // TODO: Update event
  res.status(200).json({ message: 'Event updated' });
});

// Delete event
router.delete('/:id', (req, res) => {
  // TODO: Delete event
  res.status(200).json({ message: 'Event deleted' });
});

// RSVP to event
router.post('/:id/rsvp', (req, res) => {
  // TODO: Add RSVP
  res.status(201).json({ message: 'RSVP added' });
});

export default router;
