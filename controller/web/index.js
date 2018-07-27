const model = require("../../model/damaged_road")
const damage_type_model = require("../../model/damage_type")
const damage_level_model = require("../../model/damage_level")

async function index(req, res) {
	const results = await model.findAll({
		include: [{ association: "damage_type" }, { association: "damage_level" }]
	})

	const jsonResults = convertToJson(results)
	const data = jsonResults.map(result => {
		const coordinates = switchLatLon(result.lgeom.coordinates)
		return { coordinates, ...result }
	})

	const damage_type = await damage_type_model.findAll()
	const damage_level = await damage_level_model.findAll()
	res.render("index", { data, damage_type, damage_level })
}

function convertToJson(results) {
	return JSON.parse(JSON.stringify(results))
}

function switchLatLon(coordinates) {
	return coordinates.map(coordinate => [coordinate[1], coordinate[0]])
}

module.exports = { index }
