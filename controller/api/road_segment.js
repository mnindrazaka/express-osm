const Sequalize = require("sequelize")
const Op = Sequalize.Op
const model = require("../../model/road_segment")

async function index(req, res) {
	const { lat, lon } = req.params
	const results = await model.findAll({
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
		return { ...result, coordinates }
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

module.exports = { index }
