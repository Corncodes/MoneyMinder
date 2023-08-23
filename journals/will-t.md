## August 23, 2023

*
*
*

Template text

## August 22, 2023

* Refactored DB to return expenses information when budgets are queried
* Refactored `budget_record_to_dict`into `record_to_dict` to handle the formatting of various record obtained from SQL queries
* Started work on CREATE, UPDATE and DELETE for expense_items. We're getting expense_items with the left join when querying budgets. As of now, we don't plan on writing GETS specifically for expense_items.

Amanuel "drove" today. He started off the day by confidently saying we WOULD get through all the CRUD operations for expense_items. That said, we spent the majority of the day working through the refactoring of our budgets queries page. We needed to re-work things so that the budget queries would correctly pull expense_item information (if it existed). It was good to work through that now rather than later!

I tackled the refactoring of the `budget_record_to_dict` function into `record_to_dict`. I wanted to use similar functionality to `budget_record_to_dict`, but didn't want to violate DRY. Correctly refactored the code so that it worked with the new instance needing the function as well as old functions still worked (after some slight adjustments to the code).A

Breakthroughs:
1. We were trying an inner join to pull both a budget AND it's expense items, but we were running the query WHERE an id matched a certain budget id. The id that we were passing to the query was for a budget that existed, but we weren't getting any data back. I realized that, though the budget existed, there were no expenses tied to that budget. We then changed the query to check a different budget that we knew had expenses and the query worked!

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
