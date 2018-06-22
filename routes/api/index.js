const express = require("express")
const app = express()
const damage_level = require("./damage_level")
const damage_type = require("./damage_type")
const damaged_road = require("./damaged_road")

app.use("/damage_level", damage_level)
app.use("/damage_type", damage_type)
app.use("/damaged_road", damaged_road)

module.exports = app
