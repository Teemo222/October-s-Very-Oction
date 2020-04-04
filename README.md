Introduction:
    Oction is an online marketplace and platform that conducts auctions between sellers and buyers. It provides services for transactions of those merchandise that can be authenticated by our authenticator team, primarily clothing, sneakers and delicate collection.

URL of the deployed app:
    https://mighty-reef-32514.herokuapp.com

The app is deployed using Heroku and the database of the system is linked to MongoDB Atlas.

User-guideline:
    The homepage has a search box, type keywords to search, or type nothing to list all items. In the preloaded datasets, all items have either "Nike" or "UT" keyword. And users may use the filter for category filtration or sort the display of items using the choice box.

   The application has already pre-loaded some data for demonstration purposes, including two users ((user, user) and (user2, user2)), one admin (admin, admin) and some interactions between the users. Both users have made some bids and asks and therefore some transactions were made.

   The user will be able to see up to 5 highest bids or lowest asks in the itempage. If the user wants to view the entire list of asks or bids besides the 5, it can be achieved by click the two "view all" buttons. Historical sales for any item can be viewed in that item’s item page, including a line plot, a table of past sales as well as some statistics. There is a choice box that can filter sales within the interested time period, such as past month, past week and etc.

Admin Functions:
   In the admin page, there are two tables, one for managing all the transactions actions and the other for managing user infos. The administrator is able to change the status of order, from initially "Order Placed". The admin supposedly should change the status to "Received" and then "Passed" or "Rejected". 
   All passwords in the system will be hashed so even admin is not able to see users’ password. However, admin is able to reset a certain user’s password. User authentication is also provided. Normal users can only perform user actions while admin is able to perform some privileged actions. 
   The admin is also able to add a merchandise than is supported by the site. A picture may be uploaded along with the basic merchandise info.  

Supported Server Requests:

Get: ’/items’, ‘/items-by-keyword/:kw’, ‘/items-by-category/:cat’, ‘/items-by-keyword-and-category/:kw/:cat’, ‘/items/:id’, ‘/item-lowest-ask/:id’, ‘/item-highest-bid/:id’, ‘/filter-items/:filter’, ‘/all-order’, ‘/unwind-order/:id’, ‘/users/authtest’, “/users/check-session”, ‘/users/logout’, ‘/users/admin’, ‘/users/all’, 

Post: ‘/items’, ‘/items-add-ask/‘, ‘/items-add-bid/‘, ‘/items-add-order/‘, ‘/items-remove-bid/‘, ‘/items-remove-ask’, ‘/order’, ‘/order/:id’, ‘/order-seller/:id’, ‘/order-buyer/:id’, ‘/reject-order/:id’, ‘/receive-order/:id’, ‘/pass-order/:id’, ‘/users/create’, ‘/users/login’, ‘/users/password’, ‘/users/info’, ‘/users/add-purchase’, ‘/users/add-message’, ‘/users/add-selling’, '/test-add-data/'
