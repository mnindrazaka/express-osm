const Sequalize = require("sequelize")
const Op = Sequalize.Op
const model = require("../../model/road_segment")

const road_segment = {
	index: async function(req, res) {
		const { lat, lon } = req.params

		model
			.findAll({
				where: {
					cent_lat: {
						[Op.between]: [lat - 0.00091, parseFloat(lat) + 0.00091]
					},
					cent_lon: {
						[Op.between]: [lon - 0.00091, parseFloat(lon) + 0.00091]
					}
				}
			})
			.then(results => {
				const jsonResults = JSON.parse(JSON.stringify(results))
				const data = jsonResults.map(result => {
					const coordinates = result.lgeom.coordinates.map(coordinate => ({
						latitude: coordinate[1],
						longitude: coordinate[0]
					}))

					return {
						...result,
						coordinates
					}
				})
				res.send(data)
			})
	}
}

module.exports = road_segment
