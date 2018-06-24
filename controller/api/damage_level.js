const damage_level = {
	index: async function(req, res) {
		const client = req.client
		let damage_level = await client.query("SELECT * from damage_level")
		damage_level = damage_level.rows
		res.send(damage_level)
	}
}

module.exports = damage_level
