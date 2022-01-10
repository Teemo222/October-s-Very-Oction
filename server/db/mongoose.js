/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
const mongoose = require('mongoose')

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.

process.env.MONGODB_URI = 'mongodb://mongo:mongo@mongo:27017'

mongoose.connect(process.env.MONGODB_URI, 
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}).catch(error => {console.log(error)});

module.exports = { mongoose }  // Export the active connection.

