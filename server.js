// DotEnv
require('dotenv').config()
// cors
const cors = require('cors');
// bring in Express
const express = require('express');
// mongoose:
const mongoose = require('mongoose');
// set a variable of app to run the express method
const app = express();
// set a port - listen changes on the port
const port = 4000;

// allow cors origin
app.use(cors());


// import routes
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comments');

// use json with express:
app.use(express.json());

//  log out path and method of each request:
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();    
});

//  attach the routes to the app
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);
app.use('/api/comments', commentRoutes);

const mongoUsername = process.env.MONGODB_USERNAME
const mongoPassword = process.env.MONGODB_PASSWORD

const mongoURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.vfbdng8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Define the home route for the backend
app.get('/', (req, res) => {
    // what happens at that route
    res.send("Hello, this is your express server!")
})

// Listen to changes
app.listen(port, () => {
    console.log(`Express server is running on http://localhost:${port}`);
})

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to mongoDB Atlas');
        
    })
    .catch((err) => {
        console.error('error connecting to mongodb atlas:', err)
    });