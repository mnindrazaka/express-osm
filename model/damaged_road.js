const Sequelize = require("sequelize")
const sequelize = require("../config/connection")

const damage_level = require("./damage_level")
const damage_type = require("./damage_type")

const damaged_road = sequelize.define(
	"damaged_road",
	{
		rid: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		lgeom: {
			type: Sequelize.GEOMETRY
		},
		sid: {
			type: Sequelize.INTEGER
		},
		osm_id: {
			type: Sequelize.INTEGER
		},
		information: {
			type: Sequelize.STRING
		},
		type_id: {
			type: Sequelize.INTEGER
		},
		level_id: {
			type: Sequelize.INTEGER
		}
	},
	{
		tableName: "pnm_damaged_roads",
		timestamps: false
	}
)

damaged_road.belongsTo(damage_type, {
	foreignKey: "type_id",
	targetKey: "type_id"
})

damaged_road.belongsTo(damage_level, {
	foreignKey: "level_id",
	targetKey: "level_id"
})

module.exports = damaged_road
