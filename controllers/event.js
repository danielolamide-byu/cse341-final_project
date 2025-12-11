

const mongodb = require('../config/data');
const saveValid = require('../validator/eventValidator')
const ObjectId = require('mongodb').ObjectId;




const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db('event_management').collection('events').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
    }
    catch (error) {
        res.status(200).json("Error fetching events.", error);
    }
};

const getSingle = async (req, res) => {
    try {
         const eventID = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('event_management').collection('events').find({ _id: eventID });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    })
    }
    catch (error) {
        res.status(500).json("Error fetching event.", error)
    }
};

const createEvent = async (req, res) => {
    const { error, value: eventData } = saveValid.eventValidator(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const response = await mongodb.getDatabase().db("event_management").collection("events").insertOne(eventData);
    
        if (response.acknowledged) {
            res.status(201).json("Event created successfully.");
        } else {
            res.status(500).json("Failed to create event. Operation not acknowledged.");
        }

    } catch(error) {
        console.error("Error while creating event.", error);
        res.status(500).json("An internal server error occurred.");
    }
}

const updateEvent = async (req, res) => {
    const eventId = new ObjectId(req.params.id);
    const { error, value: eventData } = saveValid.eventValidator(req.body);
    if (error) {
        return res.status(400).json("Error while trying to update event. Try checking your internet connection.");
    }
    try {
        const response = await mongodb.getDatabase().db("event_management").collection("events").replaceOne({ _id: eventId }, eventData)
    
        if (response.modifiedCount > 0) {
            res.status(200).send("Yay, event Updated Successfully.");
        } else {
            res.status(500).json("Nothing to modify.");
        }
    }
    catch(error) {
        console.error("Error while updating events.", error); 
    res.status(500).json("An internal server error occurred.");
        // console.log("An internal Error occured with the server.")
    }
}

const deleteEvent = async (req, res) => {
    const eventId = new ObjectId(req.params.id)
    try {
        const response = await mongodb.getDatabase().db("event_management").collection("events").deleteOne({ _id: eventId }, true);
        if (response.deletedCount > 0) {
            res.status(204).send("Deleted event successfully");
        } else {
            res.status(500).send("There was an error while trying to delete this event.");
        }
    } catch {
        res.status(500).json("Internal server error occured.");
    }
}



module.exports = {
    getAll,
    getSingle,
    createEvent,
    updateEvent,
    deleteEvent
}