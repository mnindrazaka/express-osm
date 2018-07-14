const Sequelize = require("sequelize")
const sequelize = require("../config/connection")

const damage_level = require("./damage_level")
const damage_type = require("./damage_type")

const damaged_road = sequelize.define(
	"damaged_road",
	{
		rid: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		osm_id: {
			type: Sequelize.INTEGER
		},
		lid: {
			type: Sequelize.INTEGER
		},
		sid: {
			type: Sequelize.INTEGER
		},
		type_id: {
			type: Sequelize.INTEGER
		},
		level_id: {
			type: Sequelize.INTEGER
		},
		lgeom: {
			type: Sequelize.GEOMETRY
		},
		status: {
			type: Sequelize.INTEGER
		},
		user_entri: {
			type: Sequelize.STRING
		},
		ip_entri: {
			type: Sequelize.STRING
		},
		user_ver: {
			type: Sequelize.STRING
		},
		ip_ver: {
			type: Sequelize.STRING
		},
		information: {
			type: Sequelize.STRING
		},
		region_id: {
			type: Sequelize.INTEGER
		},
		length: {
			type: Sequelize.DOUBLE
		},
		centroid: {
			type: Sequelize.GEOMETRY
		},
		cent_lat: {
			type: Sequelize.DOUBLE
		},
		cent_lon: {
			type: Sequelize.DOUBLE
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
