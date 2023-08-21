## August 22, 2023

*
*
*

Template text

## August 21, 2023

* Built out the FastAPI endpoints for the CRUD operations of Budgets
* Protected the endpoints with authentication

I "drove" today. Went through the process of pulling down latest changes and spinning everything up on my computer. We discussed how to get on the same page for the day and made our plan.

With the standup discussion out of the way, we jumped into the code. I'm proud to report that we were able to work through the creation/implementation of all Budget CRUD operations! We set up a GET for all budgets linked to an account, a GET for a specified budget, a POST for the creation of a budget, a PUT for the updating of a specific budget, and a DELETE for deleting a specific budget. Throughout the development process, we typically ran into 1 to 2 errors while testing the endpoint. It was great working through the process of debugging the error and fixing/resolving the issue.

For me, the biggest breakthrough was just the day as a whole. Planning on implementing the CRUD operations and then achieving that goal felt very rewarding! Enjoyed all the hands on learning along the way!

Aside from the whole day's breakthrough, Amanuel made a cool discovery when working on the POST for budgets. We wanted to ensure that budgets created would only be linked to the logged in user who created the budget. Initially, we were making this connection by passing in the user's id to the function. Amanuel discovered that we could use the `authenticator.get_current_account_data` assigned to the `account_data` variable. While this `.get_current_account_data` is used with the JWTDown Library to protect an endpoint, we can also use the data assigned to the variable to view the signed in account's information. With that info, rather than needing to pass the id to the function, we could just use the account data when making the query call! Users will not be able to manually set an id of where the budget should be assigned to. The assignement will now happen automatically through our code!


## August 17, 2023

* Built new tables for budgets and expense_items.
* Wrote the insert statements to populate new tables with dummy data.
* Cleaned up our Excalidraw to help us make better informed decisions about DB tables and pydantic models.

Corn "drove" today. There was a lot of theoretical discussion about what needed to happen next with this project. We talked through the addition of our budget and expense items. I worked on building out new tables and linking them with foreign keys. Got those connections working and we tested with a INNER JOIN query in PG Admin. That was cool to see functioning! We started working on building out models, queries, and routers for budgets and expense items, but ran out of time. We also talked through the process of what saving budgets is going to look like during the customer's budget creation journey.

A fun breakthrough for me was getting the foreign key relationships working in the database and seeing the INNER JOIN work in PG Admin!

## August 16, 2023

* We. Did. So. Much. Stuff.
* Authentication is now fully set up and running (as far as Curtis' example video shows)
* Added a create user query that the authenticator uses to add users to our accounts table

Today started off slow, and we felt like we were way behind. Amanuel was driving, but it was all hands on deck with a code live share session. I'm now super proud of all of us as we've now fully implemented authentication in our application! We got done with enough time to fill out journals, create an issue prior to pre-exploration break time.

There were two big breakthroughs.

1. Amanuel noticed in my get account query that I was querying based on ID, but we were never handling ID. Switching that up fixed an issue that we were dealing with.
2. WE GOT AUTHENTICATION WORKING!!! WOOOOOOO WOOOOO!

## August 15, 2023

* Added environment variables and requirements to the API service for JWT Down.
* Created  models, queries and routers directories with an accounts.py file in each.
* Built an accounts table in the data/moneyminder.sql file with some simple insert statements to add 3 user records to the account
* All the "The Civilians" were working together on today's tasks.

I was "driving" today. We had hoped to work through a lot of our authentication implementation, but realized that we needed to lay some additional groundwork prior to getting into the weeds of authentication.

In addition to adding environment variables, we created a SQL DDL command to create an accounts table, and then an INSERT statement to populate that table with some dummy data.

Part of the groundwork that needed to be laid was the further setup of FastAPI. We created a single query that would use an AccountsOut model to grab the needed account info from the database and return it. Though this query was breaking with a 500 error when a non-existent email was passed in, we got it working when an existing email was passed.

Ran out of time for the day and pushed the existing code up to main. Tomorrow, we plan on beginning work with our own development branches (not working directly with main).