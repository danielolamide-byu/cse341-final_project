

const express = require('express');

const router = express.Router();

const user = require('../controllers/user');
const isAuthenticated = require('../middleware/auth');

router.get('/', user.getAll);
router.get('/:id', user.getSingle);
router.post('/', isAuthenticated, user.createUser);
router.put('/:id', isAuthenticated, user.updateUser)
router.delete('/:id', isAuthenticated, user.deleteUser);

module.exports = router;