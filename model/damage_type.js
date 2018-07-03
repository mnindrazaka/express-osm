const Sequelize = require("sequelize")
const sequelize = require("../config/connection")

const damage_type = sequelize.define(
	"damage_type",
	{
		type_id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING
		},
		color: {
			type: Sequelize.STRING
		}
	},
	{
		tableName: "damage_type",
		timestamps: false
	}
)

module.exports = damage_type
