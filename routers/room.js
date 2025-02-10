const express = require("express");
const roomController = require("../controllers/roomControllers")

const router = express.Router();

//INDEX
router.get("/", roomController.index);

//SHOW
router.get("/:id", roomController.show);

//MODIFY
router.patch("/:id", roomController.addLike);


module.exports = router;