INSERT INTO cart(user_id, item_id)
VALUES($1, $2);

SELECT * FROM cart
WHERE user_id = $1;