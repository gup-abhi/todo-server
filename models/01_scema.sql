DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS notes cascade;

--Users Table
CREATE TABLE users (
    -- user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--Note Table
CREATE TABLE notes (
    id SERIAL PRIMARY KEY NOT NULL,
    note TEXT,
    done BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    username VARCHAR(50),
    FOREIGN KEY (username) REFERENCES users(username)
)
