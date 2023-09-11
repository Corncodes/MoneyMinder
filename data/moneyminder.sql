DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS budgets;
DROP TABLE IF EXISTS expense_items;

CREATE TABLE IF NOT EXISTS accounts (
  id SERIAL NOT NULL UNIQUE PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  hashed_password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS budgets (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  primary_budget BOOLEAN NOT NULL,
  complete BOOLEAN DEFAULT FALSE,
  monthly_income INTEGER NOT NULL,
  monthly_spending_total INTEGER,
  monthly_balance INTEGER,
  account_id SMALLINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS expense_items (
  expense_id SERIAL NOT NULL PRIMARY KEY,
  expense_name VARCHAR(100) NOT NULL,
  amount INTEGER NOT NULL,
  ordering SMALLINT,
  budget_id INTEGER NOT NULL REFERENCES budgets(id) ON DELETE CASCADE
);
