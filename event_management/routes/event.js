

const express = require('express');

const router = express.Router();

const event = require('../controllers/event');

router.get('/', event.getAll);
router.get('/:id', event.getSingle)
router.post('/', event.createEvent);
router.put('/:id', event.updateEvent);
router.delete('/:id', event.deleteEvent);

module.exports = router;