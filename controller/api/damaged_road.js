const Sequalize = require("sequelize")
const Op = Sequalize.Op
const model = require("../../model/damaged_road")

async function index(req, res) {
	const { lat, lon } = req.params
	const results = await model.findAll({
		include: [{ association: "damage_type" }, { association: "damage_level" }],
		where: {
			cent_lat: {
				[Op.between]: [lat - 0.00091, parseFloat(lat) + 0.00091]
			},
			cent_lon: {
				[Op.between]: [lon - 0.00091, parseFloat(lon) + 0.00091]
			}
		}
	})

	const jsonResults = convertToJson(results)
	const data = jsonResults.map(result => {
		const coordinates = switchLatLon(result.lgeom.coordinates)
		return { coordinates, ...result }
	})
	res.send(data)
}

function convertToJson(results) {
	return JSON.parse(JSON.stringify(results))
}

function switchLatLon(coordinates) {
	return coordinates.map(coordinate => ({
		latitude: coordinate[1],
		longitude: coordinate[0]
	}))
}

function create(req, res) {
	const { body } = req
	const { damage_type_id, damage_level_id, information } = body.value

	body.segments.forEach(item => {
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

module.exports = {
	index,
	create
}
