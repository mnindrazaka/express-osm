const express = require("express")
const app = express()
const { Client } = require("pg")

const client = new Client({
	user: "postgres",
	host: "localhost",
	database: "OSM",
	password: "postgres",
	port: 5433,
})
client.connect()

// setting view engine
app.set("views", "views")
app.set("view engine", "ejs")

// serve static files
app.use("/public", express.static("public"))

// routing
app.get("/", function(req, res) {
	client.query(
		"SELECT st_asgeojson(lgeom), e.color, d.name as damage_level, c.name as damage_type, a.information FROM pnm_damaged_roads a INNER JOIN damage_type c ON (a.type_id = c.type_id) INNER JOIN damage_level d ON (a.level_id = d.level_id) INNER JOIN damage_color e ON (a.type_id = e.type_id AND a.level_id = e.level_id)",
		function(err, result) {
			let geojson = result.rows
			geojson = geojson.map(function(row) {
				return {
					...JSON.parse(row.st_asgeojson),
					color: row.color,
					damage_level: row.damage_level,
					damage_type: row.damage_type,
					information: row.information,
				}
			})

			console.log(geojson)
			res.render("index", { geojson })
		},
	)
})

// start server
app.listen(3000, function() {
	console.log("Server running on port 3000")
})
