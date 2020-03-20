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

// express-session for managing user sessions
const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: true }));

/*** Session handling **************************************/
// Create a session cookie
app.use(session({
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000,
        httpOnly: true
    }
}));

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


/* --------- User backend implementation    ------------------*/
;( async () => {
	// create admin
	try {
		let authenticator;
		authenticator = await User.findOne({
			username: "admin"
		});
		if(!authenticator) {
			authenticator = new User({
				username: "admin", 
				password: "admin"
			});
			authenticator = await authenticator.save();
			let admin_task = new Authenticator({
				userId: authenticator._id
			});
			await admin_task.save();
		} 
		log("admin: ");
		log(authenticator);
	} catch(e) {
		log("create admin failed");
		log(e);
	}
}) ();

// Our own express middleware to check for 
// an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {
    if (req.session.userid) {
        res.redirect('/'); // redirect to homepage if not logged in.
    } else {
        next(); // next() moves on to the route.
    }    
};

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
	if (req.session.userid) {
		User.findById(req.session.userid).then((user) => {
			if (!user) {
				return Promise.reject()
			} else {
				req.user = user
				next()
			}
		}).catch((error) => {
			res.status(401).send("Unauthorized")
		})
	} else {
		res.status(401).send("Unauthorized")
	}
}

// a POST route to *create* a user
app.post('/users/create', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	// Create a new student using the Student mongoose model
	const { username, password } = req.body;
	const user = new User({
		username,
		password
	})

	// Save student to the database
	user.save().then((result) => {
		req.session.userid = user._id;
		req.session.username = user.username;
		req.session.isAdmin = false;
		user.isAdmin = false;
		res.send(user)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
});

// user login
app.post('/users/login', async (req, res) => {
	const username = req.body.username
    const password = req.body.password

    // Use the static method on the User model to find a user
	// by their email and password
	let user;
	try {
		user = await User.findByUsernamePassword(username, password);
		if(!user) {
			res.status(400).send({
				success: false
			})			
		}
		let admin_task = await Authenticator.findOne({
			username: user.username
		});
		req.session.userid = user._id;
		req.session.username = user.username;
		user.success = true;
		log(user);
		if(admin_task) {
			req.session.isAdmin = true;
			user.isAdmin = true;
			res.send(user);
		} else {
			req.session.isAdmin = false;
			user.isAdmin = false;
			res.send(user);
		}
	} catch(e) {
		res.status(400).send({
			success: false
		})
	}
})

// A route to logout a user
app.get('/users/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
})

app.get('/users/admin', (req, res) => {
	if(req.session.isAdmin) {
		res.send({
			isAdmin: true
		});
	} else {
		res.send({
			isAdmin: false
		});
	}
})

app.get('/users/all', async (req, res) => {
	try {
		let users = await User.find();
		res.send(users);
	} catch(err) {
		res.status(500).send(error)
	}
})

app.patch('/users/password', async (req, res) => {

	// get the updated name and year only from the request body.
	const { userid, password } = req.body;

	if (!ObjectID.isValid(userid)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}

	try {
		let user = await User.findById(userid);
		user.password = password;
		await user.save();
		res.send(user);
	} catch(err) {
		res.status(400).send(err);
	}
})