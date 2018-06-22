const express = require("express")
const router = express.Router()

router.get("/", async function(req, res) {
	const client = req.client

	let geojson = await client.query(
		"SELECT st_asgeojson(lgeom), e.color, d.name as damage_level, d.level_id as damage_level_id, c.name as damage_type, c.type_id as damage_type_id, a.information FROM pnm_damaged_roads a INNER JOIN damage_type c ON (a.type_id = c.type_id) INNER JOIN damage_level d ON (a.level_id = d.level_id) INNER JOIN damage_color e ON (a.type_id = e.type_id AND a.level_id = e.level_id)"
	)
	geojson = geojson.rows
	geojson = geojson.map(function(row) {
		return {
			...JSON.parse(row.st_asgeojson),
			color: row.color,
			damage_level: row.damage_level,
			damage_type: row.damage_type,
			information: row.information,
			damage_type_id: row.damage_type_id,
			damage_level_id: row.damage_level_id
		}
	})
	console.log(geojson)

	let damage_type = await client.query("SELECT * from damage_type")
	damage_type = damage_type.rows

	let damage_level = await client.query("SELECT * from damage_level")
	damage_level = damage_level.rows

	res.render("index", { geojson, damage_type, damage_level })
})

module.exports = router
