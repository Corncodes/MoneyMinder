## August 17, 2023
Task
    - Building out budgets & expenses backend (group)

Completed
    - Models for budgets & expenses
    - Test data for database

Design:
    - Decided what the back-end framework would look like in a more detailed manner
        - In the 1 to many relationship between the account & budgets as well as between budget & expenses, the many will have a foreign key(ID) to the 1; the 1 will have no reference to the many
        - Attempted to design around aggregates but this may not materialize
    - budget POST will be made upon saving the budget name & monthly income
        - Monthly balance & spending total calculated in back-end after POST
         and then again upon the addition of each expense item
    - Added the Complete boolean to the budget
    - Added order (priority? ordering?) field to expense

Breakthroughs:
    - Learned git fetch gets branch data from remote to then be able to checkout onto said branches
    - Figured out useEffect in lecture today. You give it a function, and a list of things to watch. It runs the function when the things being watched change.
    - Solidified useState understanding too; you give it a variable  and a function to change that variable. When that function is called, it rerenders the page
    - Use useEffect on states to create side-effects to changes to a state

Reflection:
Realized we have tomorrow off, so we won't be finishing our back end this week :')
We didn't get all too much work done today mainly because of deliberating over those design decisions above. Franz unfortunately lost power while driving and it took us a while to get back on track after that, plus scheduled break times coming in just as we got the ball rolling on actual coding. I think I derailed our discussion onto figuring out aggregates for far too long rather than just accepting what *just works*, but at least we have the design more fleshed out now.

## August 16, 2023
Task:
    - Implementing user authentication (group)

Completed:
    - Implementing user authentication

Design:
    - N/A

Breakthroughs:
    - Understanding authentication
    - Getting a better feel for the FastAPI workflow
        - Having a good enough understanding to be able to diagnose bugs in FastAPI

Reflection:
I was driving the group-code session today for the first time, since my initial experience last week was only for creating an issue in Gitlab. I was a little nervous since I wasn't too confident in using FastAPI or understanding the authentication library that we were implementing, so I rewatched the FastAPI videos on Learn while they were lecturing on binary trees in class, and it all began to click. Having Curtis' walkthrough alongside my code definitely helped though; I think if I was driving on the day we were setting up our database I would have been very lost.

We made a lot of early progress and then stalled a little bit to where I began to think we might end up falling behind, but sure enough we completed authentication in about 3.5 hours after just a bit of work we did on it yesterday.

Now that we got the database set up and authentication implemented, we finally get to start making our actual app! I'm very excited to work on the front-end because that'll be the bulk of our work and I plan to make it look spectacular, so I hope we can finish out our back-end soon. The "deadline" is by the end of the week, so we have 2 more days to build the API for CRUD on budgets which should be more than enough, but we won't have Curtis alongside us so who knows. Anyway, I'm happy with our progress today.
