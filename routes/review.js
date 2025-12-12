


const express = require('express');

const router = express.Router();

const review = require('../controllers/review');
const isAuthenticated = require('../middleware/auth');

router.get('/', review.getAll);
router.get('/:id', review.getSingle)
router.post('/', isAuthenticated, review.createReview);
router.put('/:id',isAuthenticated, review.updateReview);
router.delete('/:id', isAuthenticated, review.deleteReview);

module.exports = router;