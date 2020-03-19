const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const { mongoose } = require('./server/db/mongoose')

const log = console.log

// import the mongoose student
const { Merchandise } = require('./server/models/Merchandise')
const { User } = require('./server/models/User')
const { Authenticator } = require('./server/models/Authenticator')

// to validate object IDs
const { ObjectID } = require('mongodb')

const bodyParser = require('body-parser') 
app.use(bodyParser.json())

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
	next();
  });

// create a GET route
app.get('/', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

/** Items resource routes **/
// a POST route to *create* a item
app.post('/items', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	// Create a new student using the Student mongoose model
	const item = new Merchandise({
		itemName: req.body.itemName,
		itemCategory: req.body.itemCategory,
		itemDescription: req.body.itemDescription,
		itemImageSrc: req.body.itemImageSrc,
		bids: [],
		asks: [],
		orderHistory: []
	})

	// Save student to the database
	item.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
})

// a GET route to get all items
app.get('/items', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	Merchandise.find().then((items) => {
		res.send({ items }) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
})

/// a GET route to get a student by their id.
// id is treated as a wildcard parameter, which is why there is a colon : beside it.
// (in this case, the database id, but you can make your own id system for your project)
app.get('/items/:id', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	/// req.params has the wildcard parameters in the url, in this case, id.
	// log(req.params.id)
	const id = req.params.id

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// Otherwise, findById
	Merchandise.findById(id).then((item) => {
		if (!item) {
			res.status(404).send()  // could not find this student
		} else {
			/// sometimes we wrap returned object in another object:
			//res.send({student})   
			res.send(item)
		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})
})

// a PATCH route for changing properties of a resource.
// (alternatively, a PUT is used more often for replacing entire resources).
app.patch('/items/:id', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
	const id = req.params.id

	// get the updated name and year only from the request body.
	const {} = req.body

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}

})
});


/* --------- User backend implementation    ------------------*/
( async () => {
	// create admin
	try {
		let authenticator;
		authenticator = await Authenticator.findOne({
			username: "admin",
			password: "admin"
		});
		if(!authenticator) {
			authenticator = new Authenticator({
				username: "admin", 
				password: "admin"
			});
			authenticator = await authenticator.save();
		} 
		log("admin: ");
		log(authenticator);
	} catch(e) {
		log("create admin failed");
		log(e);
	}
}) ();


// a POST route to *create* a user
app.post('/users', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	// Create a new student using the Student mongoose model
	const { username, password } = req.body;
	const user = new User({
		username,
		password
	})

	// Save student to the database
	user.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
});
