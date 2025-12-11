

const express = require('express');

const router = express.Router();

const user = require('../controllers/user');

router.get('/', user.getAll);
router.get('/:id', user.getSingle);
router.post('/', user.createUser);
router.put('/:id', user.updateUser)
router.delete('/:id', user.deleteUser);

module.exports = router;