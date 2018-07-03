const Sequelize = require("sequelize")
const sequelize = require("../config/connection")

const damage_level = sequelize.define(
	"damage_level",
	{
		level_id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING
		},
		alpha: {
			type: Sequelize.DOUBLE
		}
	},
	{
		tableName: "damage_level",
		timestamps: false
	}
)

module.exports = damage_level
