-- Creating 3 tables: customer, category, purchase

CREATE TABLE IF NOT EXISTS customer (
    id SERIAL PRIMARY KEY,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(70) NOT NULL UNIQUE,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    password VARCHAR NOT NULL,
    verification_code VARCHAR(36)
);

CREATE TABLE IF NOT EXISTS category (
	id SERIAL PRIMARY KEY,
	category_name VARCHAR(30) NOT NULL,
	description VARCHAR(300) NOT NULL DEFAULT '',
	customer_id INTEGER NOT NULL REFERENCES customer(id) ON DELETE CASCADE,
	UNIQUE(category_name, customer_id)
);

CREATE TABLE IF NOT EXISTS purchase (
	id SERIAL PRIMARY KEY,
	purchase_date DATE NOT NULL DEFAULT CURRENT_DATE,
	category_id INTEGER NOT NULL REFERENCES category(id) ON DELETE CASCADE,
	product VARCHAR(30) NOT NULL,
	price NUMERIC(8,2) NOT NULL,
	quantity INTEGER NOT NULL,
	total_price NUMERIC(8,2) GENERATED ALWAYS AS (price * quantity) STORED,
	customer_id INTEGER NOT NULL REFERENCES customer(id) ON DELETE CASCADE
);