const express = require("express")
const router = express.Router()
const controller = require("../../controller/api/damaged_road")

router.get("/", controller.index)
router.post("/", controller.create)
module.exports = router
