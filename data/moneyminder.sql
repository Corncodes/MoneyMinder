DROP TABLE IF EXISTS hello_world;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS budgets;
DROP TABLE IF EXISTS expense_item;

CREATE TABLE IF NOT EXISTS hello_world (
    id SERIAL NOT NULL UNIQUE PRIMARY KEY,
    hello TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL NOT NULL UNIQUE PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    hashed_password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS  budgets (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  primary_budget BOOLEAN NOT NULL,
  monthly_income INT NOT NULL,
  monthly_spending_total INT NOT NULL,
  monthly_balance INT NOT NULL,
  accounts_id INT NOT NULL REFERENCES accounts(id)
);



INSERT INTO hello_world VALUES
  (1, 'Hello World!');

INSERT INTO accounts VALUES
  (100, 'user', '#1', 'user1@email.com', 'oasifjpeokj;alkfje3207'),
  (101, 'user', '#2', 'user2@email.com', 'oasifjpedkj;alkfje3207'),
  (102, 'user', '#3', 'user3@email.com', 'oasifjpeokj;alkgje3207');

INSERT INTO budgets VALUES
  (100, 'a-b-one', TRUE, 8000, 6000, 2000, 100),
  (101, 'a-b-two', FALSE, 800, 600, 200, 100),
  (102, 'b-b-one', TRUE, 10000, 6000, 4000, 101),
  (103, 'c-b-one', TRUE, 4000, 3000, 1000, 102);
