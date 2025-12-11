



const express = require('express');

const router = express.Router();

const registration = require('../controllers/registration');

router.get('/', registration.getAll);
router.get('/:id', registration.getSingle)
router.post('/', registration.createRegistration);
router.put('/:id', registration.updateRegistration);
router.delete('/:id', registration.deleteRegistration);

module.exports = router;