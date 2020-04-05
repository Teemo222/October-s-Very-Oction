Introduction:
    Oction is an online marketplace and platform that conducts auctions between sellers and buyers. It provides services for transactions of those merchandise that can be authenticated by our authenticator team, primarily clothing, sneakers and delicate collection. 
    Here is the process of a transaction: Users may place bids or asks on merchandise and a transaction is generated once a bid and a ask matches. Then, the seller is supposed to send the merchadise to our authencation team. Once the item has pass our quality test, it will be delivered to the buyer. 

URL of the deployed app:
    https://octobers-very-oction.herokuapp.com/

The app is deployed using Heroku and the database used in the system is MongoDB Atlas.

User-guideline:
    The homepage has a search box, type keywords to search, or type nothing to list all items. In the preloaded datasets, all items have either "Nike" or "UT" keyword. And users may use the filter for category filtration or sort the display of items using the choice box.

   The application has already pre-loaded some data for demonstration purposes, including two users ((user, user) and (user2, user2)), one admin (admin, admin) and some interactions between the users. Both users have made some bids and asks and therefore some transactions were made.

   In an item page, the user will be able to directly see up to 5 highest bids or lowest asks. If the user wants to view the entire list of asks or bids besides the 5, it can be achieved by click the two "view all" buttons. Historical sales for any item can be viewed in that item’s item page, including a line plot, a table of past sales as well as some statistics. There is a choice box that can filter sales within the interested time period, such as past month, past week and etc. 
   
   Before placing a bid or ask, the user is required to fill in some personal info in their profile page. Once the user successfully places a bid or ask, there will be a message shown up in the inbox in "My account". Users will receive some other notifications too, such as when a order is placed, or the status of order is changed by the admin. The user is also able to view all their past selling and purchase history in their profile page.

Admin Functions:
   In the admin page, there are two tables, one for managing all the transactions actions and the other for managing user infos. The administrator is able to change the status of order, from initially "Order Placed". The admin supposedly should change the status to "Received" and then "Passed" or "Rejected". Once the admin has changed the status of an order, both the buyer and seller will receive notifications in the "My Account" Page, either through buying or selling history, or inbox.
   
   All passwords in the system will be hashed so even admin is not able to see users’ password. However, admin is able to reset a certain user’s password. User authentication is also provided. Normal users can only perform user actions while admin is able to perform some privileged actions. 
   The admin is also able to add a merchandise than is supported by the site. A picture may be uploaded along with the basic merchandise info. However, admin only exists for administrative purpose and should not bid/sell.

The server backend used in our program is primarily supported by Express. 
In our server.js file, we provided the following GET/POST requests.
    
   1. Routes Request: '/searchpage', '/itempage', 'userprofile', 'managerprofile'. 
   These routes request help direct the page according to react-router.

   2. Get Requests regarding merchadise: ’/items’, ‘/items-by-keyword/:kw’, ‘/items-by-category/:cat’, ‘/items-by-keyword-and-category/:kw/:cat’, ‘/items/:id’, ‘/item-lowest-ask/:id’, ‘/item-highest-bid/:id’, ‘/filter-items/:filter’
   
   These requests will send back a list of merchandise data according to some specific requirements, such as using a filter that only select certain items that have specific keywords or category. 
   
   3. Post Requests regarding merchadise:‘/items’, ‘/items-add-ask/‘, ‘/items-add-bid/‘, ‘/items-add-order/‘, ‘/items-remove-bid/‘, ‘/items-remove-ask’
   
   These requests will modify the database, such as adding an merchandise with its picture into the system, or adding a ask, bid to a certain merchandise by its id passed in the body of the request.
   
   3. Get Requests regarding order: ‘/all-order’, ‘/order-seller/:id’, ‘/order-buyer/:id’
   
   These requests get either all orders(for admin purposes), or get orders of a specific buyer or seller.
   
   4. Post Requests regarding order: ‘/order’, ‘/reject-order/:id’, ‘/receive-order/:id’, ‘/pass-order/:id’
   
   Like post requests for merchandise, these request modify orders in the database.
   
   5. Get Requests regarding user: ‘/users/authtest’, “/users/check-session”, ‘/users/logout’, ‘/users/admin’, ‘/users/all’
   
   These requests gets an user info by the username and password given in the body, or use session to get an already logged in user.
   
   6.  Post Requests regarding user: ‘/users/create’, ‘/users/login’, ‘/users/password’, ‘/users/info’, ‘/users/add-purchase’, ‘/users/add-message’, ‘/users/add-selling’, '/test-add-data/'

   Either creating a user or update an user info.
   
   
