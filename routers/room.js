const express = require("express");
const roomController = require("../controllers/roomControllers")

const router = express.Router();

//INDEX
router.get("/", roomController.index);

//SHOW
router.get("/:id", roomController.show);

//POST
router.post("/", roomController.postAppartemento);

//POST di una recensione
router.post("/:id/review", roomController.postReview)

//MODIFY
router.patch("/:id", roomController.addLike);


module.exports = router;