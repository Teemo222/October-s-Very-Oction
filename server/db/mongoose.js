/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
const mongoose = require('mongoose')

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.


process.env.MONGODB_URI = 'mongodb+srv://teemo222:Donotgoaway2@cluster0-xvltq.mongodb.net/test?retryWrites=true&w=majority'
const mongoURI = process.env.NODE_ENV == "development" ? 'mongodb://localhost:27017/test' :  process.env.MONGODB_URI;

mongoose.connect(mongoURI, 
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}).catch(error => {console.log(error)});

module.exports = { mongoose }  // Export the active connection.

