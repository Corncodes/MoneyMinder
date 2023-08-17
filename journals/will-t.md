## August 15, 2023

* Added environment variables and requirements to the API service for JWT Down.
* Created  models, queries and routers directories with an accounts.py file in each.
* Built an accounts table in the data/moneyminder.sql file with some simple insert statements to add 3 user records to the account
* All the "The Civilians" were working together on today's tasks.

I was "driving" today. We had hoped to work through a lot of our authentication implementation, but realized that we needed to lay some additional groundwork prior to getting into the weeds of authentication.

In addition to adding environment variables, we created a SQL DDL command to create an accounts table, and then an INSERT statement to populate that table with some dummy data.

Part of the groundwork that needed to be laid was the further setup of FastAPI. We created a single query that would use an AccountsOut model to grab the needed account info from the database and return it. Though this query was breaking with a 500 error when a non-existent email was passed in, we got it working when an existing email was passed.

Ran out of time for the day and pushed the existing code up to main. Tomorrow, we plan on beginning work with our own development branches (not working directly with main).


## August 16, 2023

* We. Did. So. Much. Stuff.
* Authentication is now fully set up and running (as far as Curtis' example video shows)
* Added a create user query that the authenticator uses to add users to our accounts table

Today started off slow, and we felt like we were way behind. Amanuel was driving, but it was all hands on deck with a code live share session. I'm now super proud of all of us as we've now fully implemented authentication in our application! We got done with enough time to fill out journals, create an issue prior to pre-exploration break time.

There were two big breakthroughs.

1. Amanuel noticed in my get account query that I was querying based on ID, but we were never handling ID. Switching that up fixed an issue that we were dealing with.
2. WE GOT AUTHENTICATION WORKING!!! WOOOOOOO WOOOOO!


## August 17, 2023

*
*
*

Template text


## August 16, 2023

*
*
*

Template text
