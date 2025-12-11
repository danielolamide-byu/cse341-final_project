



const mongodb = require('../config/data');
const saveValid = require('../validator/registrationValidation');
const ObjectId = require('mongodb').ObjectId;




const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db('event_management').collection('registration').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
    }
    catch (error) {
        res.status(500).json("Error fetching registration details.", error);
    }
};

const getSingle = async (req, res) => {
    try {
         const registrationId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('event_management').collection('registration').find({ _id: registrationId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    })
    }
    catch (error) {
        res.status(500).json("Error fetching registration details.", error)
    }
};

const createRegistration = async (req, res) => {
    const { error, value: registrationData } = saveValid.registrationValidator(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const response = await mongodb.getDatabase().db("event_management").collection("registration").insertOne(registrationData);
    
        if (response.acknowledged) {
            res.status(201).json("Registration details created successfully.");
        } else {
            res.status(500).json("Failed to create registration details. Operation not acknowledged.");
        }

    } catch(error) {
        console.error("Error while creating registration details.", error);
        res.status(500).json("An internal server error occurred.");
    }
}

const updateRegistration = async (req, res) => {
    const registrationId = new ObjectId(req.params.id);
    const { error, value: registrationData } = saveValid.registrationValidator(req.body);
    if (error) {
        return res.status(400).json("Error while trying to update registration details. Try checking your internet connection.");
    }
    try {
        const response = await mongodb.getDatabase().db("event_management").collection("registration").replaceOne({ _id: registrationId }, registrationData)
    
        if (response.modifiedCount > 0) {
            res.status(200).send("Yay, registration details Updated Successfully.");
        } else {
            res.status(500).json("Nothing to modify.");
        }
    }
    catch(error) {
        console.error("Error while updating registration details.", error); 
    res.status(500).json("An internal server error occurred.");
        // console.log("An internal Error occured with the server.")
    }
}

const deleteRegistration = async (req, res) => {
    const registrationId = new ObjectId(req.params.id)
    try {
        const response = await mongodb.getDatabase().db("event_management").collection("registration").deleteOne({ _id: registrationId }, true);
        if (response.deletedCount > 0) {
            res.status(204).send("Deleted registration details successfully");
        } else {
            res.status(500).send("There was an error while trying to delete this registration detail.");
        }
    } catch {
        res.status(500).json("Internal server error occured.");
    }
}



module.exports = {
    getAll,
    getSingle,
    createRegistration,
    updateRegistration,
    deleteRegistration
}