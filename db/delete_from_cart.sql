DELETE FROM cart where cart_id = $1 and user_id = $2;

Select * from inventory
join cart
On (cart.item_id = inventory.item_id)
Where cart.user_id = $2;