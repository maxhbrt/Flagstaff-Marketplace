module.exports = {
    addToCart: async (req, res, next) => {
		const db = req.app.get("db");
		const { user, item } = req.body;
		db.add_to_cart([user, item]);
		res.sendStatus(200);
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