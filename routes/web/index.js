const express = require("express")
const router = express.Router()
const damaged_road = require("../../controller/web/index.js")

router.get("/", damaged_road.index)

module.exports = router
