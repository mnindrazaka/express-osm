const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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
