const Sequelize = require("sequelize")
const sequelize = require("../config/connection")

const road_segment = sequelize.define(
	"road_segment",
	{
		osm_id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		lid: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		sid: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		lgeom: {
			type: Sequelize.GEOMETRY
		},
		cent_lat: {
			type: Sequelize.DOUBLE
		},
		cent_lon: {
			type: Sequelize.DOUBLE
		},
		centroid: {
			type: Sequelize.GEOMETRY
		},
		length: {
			type: Sequelize.DOUBLE
		}
	},
	{
		tableName: "pnm_road_segments",
		timestamps: false
	}
)

module.exports = road_segment
