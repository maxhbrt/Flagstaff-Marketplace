Select * from inventory
join cart
On (cart.item_id = inventory.item_id)
Where user_id = $1;