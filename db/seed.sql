DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS concerts;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL
);

CREATE TABLE concerts (
  id SERIAL PRIMARY KEY,
  artist VARCHAR NOT NULL,
  venue VARCHAR,
  city VARCHAR NOT NULL,
  event_date TIMESTAMP NOT NULL,
  user_id INT,
  attendance BOOLEAN,
  songkick VARCHAR,
  url VARCHAR
);


INSERT INTO concerts (artist, venue, city, event_date, user_id, attendance, songkick)
VALUES ('Pile', 'Market Hotel', 'Brooklyn, NY', '2017-12-10 20:00:00', 1, true, 'manual');
