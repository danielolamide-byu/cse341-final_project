
const express = require('express')
const router = express.Router();

router.use(require('./swagger'));

router.get('/', (req, res) => {
    res.send("Hi there users!");
})

router.use('/events', require('./event'))
router.use('/users', require('./user'));
router.use('/registrations', require('./registration'));
router.use('/reviews', require('./review'));


module.exports = router;