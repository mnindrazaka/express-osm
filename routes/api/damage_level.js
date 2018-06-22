const express = require("express")
const router = express.Router()

router.get("/", async function(req, res) {
	const client = req.client
	let damage_level = await client.query("SELECT * from damage_level")
	damage_level = damage_level.rows
	res.send(damage_level)
})

module.exports = router
