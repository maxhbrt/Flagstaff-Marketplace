INSERT INTO users
(email, password, name, adress)
VALUES
($1, $2, $3, $4);
SELECT email, name
FROM users,
WHERE email = $1;