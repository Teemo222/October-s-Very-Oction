/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
const mongoose = require('mongoose')

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.


const mongoURI = 'mongodb+srv://teemo222:Donotgoaway2@cluster0-xvltq.mongodb.net/test?retryWrites=true&w=majority'
process.env.MONGODB_URI  = process.env.NODE_ENV == "development" ? 'mongodb://localhost:27017/test' :  mongoURI;

mongoose.connect(process.env.MONGODB_URI, 
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}).catch(error => {console.log(error)});

module.exports = { mongoose }  // Export the active connection.

