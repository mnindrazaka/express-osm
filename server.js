const express = require("express")
const app = express()
const cors = require("cors")
const { Client } = require("pg")

const client = new Client({
	user: "postgres",
	host: "localhost",
	database: "OSM",
	password: "postgres",
	port: 5433
})
client.connect()

// share client database
app.use(function(req, res, next) {
	req.client = client
	next()
})

// setting view engine
app.set("views", "views")
app.set("view engine", "ejs")

// serve static files
app.use("/public", express.static("public"))

// enable CORS
app.use(cors())

// routing
const webRoute = require("./routes/web/index")
const apiRoute = require("./routes/api/index.js")
app.use("/", webRoute)
app.use("/api", apiRoute)

// start server
app.listen(3000, function() {
	console.log("Server running on port 3000")
})
