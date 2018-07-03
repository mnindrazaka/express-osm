const model = require("../../model/damage_level")

const damage_level = {
	index: async function(req, res) {
		model.findAll().then(results => {
			res.send(results)
		})
	}
}

module.exports = damage_level
