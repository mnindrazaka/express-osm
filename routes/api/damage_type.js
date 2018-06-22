const express = require("express")
const router = express.Router()

router.get("/", async function(req, res) {
	const client = req.client
	let damage_type = await client.query("SELECT * from damage_type")
	damage_type = damage_type.rows
	res.send(damage_type)
})

module.exports = router
