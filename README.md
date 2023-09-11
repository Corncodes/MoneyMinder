# MoneyMinder
- Amanuel Yiblet
- Cornell Burts
- Franz Espinosa
- Will Tirado

## Application Functionality
- Create an account
- Sign in to created account
- Perform CRUD actions on a budgets table in the MoneyMinder PostgreSQL database
  - Create | There is a create budget button taking the user to a page that sends a POST request to the db
  - Read   | There is a budget list page showing all budgets a user owns, and a budget view page showing the users the specifics of any given budget they own
  - Update | There is an option on the budget view page to edit a budget's details
  - Delete | There is a button on each budget in the budget list page allowing the user to delete a budget
- Perform CRUD actions on an expense_items table in the MoneyMinder PostgreSQL database
  - Create | There is a configure budget page that allows users to add expenses to a budget. When the user clicks Save & Exit or Submit, the app will package up all the data and post the expenses as well as send a put request to the budgets table.
  - Read   | There is a budget view page that will list all the expenses tied to a given budget.
  - Update | There is a Reconfigure Budget page that will show existing expenses. On this page, the user can update existing expenses.
  - Delete | On the same Reconfigure Budget page the user can delete existing expenses.

## User Story
- Upon accessing MoneyMinder for the first time, John Doe (JD) can create an account using an email and password
- The navigation links on the site will dynamically adjust whether or not JD is logged in
- Once signed in, the app will present JD with a button to create a budget
  - If JD already has one or more budgets created, the budgets will be listed on this page as well. Each button will display as an accordion. If opened, JD will be presented with a "quick view" of the budgets information, the ability to open up the Budget View page, or delete the budget
  - Additionally, on this page, if there are one (or more) budgets created, the budget that is set with a primary value of True will be listed at the top of the budget list.
- When creating a budget, JD will be asked to provide a budget name and their monthly income
  - Upon clicking continue, the application will take the given information and create a record in the budgets table in the database
  - This newly created budget is required for the next page's functionality
- The next page is the Configure Budget page. This page initially will show:
  - The budget's name (set on the previous page)
  - Total spending (starting at $0)
  - Remaining (the amount JD makes per month - set on the previous page)
  - 3 buttons
    - Add an expense
      - When this button is clicked, JD will be presented with a new expense field. This expense field will ask for an expense name, and an expense amount
      - When a price is added to the expense amount, the Total Spending and Remaining above will be updated. The total of the two numbers will always equal JD's monthly spending
      - Each expense added will have a button allowing JD to delete said expense
    - Save and Exit
      - Upon creation of a budget (on the previous page), the budget's "completed" status is defaulted to False. Additionaly, we create monthly_spending_total and monthly_balance values that are set to null. If JD clicks this Save & Exit button, any expenses added will be posted to the Expenses table in the db. Additionally, we make a put request to the budget we're adjusting and update the monthly_spending_total and monthly_balance values. That said, the completed status will remain False.
    - Submit
      - If JD clicks this button, any expenses added will be posted to the Expenses table in the db, the monthly_spending_total and monthly_balance values will be updated like above, and the completed value will be set to True.
  - When JD clicks submit on the configure page, they will automatically be redirected to the Budget View page. If this is the first budget created, the budget's primary value (indicating if the budget is JD's primary budget or not) is set to True. If JD already has a budget, the budget's primary value will be set to False.
  - The Budget View page has the following functionality/displays
    - A star will display in the top left of the page. If the star is filled in, that means that the budget's primary value is set to True. If the budget's primary value is set to False, JD will see an empty/unfilled star. In either case, JD can tap the star to switch the budget's primary value in the DB.
    - The budget name will display at the top center of the page.
    - Below the budget name will be the Budget Breakdown. This breakdown will display the following:
      - A pie chart (in donut shape) visually showing how each expense plays into your budget as a whole. If there is a remaining value (i.e. you aren't spending the entirety of your monthly income), the chart will include a Remaining slice showing how much money you should have for savings/spending/investing after your planned expenses.
      - A legend showing a which expense is tied to which color on the chart
      - If JD hovers their mouse (on desktop) or taps (on mobile) any on any pie slice, the slice will highlight and display which expense it is, and its value, and it will grey out the other pie expenses.
    - Below the pie chart will be a section listing the big picture numbers (Monthly Income, Total Spend, and Remaining Spend).
    - Below this section is the Expense List. This list will show all the expenses tied to this budget in a simple card. The cards will just have the expense's name and amount.
    - At the bottom of the page, JD has two buttons:
      - Edit Budget
        - If clicked/tapped, JD will be sent through a journey similar to the create/configure budget path journey they already went down. Only major difference here is that the pages will be pre-populated with the budget and expense data. Throughout this journey, JD can always go back a step or cancel the process altogether.
      - Return
        - This button will just send JD back one page in their navigation journey.

## Stretch Goals
- Use media queries and MUI to create quality designs for Desktop users (we built for mobile first).
- Use MUI's theming to give the user the option for Dark Mode.
- Have a "Review Month" feature that will give insights on the user's spending based on their budget.
- Give the user a "Large Purchase Calculator" that helps them to easily create expenses in their budget showing how much they need to set aside in the budget in order to purchase an item in a given time frame.
- Make budgets shareable between user accounts.
- Add a progress bar underneath each expenditure displaying the percent of total spending
- As an expense is added and monthly spending increases/remaining decreases, animate said numbers with slot machine like spinning.
- Add draggable reordering functionality to the budget list page.
- Require expenses to submit budget on ConfigureBudget and ReconfigureBudget pages.
- Scramble budget ID and account ID

## New Team Member
Welcome to the team! ;)

As a new member, you will first need to pull the project repository onto your machine. The project can be found at this url: `https://gitlab.com/the-civilians/moneyminder`. The application is broken up into various microservices using Docker. Production is on the `main` branch. Please branch off of `main` when working on a new feature.

Prior to spinning up docker, you will first need to create a `.env` file at the top level of the files. If you run an `ls` command in your terminal, the `.env` file should be added as a sibling to this `README.md` file. With the `.env` file created, paste the following inside:
```
REACT_APP_API_HOST="http://localhost:8000"
PUBLIC_URL="http://localhost:3000"
```
With this small change complete, run the following commands from the root level of the app's files:
```
docker volume create moneyminder

docker volume create pg-admin

# IF you are using a non-Apple Silicon Device, run:
docker compose build

# IF you are using an Apple Silicon device, run:
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build

docker compose up
```

## Journal Entries
Journals can be found in the `journals` directory at the root level of this project's files. We all started off strong with journal. That said, we ceased journaling when we had a couple weeks left in the project in favor of spending more time in development.
