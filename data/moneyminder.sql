DROP TABLE IF EXISTS hello_world;

CREATE TABLE hello_world (
    id SERIAL NOT NULL UNIQUE PRIMARY KEY,
    hello TEXT NOT NULL
);

INSERT INTO hello_world VALUES
  (1, 'Hello World!');
