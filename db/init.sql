CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    address TEXT NOT NULL
);

CREATE TABLE inventory(
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(64) NOT NULL,
    price DECIMAL NOT NULL,
    cat TEXT NOT NULL,
    farm_name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE cart(
    cart_id SERIAL PRIMARY KEY,
    purchase_date DATE DEFAULT NOW(),
    user_id INTEGER REFERENCES users(user_id),
    item_id INTEGER REFERENCES inventory(part_id)
);