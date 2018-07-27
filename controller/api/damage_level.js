const model = require("../../model/damage_level")

function index(req, res) {
	model.findAll().then(results => {
		res.send(results)
	})
}

module.exports = {
	index
}
