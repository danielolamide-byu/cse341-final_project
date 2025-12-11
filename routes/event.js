

const express = require('express');

const router = express.Router();

const event = require('../controllers/event');
const isAuthenticated = require('../middleware/auth');

router.get('/', event.getAll);
router.get('/:id', event.getSingle)
router.post('/', isAuthenticated, event.createEvent);
router.put('/:id', isAuthenticated, event.updateEvent);
router.delete('/:id', isAuthenticated, event.deleteEvent);

module.exports = router;