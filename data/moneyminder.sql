DROP TABLE IF EXISTS hello_world;
DROP TABLE IF EXISTS accounts;

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

INSERT INTO hello_world VALUES
  (1, 'Hello World!');

INSERT INTO accounts VALUES
  (1, 'user', '#1', 'user1@email.com', 'oasifjpeokj;alkfje3207'),
  (2, 'user', '#2', 'user2@email.com', 'oasifjpedkj;alkfje3207'),
  (3, 'user', '#3', 'user3@email.com', 'oasifjpeokj;alkgje3207');
