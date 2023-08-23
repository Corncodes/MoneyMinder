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
  account_id SMALLINT NOT NULL REFERENCES accounts(id)
);

CREATE TABLE IF NOT EXISTS expense_items (
  expense_id SERIAL NOT NULL PRIMARY KEY,
  expense_name VARCHAR(100) NOT NULL,
  amount INTEGER NOT NULL,
  ordering SMALLINT,
  budget_id INTEGER NOT NULL REFERENCES budgets(id)
);

INSERT INTO accounts VALUES
  (100, 'user', '#1', 'user1@email.com', 'oasifjpeokj;alkfje3207'),
  (101, 'user', '#2', 'user2@email.com', 'oasifjpedkj;alkfje3207'),
  (102, 'user', '#3', 'user3@email.com', 'oasifjpeokj;alkgje3207');

INSERT INTO budgets VALUES
  (100, 'a-b-one', TRUE, TRUE, 8000, 6000, 2000, 100),
  (101, 'a-b-two', FALSE, TRUE, 800, 600, 200, 100),
  (102, 'b-b-one', TRUE, TRUE, 10000, 6000, 4000, 101),
  (103, 'c-b-one', TRUE, TRUE, 4000, 3000, 1000, 102);

INSERT INTO expense_items VALUES
  (1000, 'Housing', 3000, 1, 100),
  (1001, 'Auto', 350, 2, 100),
  (1002, 'Insurance', 200, 3, 100),
  (1003, 'Fun Money', 300, 4, 100),
  (1004, 'Housing', 2000, 1, 101),
  (1005, 'Auto', 250, 2, 101),
  (1006, 'Insurance', 300, 3, 101),
  (1007, 'Fun Money', 100, 4, 101),
  (1008, 'Housing', 1000, 1, 102),
  (1009, 'Auto', 500, 2, 102),
  (1010, 'Insurance', 2000, 3, 102),
  (1011, 'Fun Money', 3000, 4, 102),
  (1012, 'Housing', 100, 1, 103),
  (1013, 'Auto', 50, 2, 103),
  (1014, 'Insurance', 30, 3, 103),
  (1015, 'Fun Money', 10, 4, 103);
