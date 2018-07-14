const express = require("express")
const router = express.Router()
const controller = require("../../controller/api/road_segment")

router.get("/:lat/:lon", controller.index)
module.exports = router
