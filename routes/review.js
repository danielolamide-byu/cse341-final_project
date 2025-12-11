


const express = require('express');

const router = express.Router();

const review = require('../controllers/review');
const isAuthenticated = require('../middleware/auth');

router.get('/', review.getAll);
router.get('/:id', review.getSingle)
router.post('/',  review.createReview);
router.put('/:id', review.updateReview);
router.delete('/:id',  review.deleteReview);

module.exports = router;