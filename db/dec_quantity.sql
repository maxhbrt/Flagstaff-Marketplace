UPDATE cart
SET quantity = quantity - 1
WHERE item_id = $1
AND user_id = $2;

Select * from inventory
join cart
On (cart.item_id = inventory.item_id)
Where user_id = $2;