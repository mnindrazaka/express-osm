const model = require("../../model/damage_type")

const damage_type = {
	index: function(req, res) {
		model.findAll().then(results => {
			res.send(results)
		})
	}
}

module.exports = damage_type
