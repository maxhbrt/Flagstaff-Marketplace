module.exports = {
    addToCart: async (req, res, next) => {
		const db = req.app.get("db");
		const { user_id, item_id } = req.body;
		const cart = await db.add_to_cart([user_id, item_id]);
		res.status(200).send(cart);
	},
	getCart: async (req, res, next) => {
		const db = req.app.get("db");
		const { id } = req.params;
		const cartItems = await db.get_cart([id]);
		const itemIds = cartItems.map(item => {
			return item.item_id;
		});
		res.status(200).send(itemIds);
	} 
}