const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const { mongoose } = require('./server/db/mongoose')

// import the mongoose student
const { Student } = require('./server/models/student')

// to validate object IDs
const { ObjectID } = require('mongodb')

const bodyParser = require('body-parser') 
app.use(bodyParser.json())

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });

// create a GET route
app.get('/', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

/** Student resource routes **/
// a POST route to *create* a student
app.post('/students', (req, res) => {
	// Create a new student using the Student mongoose model
	const student = new Student({
		name: req.body.name,
		year: req.body.year
	})

	// Save student to the database
	student.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
})

// a GET route to get all students
app.get('/students', (req, res) => {
	Student.find().then((students) => {
		res.send({ students }) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
})