const damage_type = {
	index: async function(req, res) {
		const client = req.client
		let damage_type = await client.query("SELECT * from damage_type")
		damage_type = damage_type.rows
		res.send(damage_type)
	}
}

module.exports = damage_type
