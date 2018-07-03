const Sequelize = require("sequelize")
const sequalize = new Sequelize("OSM", "postgres", "postgres", {
	host: "localhost",
	port: 5433,
	dialect: "postgres"
})

module.exports = sequalize
