

const mongodb = require('../config/data');
const ObjectId = require('mongodb').ObjectId;
const saveValid = require('../validator/userValidator');

const getAll = async (req, res) => {
    try {
        const response = await mongodb.getDatabase().db('event_management').collection('users').find();
        response.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users);
        })
    } catch (error) {
        console.log("Error while trying to fetch users.", error);
        res.status(500).json("Cannot fetch users at the moment.", error);
    }
}

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDatabase().db('event_management').collection('users').find({ _id: userId });
        response.toArray().then((user) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(user);
        })
    } catch (error) {
        console.log("Error while trying to fetch this user.", error);
        res.status(500).json("Failed to fetch Users.", error);
    }
}

const createUser = async (req, res) => {
    const { error, value: userData } = saveValid.userValidator(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const response = await mongodb.getDatabase().db("event_management").collection("users").insertOne(userData);

        if (response.acknowledged) { 
            console.log("User created Successfully.");
            res.status(201).json("User created Successfully.")
        } else {
            res.status(500).json("Failed to create User.");
        }
    } catch (error) {
        console.error("Something went wrong while trying to create User.", error);
        res.status(500).json("An internal server error occured.");
    }
};

const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id)
    const { error, value: userData } = saveValid.userValidator(req.body);

    if (error) {
        console.log("Error updating User.", error);
    } else {
        try {
            const response = await mongodb.getDatabase().db('event_management').collection('users').replaceOne({ _id: userId }, userData);
            if (response.modifiedCount > 0) {
                console.log("User updated Successfully.");
                res.status(201).send("User updated Successfully.")
            } else {
                res.status(500).json("Failed to update User.");
            }
        } catch (error) {
            console.log("Something went wrong while trying to update User.", error);
            res.status(500).json("Something went wrong while trying to update User", error);
        }
    }
}

const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDatabase().db('event_management').collection('users').deleteOne({ _id: userId }, true);
        if (response.deletedCount > 0) {
            res.status(204).send("User deleted successfully.");
        }
        else {
            res.status(500).send("Wasn't able to delete user.");
        }
    } catch (error) {
        res.status(500).json("Error while trying to delete user.", error);
        }
    }





module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
}