const Sequalize = require("sequelize")
const model = require("../../model/damaged_road")
const damage_type_model = require("../../model/damage_type")
const damage_level_model = require("../../model/damage_level")

const damaged_road = {
	index: async function(req, res) {
		const results = await model.findAll({
			include: [{ association: "damage_type" }, { association: "damage_level" }]
		})
		const jsonResults = JSON.parse(JSON.stringify(results))
		const data = jsonResults.map(result => {
			const coordinates = result.lgeom.coordinates.map(coordinate => [
				coordinate[1],
				coordinate[0]
			])

			return {
				coordinates,
				...result
			}
		})

		const damage_type = await damage_type_model.findAll()
		const damage_level = await damage_level_model.findAll()
		res.render("index", { data, damage_type, damage_level })
	}
}

module.exports = damaged_road
