# October's Very Oction

**October's Very Oction(OvO)** is an online marketplace and platform that conducts auctions between sellers and buyers. It provides services for transactions of those merchandise that can be authenticated by our authenticator team, primarily clothing, sneakers and delicate collection. The process of a transaction in oction looks like this: Users may place bids or asks on merchandise and a transaction is generated once a bid and a ask matches. Then, the seller is supposed to send the merchadise to our authencation team. Once the item has pass our quality test, it will be delivered to the buyer. 

An instance of the deployed app using Heroku: https://octobers-very-oction.herokuapp.com/ Unfortunately, the mongodb subscription has expired.

## Deploy locally ##

```
git clone https://github.com/wzhao18/octobers-very-oction.git
cd octobers-very-oction
mkdir -p data/mongo
docker compose up
```

## User-guideline ##

The homepage has a search box, type keywords to search, or type nothing to list all items. In the preloaded datasets, all items have either "Nike" or "UT" keyword. And users may use the filter for category filtration or sort the display of items using the choice box.

The application has already pre-loaded some data for demonstration purposes, including two users ((user, user) and (user2, user2)), one admin (admin, admin) and some interactions between the users. Both users have made some bids and asks and therefore some transactions were made.

In an item page, the user will be able to directly see up to 5 highest bids or lowest asks. If the user wants to view the entire list of asks or bids besides the 5, it can be achieved by click the two "view all" buttons. Historical sales for any item can be viewed in that item’s item page, including a line plot, a table of past sales as well as some statistics. There is a choice box that can filter sales within the interested time period, such as past month, past week and etc. 
   
Before placing a bid or ask, the user is required to fill in some personal info in their profile page. Once the user successfully places a bid or ask, there will be a message shown up in the inbox in "My account". Users will receive some other notifications too, such as when a order is placed, or the status of order is changed by the admin. The user is also able to view all their past selling and purchase history in their profile page.

## Admin Functions ##

In the admin page, there are two tables, one for managing all the transactions actions and the other for managing user infos. The administrator is able to change the status of order, from initially "Order Placed". The admin supposedly should change the status to "Received" and then "Passed" or "Rejected". Once the admin has changed the status of an order, both the buyer and seller will receive notifications in the "My Account" Page, either through buying or selling history, or inbox.
   
All passwords in the system will be hashed so even admin is not able to see users’ password. However, admin is able to reset a certain user’s password. User authentication is also provided. Normal users can only perform user actions while admin is able to perform some privileged actions. 

The admin is also able to add a merchandise than is supported by the site. A picture may be uploaded along with the basic merchandise info. However, admin only exists for administrative purpose and should not bid/sell.
   
   
