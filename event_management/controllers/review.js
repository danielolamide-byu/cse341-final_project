





const mongodb = require('../config/data');
const saveValid = require('../validator/reviewValidator');
const ObjectId = require('mongodb').ObjectId;




const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db('event_management').collection('review').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
    }
    catch (error) {
        res.status(500).json("Error fetching registration reviews.", error);
    }
};

const getSingle = async (req, res) => {
    try {
         const reviewID = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('event_management').collection('review').find({ _id: reviewID });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    })
    }
    catch (error) {
        res.status(500).json("Error fetching this review.", error)
    }
};

const createReview = async (req, res) => {
    const { error, value: reviewData } = saveValid.reviewValidator(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const response = await mongodb.getDatabase().db("event_management").collection("review").insertOne(reviewData);
    
        if (response.acknowledged) {
            res.status(201).json("Review created successfully.");
        } else {
            res.status(500).json("Failed to create reviews. Operation not acknowledged.");
        }

    } catch(error) {
        console.error("Error while creating reviews.", error);
        res.status(500).json("An internal server error occurred.");
    }
}

const updateReview = async (req, res) => {
    const reviewID = new ObjectId(req.params.id);
    const { error, value: reviewData } = saveValid.reviewValidator(req.body);
    if (error) {
        return res.status(400).json("Error while trying to update this review. Try checking your internet connection.");
    }
    try {
        const response = await mongodb.getDatabase().db("event_management").collection("review").replaceOne({ _id: reviewID }, reviewData)
    
        if (response.modifiedCount > 0) {
            res.status(200).send("Yay, review updated Successfully.");
        } else {
            res.status(500).json("Nothing to modify.");
        }
    }
    catch(error) {
        console.error("Error while updating review.", error); 
    res.status(500).json("An internal server error occurred.");
        // console.log("An internal Error occured with the server.")
    }
}

const deleteReview = async (req, res) => {
    const reviewID = new ObjectId(req.params.id)
    try {
        const response = await mongodb.getDatabase().db("event_management").collection("review").deleteOne({ _id: reviewID }, true);
        if (response.deletedCount > 0) {
            res.status(204).send("Deleted review successfully.");
        } else {
            res.status(500).send("There was an error while trying to delete this review.");
        }
    } catch {
        res.status(500).json("Internal server error occured.");
    }
}



module.exports = {
    getAll,
    getSingle,
    createReview,
    updateReview,
    deleteReview
}