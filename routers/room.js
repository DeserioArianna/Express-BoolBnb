const express = require("express");
const roomController = require("../controllers/roomControllers")

const router = express.Router();

//INDEX
router.get("/", roomController.index);

//INDEX della tipologia di casa
router.get("/property", roomController.indexProperty)

//RICERCA PER CITTÀ
router.get("/search", roomController.searchByCity)

//SHOW
router.get("/:id", roomController.show);

//POST
router.post("/", roomController.postAppartemento);

//POST di una recensione
router.post("/:id/review", roomController.postReview)

//MODIFY
router.patch("/:id", roomController.addLike);


module.exports = router;