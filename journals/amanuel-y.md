## August 23, 2023
Task:
    - Build out expenses backend (group)
    - Set up Vite

Completed:
    - Build out expenses backend
        - Refactored get_budgets
        - Wrote Update_expense, delete_expense
    - Set up Vite

Design:
    - get_budgets returns budgets /w expenses
        - This aligns better to DDD

Breakthroughs:
    - Refactoring get_budget to contain expenses: [] instead of a list with 1 object where every field is null.
        - Did this by writing a conditional "if rows[0][-1]:" before the loop that appends to expenses
            - This checks that the budget_id foreign_key field is not None
        - Also had to rewrite the expense field of the model to be expenses: List[ExpenseOut] = [] (although I'm not 100% sure we need this?)

Reflections:
Franz drove. Easy day today, no big obstacles, no pacing issues for the most part. During morning lecture I refactored get_budgets according to the idea from yesterday, and it was pretty easy to set up. There was one bug that it caused issues pulling the expense name and expense id because we renamed them in the query, so we solved that by just renaming it everywhere as expense_name and expense_id instead of name and id.


## August 22, 2023
Task:
    - Build out expenses backend

Completed:
    - Refactored get_budgets; finished create_expense

Design:
    - get_budget returns expenses which is more in line with aggregate design

Breakthroughs:
    - Inner join vs outer join: I realized an inner join between budgets and expenses on budget_id would not return the budget without expenses if the budget did not have expenses. Changed it to a left join and it worked
    - Processing a JOIN query: budget + expenses join spits out a row for each expense even though the budget columns stayed constant. We needed a way to "collapse" all the budget columns into one output, and insert all expense rows into the budget dictionary as a list of expense dictionaries.
        - We accomplished this by refactoring the budget_record_to_dict function into a more universal record_to_dict, and then using that to convert a row of budget data into a dictionary, and then using it again to loop over the expense data to append that to the expenses list in the budget dictionary

Reflections:
I drove today, and started the day pretty confident we would finish CRUD on expenses. That didn't happen. To be fair, create_expenses was finished in like 30-45 minutes and that's after we were hung up on how to insert the budget_id among other little things. We probably could have finished it all today, but we only had 3.5 hours of project time, and we spent almost 3 hours refactoring get_budget to return a budget WITH its list of expenses attached, rather than (once we get to front-end) having to run separate queries for get_budget and get_expenses. This makes the budgets function a little more as an aggregate too, since expenses won't ever be returned detached from their budget. Overall, it was a good exercise and I'm glad we figured it out if for no other reason than to know how to process JOIN queries into usable data, but I do wonder if I sidetracked us too far off the main goal of just getting a working MVP... ¯\_(ツ)_/¯

Idea:
If we're doing global state management and only need to get all relevant data once, we could refactor get_budgets to return a list of budgets WITH expenses in the same manner that we refactored get_budget. We could simply run a query to SELECT id FROM budgets WHERE id = {account_id} and then loop over that list of IDs and run get_budget on each one while appending them all to a budgets_list.


## August 21, 2023
Task:
    - Build out budgets backend (group)

Completed:
    - CRUD budgets

Design:
    - EDIT BUDGET front-end button would route user to

Breakthroughs:
    - BudgetOut vs BudgetsOut: the BudgetsOut model inherits from Basemodel and has one field that reads budgets: list[BudgetOut]
        - When using queries that return a list, the ResponseModel needs to be a list as well, so this accomplishes that requirement
    - RETURNING: this SQL clause is basically a shorthand way to write a SELECT clause after you've already written a different clause e.g. UPDATE something, and then grab a field(s) from the things you just updated, or DELETE something, and then grab a field *before* it's deleted
    - passing in user_id from authentication: back during wireframing I having the idea that we might be able to grab user data from the authentication token if we need it anywhere on a page, and today I actually tried it out and it worked! We've been pasting this boilerplate parameter
    > account_data: dict = Depends(authenticator.get_current_account_data)
    to protect routes from non-logged-in users, and turns out you can just grab
    account_data.id

Reflections:
Will drove today, and we got a lot done! CRUD on budgets doesn't seem like a lot at face value, but we were chugging along basically all day and it took a lot of small breakthroughs to put it all together. I think on Thursday, we just had a lot of mental obstacles that were keeping us from just putting our heads down and writing code, and we had some of those same mental obstacles this morning while we tried to reason out in our heads how things *should* work before ever having real practice just doing these things and seeing how they work. At this point I don't even remember the things I was hung up on this morning before we moved on to just writing code, but by this point I've basically got it all figured out, so I feel pretty good about that! Although I'm still a little confused about Depends and Response and how IDs are passed into URLs, but that's a problem for another day ¯\_(ツ)_/¯


## August 17, 2023
Task:
    - Building out budgets & expenses backend (group)

Completed:
    - Models for budgets & expenses
    - Test data for database

Design:
    - Decided what the back-end framework would look like in a more detailed manner
        - In the 1 to many relationship between the account & budgets as well as between budget & expenses, the many will have a foreign key(ID) to the 1; the 1 will have no reference to the many
        - Attempted to design around aggregates but this may not materialize
    - budget POST will be made upon saving the budget name & monthly income
        - Monthly balance & spending total calculated in back-end after POST
         and then again upon the addition of each expense item
    - "Save incomplete budgets" moved up from stretch goal to MVP
        - Added the Complete boolean to the budget
    - Added order (priority? ordering?) field to expense

Breakthroughs:
    - Learned git fetch gets branch data from remote to then be able to checkout onto said branches
    - Figured out useEffect in lecture today. You give it a function, and a list of things to watch. It runs the function when the things being watched change.
    - Solidified useState understanding too; you give it a variable  and a function to change that variable. When that function is called, it rerenders the page
    - Use useEffect on states to create side-effects to changes to a state

Reflection:
Franz drove until afternoon when Corn took over. Realized we have tomorrow off, so we won't be finishing our back end this week :')
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
