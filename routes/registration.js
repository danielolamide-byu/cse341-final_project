



const express = require('express');

const router = express.Router();

const registration = require('../controllers/registration');
const isAuthenticated = require('../middleware/auth');

router.get('/', registration.getAll);
router.get('/:id', registration.getSingle)
router.post('/', isAuthenticated, registration.createRegistration);
router.put('/:id', isAuthenticated, registration.updateRegistration);
router.delete('/:id', isAuthenticated, registration.deleteRegistration);

module.exports = router;