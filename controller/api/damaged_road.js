const damaged_road = {
	// load all damaged road
	index: async function(req, res) {
		const client = req.client
		let geojson = await client.query(
			"SELECT st_asgeojson(lgeom), sid, osm_id, e.color, d.name as damage_level, d.level_id as damage_level_id, c.name as damage_type, c.type_id as damage_type_id, a.information FROM pnm_damaged_roads a INNER JOIN damage_type c ON (a.type_id = c.type_id) INNER JOIN damage_level d ON (a.level_id = d.level_id) INNER JOIN damage_color e ON (a.type_id = e.type_id AND a.level_id = e.level_id) LIMIT 100"
		)
		geojson = geojson.rows
		geojson = geojson.map(function(row) {
			const data = JSON.parse(row.st_asgeojson)
			const coordinates = data.coordinates.map(item => {
				return {
					latitude: item[1],
					longitude: item[0]
				}
			})

			return {
				coordinates,
				...row
			}
		})
		res.send(geojson)
	},

	// update damaged road
	update: async function(req, res) {
		const { client, body } = req
		const { osm_id, sid } = req.params
		const { damage_type_id, damage_level_id, information } = body

		console.log("kamu kirim ini ?", body)
		await client.query(
			`UPDATE pnm_damaged_roads SET type_id = ${damage_type_id}, level_id = ${damage_level_id}, information = '${information}' WHERE osm_id = ${osm_id} AND sid = ${sid}`
		)
		res.send({ success: true })
	}
}

module.exports = damaged_road
