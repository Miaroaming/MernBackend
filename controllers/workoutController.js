// import the model
const Workout = require('../models/workoutModel');

// import mongoose
const mongoose = require('mongoose')


// Get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// Get single workout
const getWorkout = async (req, res) => {
    const {id} = req.params
    // check if id is valid mongo id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});
    }
    // try find a workout by its id
    const workout = await Workout.findById(id)
    // if no workout found show an error
    if (!workout) {
        return res.status(404).json({error: 'No such workout'});
    }
    // otherwise return the workout found
    res.status(200).json(workout)
}

// Create workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    //add doc to db
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteWorkout = async (req, res) => {
    // get the id from the request parameters
    const {id} = req.params;
    // check if id is valid mongo object id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});
    }

    // if it is valid - find and delete
    const workout = await Workout.findOneAndDelete({_id: id})

    // if id is valid but no workout is found
    if (!workout) {
        return res.status(404).json({error: 'No such workout'});
    }

    // if it successfully finds and deletes:
    res.status(200).json(workout + ' successfully deleted');
}

// Update workout
const updateWorkout = async (req,res) => {
    const {id} = req.params;

    // check if mongo id is valid
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});
    }

    // find a workout by its id
    // if it finds it then
    // spread out the properties of the request
    // edit/change what it receives
    // - that comes from the request body
    const workout = await Workout.findOneAndUpdate(
        {_id: id}, 
        {...req.body},
        {new: true}
    );

    if(!workout) {
        return res.status(404).json({error: 'No such workout'});
    }

    // return the updated workout
    res.status(200).json(workout)
}

module.exports = {getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout}