const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const fs = require('fs');

const { mongoose } = require('./server/db/mongoose')

const log = console.log

// import the mongoose student
const { Merchandise } = require('./server/models/Merchandise')
const { User } = require('./server/models/User')
// const { Authenticator } = require('./server/models/Authenticator')
const {Order} = require('./server/models/Order');
// const cors = require('cors');

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
        expires: 60000 * 60 * 72,
        httpOnly: true
    }
}));

app.use(function(req, res, next) {
	var allowedOrigins = ['http://localhost:3000', 'https://mighty-reef-32514.herokuapp.com'];
	var origin = req.headers.origin;
	if(allowedOrigins.indexOf(origin) > -1){
		 res.setHeader('Access-Control-Allow-Origin', origin);
	}
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Expose-Headers", "*");
	next();
  });

// app.options('*', cors());

app.use(express.static('images'));
app.use(express.static(__dirname + "/build"));

app.get('/searchpage', (req, res) =>{
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.get('/userprofile', (req, res) =>{
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.get('/managerprofile', (req, res) =>{
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.get('/itempage', (req, res) =>{
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

/** Items resource routes **/
// a POST route to *create* a item
// app.post('/items', (req, res) => {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	// Create a new student using the Student mongoose model
// 	const item = new Merchandise({
// 		itemName: req.body.itemName,
// 		itemCategory: req.body.itemCategory,
// 		itemDescription: req.body.itemDescription,
// 		itemImageSrc: req.body.itemImageSrc,
// 		bids: [],
// 		asks: [],
// 		orderHistory: []
// 	})

// 	// Save student to the database
// 	item.save().then((result) => {
// 		res.send(result)
// 	}, (error) => {
// 		res.status(400).send(error) // 400 for bad request
// 	})
// })

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, './images')
	},
	filename: function (req, file, cb) {
	  // cb(null, uuidv4() + path.extname(file.originalname))
	  cb(null, "IMAGE_" + Date.now() + "_" + file.originalname);
	}
  })
  
  var upload = multer({ storage: storage });
  
  app.post('/items', upload.single('itemImageSrc'), async (req, res, next) => {
	// req.file is the `avatar` file
	// req.body will hold the text fields, if there were any
	let itemImageSrc = uuidv4() + path.extname(req.file.originalname);
	await sharp(req.file.path)
	//   .resize(500, 500)
	  .toFile(
		path.resolve(req.file.destination, itemImageSrc)
	  );
	fs.unlinkSync(req.file.path);
	// const backendUrl = "http://localhost:5000/";
	// itemImageSrc = backendUrl + itemImageSrc;
	// console.log("In /items route");
	// console.log(req.body.itemName);
	// console.log(req.body.itemCategory);
	// console.log(req.body.itemDescription);
	// console.log(itemImageSrc);

	const item = new Merchandise({
		itemName: req.body.itemName,
		itemCategory: req.body.itemCategory,
		itemDescription: req.body.itemDescription,
		itemImageSrc: itemImageSrc,
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
});

app.get('/items-by-keyword/:kw',(req, res)=>{
	res.header("Access-Control-Allow-Origin", "*");

	Merchandise.find(
		{
			itemName:{$regex: new RegExp(`.*${req.params.kw}.*`,'i')}
		}
	).then((items) => {
		res.send({ items }) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
});

app.get('/items-by-category/:cat',(req, res)=>{
	res.header("Access-Control-Allow-Origin", "*");
	Merchandise.find(
		{
			itemCategory:{$regex: new RegExp(`.*${req.params.cat}.*`,'i')}
		}
	).then((items) => {
		res.send({ items }) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
});

app.get('/items-by-keyword-and-category/:kw/:cat',(req, res)=>{
	res.header("Access-Control-Allow-Origin", "*");
	Merchandise.find(
		{
			itemName:{$regex: new RegExp(`.*${req.params.kw}.*`,'i')},
			itemCategory:{$regex: new RegExp(`.*${req.params.cat}.*`,'i')}
		}
	).then((items) => {
		res.send({ items }) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
});

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
		res.status(500).send(error)  // server error
	})
})
app.get('/item-lowest-ask/:id', async (req, res)=>{
	const item = await Merchandise.findById(itemId);
	const low = Math.min(...item.asks.keys().map(
		price=>parseInt(price)
	));
	res.send({lowestAsk:low, sellers:item.asks[low].map(user=>user.id)});
});
app.get('/item-highest-bid/:id', async (req, res)=>{
	const item = await Merchandise.findById(itemId);
	const highest = Math.max(...item.bids.keys().map(
		price=>parseInt(price)
	));
	res.send({highestBid:highest, buyers:item.bids[highest].map(user=>user.id)});
});
app.post('/items-add-bid/', async (req, res)=>{
	res.header("Access-Control-Allow-Origin", "*");
	const { itemId, price, userId} = req.body;
	Merchandise.findById(itemId).then(async(item)=>{
		const p = '' + price;
		const user = new mongoose.Types.ObjectId(userId);
		if(item.bids.get(p)){
			item.bids.get(p).push(user)
		}
		else{
			item.bids.set(p, [user]);
		}
		item.markModified('bids');
		await item.save();
		res.send(item);
	});
});

app.post('/items-add-ask/', async (req, res)=>{
	res.header("Access-Control-Allow-Origin", "*");
	const { itemId, price, userId} = req.body;
	Merchandise.findById(itemId).then(async(item)=>{
		const p = '' + price;
		const user = new mongoose.Types.ObjectId(userId);
		if(item.asks.get(p)){
			item.asks.get(p).push(user)
		}
		else{
			item.asks.set(p, [user]);
		}
		await item.save();
		res.send(item);
	});
});

app.get('/filter-items/:filter', async (req, res)=>{
	const {filter} = req.params;
	if(filter == "popularity"){
		const items = await Merchandise.aggregate([
			{
				$project:{
					asks:1,
					bids:1,
					orderHistory:1,
					_id: 1,
					itemName:1,
					itemCategory:1,
					itemDescription:1,
					itemImageSrc:1,
					score: {
						$add: [{$size: {$objectToArray:"$bids"}},  {$size:{$objectToArray:"$asks"}},{$size:"$orderHistory"}]
					}
				}
			},
			{
				$sort:{
					score:-1
				}
			}
		]);
		res.send(items);
	}else if(filter == "price"){
		const items = await Merchandise.aggregate([
			{
				$project:{
					asks:1,
					bids:1,
					orderHistory:1,
					_id: 1,
					itemName:1,
					itemCategory:1,
					itemDescription:1,
					itemImageSrc:1,
					priceKV:{$objectToArray:"$asks"}
				}
			},
			{
				$project:{
					asks:1,
					bids:1,
					orderHistory:1,
					_id: 1,
					itemName:1,
					itemCategory:1,
					itemDescription:1,
					itemImageSrc:1,
					price:"$priceKV.k"
				}
			},
			{
				$unwind:{
					path:"$price",
					preserveNullAndEmptyArrays:true
				}
			},
			{
				$project:{
					asks:1,
					bids:1,
					orderHistory:1,
					_id: 1,
					itemName:1,
					itemCategory:1,
					itemDescription:1,
					itemImageSrc:1,
					priceN:{$toInt:"$price"}
				}
			},
			{
				$group:{
					_id:"$_id",
					asks:{$first:"$asks"},
					bids:{$first:"$bids"},
					orderHistory:{$first:"$orderHistory"},
					itemName:{$first:"$itemName"},
					itemCategory:{$first:"$itemCategory"},
					itemDescription:{$first:"$itemDescription"},
					itemImageSrc:{$first:"$itemImageSrc"},
					score:{$min:"$priceN"}
				}
			},
			{
				$match:{
					score:{$ne:null}
				}
			},
			{
				$sort:{
					score:1
				}
			}
		]);
		res.send(items);
	}else{
		res.send(400);
	}
});
app.post('/items-add-order/', async (req, res)=>{
	res.header("Access-Control-Allow-Origin", "*");
	const { itemId, orderId} = req.body;
	Merchandise.findById(itemId).then(async(item)=>{
		const order = new mongoose.Types.ObjectId(orderId);
		item.orderHistory.push(order)
		await item.save();
		res.send(item);
	});
});

app.post('/items-remove-bid/', async (req, res)=>{
	res.header("Access-Control-Allow-Origin", "*");
	const { itemId, price, userId} = req.body;
	Merchandise.findById(itemId).then(async(item)=>{
		const p = '' + price;
		for (let i = 0; i < item.bids.get(p).length; i++){
			if (item.bids.get(p)[i] == userId){
				item.bids.get(p).splice(i, 1)
			  	break;
			}
		}
		item.markModified('bids');
		await item.save();
		res.send(item);
	});
});

app.post('/items-remove-ask/', async (req, res)=>{
	res.header("Access-Control-Allow-Origin", "*");
	const { itemId, price, userId} = req.body;
	Merchandise.findById(itemId).then(async(item)=>{
		const p = '' + price;
		for (let i = 0; i < item.asks.get(p).length; i++){
			if (item.asks.get(p)[i] == userId){
				item.asks.get(p).splice(i, 1)
			  	break;
			}
		}
		item.markModified('asks');
		await item.save();
		res.send(item);
	});
});


app.get('/all-order', async (req, res)=>{
	res.header("Access-Control-Allow-Origin", "*");
	Order.find()
	.populate("item")
	.populate("buyer")
	.populate("seller")
	.then((orders) => {
		res.send(orders) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
});

app.post('/order', async (req, res)=>{
	res.header("Access-Control-Allow-Origin", "*");
	const {item, buyer, seller, price, time, status} = req.body;
	const order = new Order({
		item,
		buyer,
		seller,
		price,
		time,
        status
	});
	order.save();
	res.send(order);
});

app.get('/order/:id', async (req, res)=>{
	const id = req.params.id;
	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// Otherwise, findById
	Order.findById(id).populate("item").populate("buyer").populate("seller").then((order) => {
		if (!order) {
			res.status(404).send()  // could not find this student
		} else {
			/// sometimes we wrap returned object in another object:
			//res.send({student})   
			res.send(order)
		}
	}).catch((error) => {
		res.status(500).send(error)  // server error
	})
});

app.get('/order-seller/:id', async (req, res)=>{
	const buyerId = req.params.id;
	Order.find({
		seller: new mongoose.Types.ObjectId(buyerId)
	}).populate("item").populate("buyer").populate("seller").then((orders) => {
		res.send(orders) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
});

app.get('/order-buyer/:id', async (req, res)=>{
	const buyerId = req.params.id;
	Order.find({
		buyer: new mongoose.Types.ObjectId(buyerId)
	}).populate("item").populate("buyer").populate("seller").then((orders) => {
		res.send(orders) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
});


app.get('/unwind-order/:id', async (req, res)=>{
	const orders = await Order.aggregate([
		{
			$match:{_id: req.params.id}
		},
		{
			$lookup: {
				from : 'User',
				localField: 'seller',
				foreignField: '_id',
				as : 'realSeller'
			}
		},
		{
			$lookup: {
				from : 'User',
				localField: 'buyer',
				foreignField: '_id',
				as : 'realBuyer'
			}
		}
	]);
	res.send(orders);
});

const ORDERPLACED = 0;
const AUTHENTICATING = 1;
const DELIVERING =2;
const RETURNING = 3;

app.post('/reject-order/:id', async (req, res)=>{
	const order = await Order.findById(req.params.id);
	if(!order){
		res.send(400);
	}
	if(order.status == AUTHENTICATING){order.status = RETURNING}
	await order.save();
	res.send(order);
});
app.post('/receive-order/:id', async (req, res)=>{
	const order = await Order.findById(req.params.id);
	if(!order){
		res.send(400);
	}
	if(order.status == ORDERPLACED){order.status = AUTHENTICATING}
	await order.save();
	res.send(order);
});
app.post('/pass-order/:id', async (req, res)=>{
	const order = await Order.findById(req.params.id);
	if(!order){
		res.send(400);
	}
	if(order.status == AUTHENTICATING){order.status = DELIVERING}
	await order.save();
	res.send(order);
});

/* --------- User backend implementation    ------------------*/
;( async () => {
	// create admin in handout
	try {
		let admin;
		admin = await User.findOne({
			username: "admin"
		});
		if(!admin) {
			admin = new User({
				username: "admin", 
				password: "admin",
				isAdmin: true
			});
			admin = await admin.save();
			// let admin_task = new Authenticator({
			// 	userId: authenticator._id
			// });
			// await admin_task.save();
		} 
		log("admin required in handout: ");
		log(admin);
		// create user in handout
		let demoUser = await User.findOne({
			"username": "user"
		})
		if(!demoUser) {
			demoUser = new User({
				"username": "user",
				"password": "user"
			});
			demoUser = await demoUser.save();
		}
		log("user required in handout: ")
		log(demoUser)
		let user2 = await User.findOne({
			"username": "user2"
		})
		if(!user2) {
			user2 = new User({
				"username": "user2",
				"password": "user2"
			});
			user2 = await user2.save();			
		}
		log("user2 in readme: ")
		log(user2)
	} catch(e) {
		log("create default user failed");
		log(e);
	}
}) ();

// Our own express middleware to check for 
// an active user on the session cookie (indicating a logged in user.)
// const sessionChecker = (req, res, next) => {
//     if (req.session.userid) {
//         res.redirect('/'); // redirect to homepage if not logged in.
//     } else {
//         next(); // next() moves on to the route.
//     }    
// };

const adminChecker = (req, res, next) => {
	log("session in adminChecker")
	log(req.session)
    if (req.session.isAdmin) {
        next();
    } else {
        res.status(401).send("Unauthorized"); // next() moves on to the route.
    }    
};

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
	console.log("here is the session in authenticate");
	// console.log(req.session);
	if (req.session.userid) {
		User.findById(req.session.userid).then((user) => {
			if (!user) {
				req.user = null;
				return Promise.reject()
			} else {
				req.user = user;
				next()
			}
		}).catch((error) => {
			req.user = null;
			res.status(401).send("Unauthorized")
		})
	} else {
		req.user = null;
		res.status(401).send("Unauthorized")
	}
}

// test authentication (only for testing)
app.get('/users/authtest', authenticate, (req, res) => {
	res.end();
})

app.get("/users/check-session", authenticate, (req, res) => {
	// log(' -- check -- session')
	// log(req.session)
    if (req.user) {
		console.log("/users/check-session")
		console.log(req.user)
        res.send(req.user);
    } else {
        res.status(401).send();
    }
});

// a POST route to *create* a user
app.post('/users/create', (req, res) => {
	// res.header("Access-Control-Allow-Origin", "*");
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
		req.session.save()
		// console.log("/users/create");
		// console.log(result);
		res.send(result)
	}, (error) => {
		// console.log("Error")
		// console.log(error)
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
		req.session.userid = user._id;
		req.session.username = user.username;
		// user.success = true;
		// log("session in user login:")
		// log(JSON.stringify(req.session))
		// log(admin_task);
		// log(user);
		req.session.isAdmin = user.isAdmin;
		req.session.save();
		res.send(user);
	} catch(e) {
		res.status(400).send({
			success: false
		})
	}
})

// A route to logout a user
app.get('/users/logout', (req, res) => {
	// Remove the session
	// console.log("here is the session");
	// console.log(req.session);
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			req.user = null;
			res.end()
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

app.get('/users/all', adminChecker, async (req, res) => {
	// only admin can get all uses' infomation
	try {
		let users = await User.find();
		res.send(users);
	} catch(err) {
		res.status(500).send(error)
	}
})

app.post('/users/password',  authenticate, async (req, res) => {
	// get the updated name and year only from the request body.
	// res.header("Access-Control-Allow-Origin", "*");
	const { password, userid } = req.body;

	log("/users/password")
	log(password)
	log(userid)
	// console.log(ObjectID.isValid(userid))
	// if (!ObjectID.isValid(userid)) {
	// 	res.status(404).send()
	// 	return;  // so that we don't run the rest of the handler.
	// }

	try {
		let user = await User.findById(userid);
		user.password = password;
		await user.save();
		res.send(user);
	} catch(err) {
		res.status(400).send(err);
	}
})

app.post('/users/info', authenticate, async (req, res) => {
	// get the updated name and year only from the request body.
	const { userid, email, address, creditCardNumber } = req.body;

	log("/users/info")
	log(email)
	log(address)
	log(creditCardNumber)
	// console.log(ObjectID.isValid(userid))
	if (!ObjectID.isValid(userid)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}

	try {
		let user = await User.findById(userid);
		user.email = email;
		user.address = address;
		user.creditCardNumber = creditCardNumber;
		user = await user.save();
		// console.log(user)
		res.send(user);
	} catch(err) {
		res.status(400).send(err);
	}
})


app.post('/users/add-purchase', authenticate, async (req, res)=>{

	// res.header("Access-Control-Allow-Origin", "*");
	const { userid, orderid } = req.body;

	if (!ObjectID.isValid(userid)) {
		// console.log(userid + 'hahhaa')
		res.status(404).send()
		return;
	}

	if (!ObjectID.isValid(orderid)) {
		// console.log(itemid + 'rinima')
		res.status(404).send()
		return;
	}

	try {
		let user = await User.findById(userid);
		// console.log(user)
		user.purchaseHistory.push(orderid)
		// console.log(user)
		user = await user.save();
		res.send(user);
	} catch(err) {
		res.status(400).send(err);
	}	
})

app.post('/users/add-message', authenticate, async (req, res)=>{

	// res.header("Access-Control-Allow-Origin", "*");
	const { userid, message } = req.body;

	if (!ObjectID.isValid(userid)) {
		// console.log(userid + 'hahhaa')
		res.status(404).send()
		return;
	}

	try {
		let user = await User.findById(userid);
		// console.log(user)
		user.inbox.push(message)
		// console.log(user)
		user = await user.save();
		res.send(user);
	} catch(err) {
		res.status(400).send(err);
	}	
})


app.post('/users/add-selling', authenticate, async (req, res)=>{

	// res.header("Access-Control-Allow-Origin", "*");
	const { userid, orderid } = req.body;

	if (!ObjectID.isValid(userid)) {
		res.status(404).send()
		return;
	}

	if (!ObjectID.isValid(orderid)) {
		res.status(404).send()
		return;
	}

	try {
		let user = await User.findById(userid);
		user.sellingHistory.push(orderid)
		user = await user.save();
		res.send(user);
	} catch(err) {
		res.status(400).send(err);
	}	
})

//used to load data for testing purposes
const addData = async ()=>{
	const addItem = (name,category,description,imgSrc)=>{
		const item = new Merchandise({
			itemName: name,
			itemCategory: category,
			itemDescription: description,
			itemImageSrc: imgSrc,
			bids: [],
			asks: [],
			orderHistory: []
		});
		item.save();
		return item;
	}
	let name = ["Grace's sketch", 'Nike Kobe 7','UT Sweatshirt','Nike Kobe 4','Nike AF 1','UT sticker', "N95 Mask", "Nike SB Dunk", "Nike Hoodie"];
	let category = ['COLLECTIONS','SNEAKERS','STREETWEAR','SNEAKERS','SNEAKERS','COLLECTIONS', 'COLLECTIONS','SNEAKERS', 'STREETWEAR'];
	let description = ["Geez, this is best thing ever",'This shoe is really cool', 'WOW I love it so much', 'Nice shoe huh',"God I'm in love",'It is kinda cute', 'Expensive','Great shoe','Beautiful hoodie']
	let imgSrc = ['img/IMG_4342.JPG','/img/kobe.jpg',  "/img/14355271t.jpg", "/img/kobe2.jpg", "/img/img01.jpg", "/img/uoftcompsci.jpg", "/img/46457.jpg", "/img/nikesb.jpg", "/img/nikehoodie.jpg"]

	const items = [];
	for (let i = 0; i<name.length; i++){
		let item = await addItem(name[i], category[i], description[i], imgSrc[i])
		items.push(item)
	}
	// let users = await User.find();
	
	// Promise.all(items.map(async item=>{
	// 	users.forEach(async user=>{
	// 		try{
	// 			let price = ''+Math.floor(Math.random() * 1000);
	// 			if(item.asks.get(price)){
	// 				item.asks.get(price).push(user.id);
	// 			}else{
	// 				item.asks.set(price,[user.id]);
	// 			}
				
	// 		}catch(e){
	// 			console.log(e);
	// 		}
	// 	});		
	// 	item.markModified('asks');
	// 	await item.save();
	// })).then(_=>{

	// 	items.forEach(async item=>{
	// 		users.forEach(async user=>{
	// 			try{
	// 				let price = ''+Math.floor(Math.random() * 1000);
	// 				if(item.bids.get(price)){
	// 					item.bids.get(price).push(user.id);
	// 				}else{
	// 					item.bids.set(price,[user.id]);
	// 				}
					
	// 			}catch(e){
	// 				console.log(e);
	// 			}
	// 		});		
	// 		item.markModified('bids');
	// 		await item.save();
	// 	});
	// });
};

app.post('/test-add-data/',(req, res)=>{
	addData();
	res.send({});
})




// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
