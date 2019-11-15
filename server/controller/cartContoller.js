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
		const cartItems = await db.join(id);
	
		res.status(200).send(cartItems);
	},
	updateQuantity: async (req, res, next) => {
		const db = req.app.get("db");
		const {id} = req.params
		const { user_id } = req.body
		console.log('user_id: ' , user_id)
		console.log('item_id: ', id)
		const updatedQuan = await db.update_quantity([id, user_id]);
		res.status(200).send(updatedQuan)
		
	}
	

}