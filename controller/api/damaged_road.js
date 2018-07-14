const model = require("../../model/damaged_road")

const damaged_road = {
	index: function(req, res) {
		model
			.findAll({
				limit: 100,
				include: [
					{ association: "damage_type" },
					{ association: "damage_level" }
				]
			})
			.then(results => {
				const jsonResults = JSON.parse(JSON.stringify(results))
				const data = jsonResults.map(result => {
					const coordinates = result.lgeom.coordinates.map(coordinate => ({
						latitude: coordinate[1],
						longitude: coordinate[0]
					}))

					return {
						coordinates,
						...result
					}
				})
				res.send(data)
			})
	},

	// create damaged road
	create: function(req, res) {
		const { body } = req
		const { damage_type_id, damage_level_id, information } = body.value

		body.segments.forEach(item => {
			console.log(item)

			model.create({
				type_id: damage_type_id,
				level_id: damage_level_id,
				information,
				...item,
				user_entri: "test",
				ip_entri: "127.0.0.1",
				user_ver: "",
				ip_ver: "",
				region_id: 0
			})
		})

		res.send({ success: true })
	}
}

module.exports = damaged_road
