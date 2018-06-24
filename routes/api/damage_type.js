const express = require("express")
const router = express.Router()
const controller = require("../../controller/api/damage_type")

router.get("/", controller.index)
module.exports = router
